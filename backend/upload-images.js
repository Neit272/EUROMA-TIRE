const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const { default: fetch } = require("node-fetch");

const STRAPI_URL = "https://euroma-tire.onrender.com/api";
const LOCAL_STRAPI_URL = "http://localhost:1337/api";
const IMAGES_FOLDER = path.join(__dirname, "..", "EuromaTire-Images");

const API_URL = STRAPI_URL;
//   process.env.NODE_ENV === "production" ? STRAPI_URL : LOCAL_STRAPI_URL;

// Hàm upload ảnh lên Strapi
async function uploadImageToStrapi(imagePath, fileName) {
  try {
    const formData = new FormData();
    formData.append("files", fs.createReadStream(imagePath), fileName);

    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log(`    📷 Uploaded: ${result[0].name} (ID: ${result[0].id})`);
    return result[0]; // Return first uploaded file info
  } catch (error) {
    console.error(`Error uploading ${fileName}:`, error.message);
    return null;
  }
}

// Hàm lấy sản phẩm theo slug với populate images
async function getProductBySlug(slug) {
  try {
    const encodedSlug = encodeURIComponent(slug);
    const url = `${API_URL}/san-phams?filters%5Bslug%5D%5B%24eq%5D=${encodedSlug}&populate%5B0%5D=loai_lop&populate%5B1%5D=models.images`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data && data.data.length > 0 ? data.data[0] : null;
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error.message);
    return null;
  }
}

// Hàm parse tên file để lấy size và số thứ tự
function parseFileName(fileName) {
  // Ví dụ: "14.9-28.1.JPG" -> size: "14.9-28", index: "1"
  // Hoặc: "12_13.6-32.1.JPG" -> size: "12/13.6-32", index: "1"
  // Hoặc: "800.16.2.HEIC" -> size: "800-16", index: "2"
  const nameWithoutExt = fileName.split(".").slice(0, -1).join(".");
  const parts = nameWithoutExt.split(".");

  if (parts.length >= 2) {
    const index = parts[parts.length - 1];
    const sizePart = parts.slice(0, -1).join(".");

    // Xử lý trường hợp "12_13.6-32" thành "12/13.6-32"
    let size = sizePart.replace("_", "/");

    // Xử lý trường hợp "800.16" thành "800-16" (chỉ khi không có dấu gạch ngang)
    if (!size.includes("-") && size.includes(".")) {
      const dotParts = size.split(".");
      if (dotParts.length === 2 && !isNaN(dotParts[0]) && !isNaN(dotParts[1])) {
        size = dotParts.join("-");
      }
    }

    return { size, index: parseInt(index) };
  }

  return null;
} // Hàm normalize size để khớp với database
function normalizeSize(size) {
  // Chuẩn hóa size để khớp với dữ liệu trong DB
  // Ví dụ: "14.9-28" -> "14.9 - 28"
  return size.replace("-", " - ");
}

// Hàm main xử lý upload
async function processImageUpload() {
  console.log("🚀 Bắt đầu quá trình upload ảnh...");

  // Đọc các folder con trong EuromaTire-Images
  const subFolders = fs
    .readdirSync(IMAGES_FOLDER, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  console.log(
    `📁 Tìm thấy ${subFolders.length} folder: ${subFolders.join(", ")}`
  );

  for (const folderName of subFolders) {
    console.log(`\n🔄 Xử lý folder: ${folderName}`);

    // Lấy sản phẩm tương ứng với populate images
    const product = await getProductBySlug(folderName);
    if (!product) {
      console.log(`⚠️  Không tìm thấy sản phẩm với slug: ${folderName}`);
      continue;
    }

    console.log(
      `📦 Tìm thấy sản phẩm: ${product.name} (ID: ${product.id}, DocumentID: ${product.documentId})`
    );

    const folderPath = path.join(IMAGES_FOLDER, folderName);
    const imageFiles = fs
      .readdirSync(folderPath)
      .filter((file) => /\.(jpg|jpeg|png|heic|webp)$/i.test(file));

    console.log(
      `📸 Tìm thấy ${imageFiles.length} ảnh trong folder ${folderName}`
    );

    // Nhóm ảnh theo size
    const imageGroups = {};
    imageFiles.forEach((fileName) => {
      const parsed = parseFileName(fileName);
      if (parsed) {
        const normalizedSize = normalizeSize(parsed.size);
        if (!imageGroups[normalizedSize]) {
          imageGroups[normalizedSize] = [];
        }
        imageGroups[normalizedSize].push({
          fileName,
          filePath: path.join(folderPath, fileName),
          index: parsed.index,
        });
      }
    });

    console.log(
      `📊 Tìm thấy ${Object.keys(imageGroups).length} size khác nhau: ${Object.keys(imageGroups).join(", ")}`
    );

    // BƯỚC 1: Upload tất cả ảnh trước
    console.log("\n  📤 BƯỚC 1: Upload tất cả ảnh...");
    const modelUpdates = []; // Lưu thông tin cập nhật cho từng model

    for (const [size, images] of Object.entries(imageGroups)) {
      console.log(`\n    📐 Xử lý size: ${size} (${images.length} ảnh)`);

      // Tìm model tương ứng
      const modelIndex = product.models.findIndex(
        (model) => model.size === size
      );

      if (modelIndex === -1) {
        console.log(`      ⚠️  Không tìm thấy model với size: ${size}`);
        console.log(
          `      💡 Available sizes: ${product.models.map((m) => m.size).join(", ")}`
        );
        continue;
      }

      const model = product.models[modelIndex];
      console.log(`      🎯 Tìm thấy model: ${model.sku} (${model.size})`);

      // Kiểm tra model đã có ảnh chưa
      if (model.images && model.images.length > 0) {
        console.log(
          `      ⏭️  Model đã có ${model.images.length} ảnh, bỏ qua...`
        );
        continue;
      }

      // Sắp xếp ảnh theo index
      images.sort((a, b) => a.index - b.index);

      // Upload từng ảnh
      const uploadedImageIds = [];
      for (const image of images) {
        console.log(`      📤 Upload: ${image.fileName}`);
        const uploadResult = await uploadImageToStrapi(
          image.filePath,
          image.fileName
        );

        if (uploadResult) {
          uploadedImageIds.push(uploadResult.id);
          console.log(`      ✅ Upload thành công: ${uploadResult.url}`);
        } else {
          console.log(`      ❌ Upload thất bại: ${image.fileName}`);
        }

        // Delay để tránh rate limit
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      // Lưu thông tin cập nhật
      if (uploadedImageIds.length > 0) {
        modelUpdates.push({
          modelIndex,
          size,
          imageIds: uploadedImageIds,
          modelSku: model.sku,
        });
      }
    }

    // BƯỚC 2: Cập nhật tất cả models cùng lúc
    if (modelUpdates.length > 0) {
      console.log(
        `\n  🔄 BƯỚC 2: Cập nhật ${modelUpdates.length} models cùng lúc...`
      );

      // Lấy thông tin product mới nhất
      const response = await fetch(
        `${API_URL}/san-phams/${product.documentId}?populate[0]=models.images`
      );

      if (response.ok) {
        const productData = await response.json();
        const currentProduct = productData.data;

        // Tạo models array với tất cả cập nhật
        const updatedModels = currentProduct.models.map((model, index) => {
          const updateInfo = modelUpdates.find((u) => u.modelIndex === index);

          if (updateInfo) {
            console.log(
              `    📝 Cập nhật model ${index + 1}: ${updateInfo.modelSku} với ${updateInfo.imageIds.length} ảnh`
            );
            return {
              sku: model.sku,
              size: model.size,
              ply: model.ply,
              diameter: model.diameter,
              sectionWidth: model.sectionWidth,
              treadWidth: model.treadWidth,
              treadCount: model.treadCount,
              treadDepth: model.treadDepth,
              inflationPressure: model.inflationPressure,
              images: updateInfo.imageIds,
            };
          }

          // Model không thay đổi
          return {
            sku: model.sku,
            size: model.size,
            ply: model.ply,
            diameter: model.diameter,
            sectionWidth: model.sectionWidth,
            treadWidth: model.treadWidth,
            treadCount: model.treadCount,
            treadDepth: model.treadDepth,
            inflationPressure: model.inflationPressure,
            images: model.images || [],
          };
        });

        // Thực hiện cập nhật 1 lần duy nhất
        const updateResponse = await fetch(
          `${API_URL}/san-phams/${product.documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                models: updatedModels,
              },
            }),
          }
        );

        if (updateResponse.ok) {
          console.log(
            `  ✅ Cập nhật thành công tất cả ${modelUpdates.length} models!`
          );
          modelUpdates.forEach((update) => {
            console.log(
              `    ✓ ${update.modelSku} (${update.size}): ${update.imageIds.length} ảnh`
            );
          });
        } else {
          const errorText = await updateResponse.text();
          console.log(
            `  ❌ Cập nhật thất bại: ${updateResponse.status} ${errorText}`
          );
        }
      } else {
        console.log(`  ❌ Không thể lấy thông tin product để cập nhật`);
      }
    } else {
      console.log(
        `  ℹ️  Không có model nào cần cập nhật cho folder ${folderName}`
      );
    }
  }

  console.log("\n🎉 Hoàn thành quá trình upload ảnh!");
}

// Chạy script
if (require.main === module) {
  processImageUpload().catch(console.error);
}

module.exports = { processImageUpload };
