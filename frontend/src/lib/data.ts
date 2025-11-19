export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: StrapiImageFormat;
    small: StrapiImageFormat;
    medium: StrapiImageFormat;
    large: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: { public_id: string; resource_type: string; } | null;
  createdAt: string;
  updatedAt: string;
}

export type TreadPatternModel = {
  sku: string;
  size: string;
  ply: string;
  weight: string;
  diameter: string;
  sectionWidth: string;
  treadWidth: string;
  treadCount: number | string;
  treadDepth: string;
  inflationPressure: string;
  images?: StrapiImage[];
};

export type TreadPattern = {
  id: string;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
  models: TreadPatternModel[];
};

export const treadPatterns: TreadPattern[] = [
  {
    id: "an-do-jk",
    name: "Ấn Độ - JK",
    type: "Đi Rừng",
    description: "Mô tả chi tiết cho loại gai Ấn Độ - JK.",
    imageUrl: "https://placehold.co/600x600/222/fff?text=Ấn+Độ+-+JK",
    models: [
      { sku: "EU 14.9 - 24", size: "14.9 - 24", ply: "14 B", weight: "70 kg", diameter: "1260 mm", sectionWidth: "320 mm", treadWidth: "300 mm", treadCount: 20, treadDepth: "43 mm", inflationPressure: "28 PSI" },
      { sku: "EU 12.4 - 26", size: "12.4 - 26", ply: "16 B", weight: "68 kg", diameter: "1260 mm", sectionWidth: "320 mm", treadWidth: "300 mm", treadCount: 20, treadDepth: "43 mm", inflationPressure: "28 PSI" },
      { sku: "EU 13.6 - 26", size: "13.6 - 26", ply: "16 B", weight: "68 kg", diameter: "1260 mm", sectionWidth: "320 mm", treadWidth: "300 mm", treadCount: 20, treadDepth: "43 mm", inflationPressure: "28 PSI" },
      { sku: "EU 12.4 - 28", size: "12.4 - 28", ply: "16 B", weight: "66 kg", diameter: "1260 mm", sectionWidth: "320 mm", treadWidth: "300 mm", treadCount: 20, treadDepth: "43 mm", inflationPressure: "28 PSI" },
      { sku: "EU 14.9 - 28", size: "14.9 - 28", ply: "16 B", weight: "90 kg", diameter: "1360 mm", sectionWidth: "370 mm", treadWidth: "350 mm", treadCount: 20, treadDepth: "46 mm", inflationPressure: "28 PSI" },
      { sku: "EU 12/13.6 - 32", size: "12/13.6 - 32", ply: "16 B", weight: "88 kg", diameter: "1360 mm", sectionWidth: "370 mm", treadWidth: "350 mm", treadCount: 20, treadDepth: "46 mm", inflationPressure: "28 PSI" },
    ],
  },
  {
    id: "ba-soc",
    name: "Ba Sọc",
    type: "Đi Ruộng",
    description: "Mô tả chi tiết cho loại gai Ba Sọc.",
    imageUrl: "https://placehold.co/600x600/333/fff?text=Ba+Sọc",
    models: [
      { sku: "EU 400 - 9", size: "400 - 9", ply: "8 B", weight: "4 kg", diameter: "460 mm", sectionWidth: "100 mm", treadWidth: "88 mm", treadCount: "3 Sọc", treadDepth: "14 mm", inflationPressure: "30 PSI" },
      { sku: "EU 400 - 10", size: "400 - 10", ply: "8 B", weight: "4 kg", diameter: "460 mm", sectionWidth: "100 mm", treadWidth: "88 mm", treadCount: "3 Sọc", treadDepth: "14 mm", inflationPressure: "30 PSI" },
      { sku: "EU 400 - 12", size: "400 - 12", ply: "8 B", weight: "5 kg", diameter: "525 mm", sectionWidth: "108 mm", treadWidth: "90 mm", treadCount: "3 Sọc", treadDepth: "13 mm", inflationPressure: "30 PSI" },
      { sku: "EU 400 - 15", size: "400 - 15", ply: "8 B", weight: "7 kg", diameter: "608 mm", sectionWidth: "112 mm", treadWidth: "94 mm", treadCount: "3 Sọc", treadDepth: "15 mm", inflationPressure: "30 PSI" },
      { sku: "EU 500 - 15", size: "500 - 15", ply: "8 B", weight: "8 kg", diameter: "657 mm", sectionWidth: "120 mm", treadWidth: "104 mm", treadCount: "3 Sọc", treadDepth: "15 mm", inflationPressure: "30 PSI" },
      { sku: "EU 550 - 16", size: "550 - 16", ply: "8 B", weight: "10.5 kg", diameter: "715 mm", sectionWidth: "132 mm", treadWidth: "120 mm", treadCount: "3 Sọc", treadDepth: "13 mm", inflationPressure: "30 PSI" },
      { sku: "EU 550/600 - 16", size: "550/600 - 16", ply: "10 B", weight: "10.5 kg", diameter: "715 mm", sectionWidth: "132 mm", treadWidth: "120 mm", treadCount: "3 Sọc", treadDepth: "13 mm", inflationPressure: "30 PSI" },
      { sku: "EU 650 - 18", size: "650 - 18", ply: "12 B", weight: "14 kg", diameter: "770 mm", sectionWidth: "140 mm", treadWidth: "124 mm", treadCount: "3 Sọc", treadDepth: "16 mm", inflationPressure: "30 PSI" },
      { sku: "EU 600 - 19", size: "600 - 19", ply: "12 B", weight: "14 kg", diameter: "770 mm", sectionWidth: "140 mm", treadWidth: "124 mm", treadCount: "3 Sọc", treadDepth: "16 mm", inflationPressure: "30 PSI" },
    ],
  },
  {
    id: "ba-soc-l",
    name: "Ba Sọc L",
    type: "Đi Ruộng",
    description: "Mô tả chi tiết cho loại gai Ba Sọc L.",
    imageUrl: "https://placehold.co/600x600/444/fff?text=Ba+Sọc+L",
    models: [
      { sku: "EU 750 - 16", size: "750 - 16", ply: "12 B", weight: "19 kg", diameter: "810 mm", sectionWidth: "205 mm", treadWidth: "174 mm", treadCount: "3 Sọc", treadDepth: "22 mm", inflationPressure: "30 PSI" },
    ],
  },
  {
    id: "ba-soc-n",
    name: "Ba Sọc N",
    type: "Đi Ruộng",
    description: "Mô tả chi tiết cho loại gai Ba Sọc N.",
    imageUrl: "https://placehold.co/600x600/555/fff?text=Ba+Sọc+N",
    models: [
      { sku: "EU 650/700 - 16", size: "650/700 - 16", ply: "12 B", weight: "14 kg", diameter: "770 mm", sectionWidth: "140 mm", treadWidth: "124 mm", treadCount: "3 Sọc", treadDepth: "16 mm", inflationPressure: "30 PSI" },
      { sku: "EU 750 - 16", size: "750 - 16", ply: "12 B", weight: "14 kg", diameter: "", sectionWidth: "", treadWidth: "", treadCount: "", treadDepth: "", inflationPressure: "30 PSI" },
    ],
  },
  {
    id: "belarus",
    name: "BELARUS",
    type: "Đi Ruộng",
    description: "Mô tả chi tiết cho loại gai BELARUS.",
    imageUrl: "https://placehold.co/600x600/666/fff?text=BELARUS",
    models: [
      { sku: "EU 18.4 - 30", size: "18.4 - 30", ply: "18 B", weight: "140 kg", diameter: "1560 mm", sectionWidth: "450 mm", treadWidth: "430 mm", treadCount: 19, treadDepth: "56 mm", inflationPressure: "33 PSI" },
      { sku: "EU 18.4 - 34", size: "18.4 - 34", ply: "18 B", weight: "163 kg", diameter: "1655 mm", sectionWidth: "440 mm", treadWidth: "410 mm", treadCount: 22, treadDepth: "55 mm", inflationPressure: "33 PSI" },
      { sku: "EU 16.9 - 34-1", size: "16.9 - 34", ply: "18 B", weight: "139 kg", diameter: "1560 mm", sectionWidth: "450 mm", treadWidth: "430 mm", treadCount: 19, treadDepth: "56 mm", inflationPressure: "33 PSI" },
      { sku: "EU 16.9 - 34-2", size: "16.9 - 34", ply: "18 B", weight: "153 kg", diameter: "1655 mm", sectionWidth: "440 mm", treadWidth: "410 mm", treadCount: 22, treadDepth: "55 mm", inflationPressure: "33 PSI" },
    ],
  },
  {
    id: "gai-dao",
    name: "Gai Dão",
    type: "Đi Rừng",
    description: "Mô tả chi tiết cho loại gai Gai Dão.",
    imageUrl: "https://placehold.co/600x600/777/fff?text=Gai+Dão",
    models: [
      { sku: "EU 500 - 12", size: "500 - 12", ply: "10 B", weight: "7 kg", diameter: "560 mm", sectionWidth: "128 mm", treadWidth: "118 mm", treadCount: 14, treadDepth: "22 mm", inflationPressure: "30 PSI" },
      { sku: "EU 700 - 16", size: "700 - 16", ply: "12 B", weight: "13 kg", diameter: "722 mm", sectionWidth: "176 mm", treadWidth: "164 mm", treadCount: 14, treadDepth: "20 mm", inflationPressure: "30 PSI" },
      { sku: "EU 900 - 16", size: "900 - 16", ply: "14 B", weight: "26 kg", diameter: "870 mm", sectionWidth: "230 mm", treadWidth: "220 mm", treadCount: 14, treadDepth: "37 mm", inflationPressure: "33 PSI" },
      { sku: "EU 8.3 - 20", size: "8.3 - 20", ply: "14 B", weight: "25 kg", diameter: "870 mm", sectionWidth: "230 mm", treadWidth: "220 mm", treadCount: 14, treadDepth: "37 mm", inflationPressure: "33 PSI" },
      { sku: "EU 900 - 20", size: "900 - 20", ply: "14 B", weight: "28 kg", diameter: "965 mm", sectionWidth: "210 mm", treadWidth: "220 mm", treadCount: 14, treadDepth: "38 mm", inflationPressure: "28 PSI" },
      { sku: "EU 11.2 - 20", size: "11.2 - 20", ply: "14 B", weight: "37 kg", diameter: "1050 mm", sectionWidth: "250 mm", treadWidth: "240 mm", treadCount: 14, treadDepth: "41 mm", inflationPressure: "28 PSI" },
      { sku: "EU 8.3 - 22", size: "8.3 - 22", ply: "14 B", weight: "27 kg", diameter: "965 mm", sectionWidth: "210 mm", treadWidth: "220 mm", treadCount: 14, treadDepth: "38 mm", inflationPressure: "28 PSI" },
      { sku: "EU 9.5 - 22", size: "9.5 - 22", ply: "14 B", weight: "32 kg", diameter: "1010 mm", sectionWidth: "220 mm", treadWidth: "230 mm", treadCount: 14, treadDepth: "45 mm", inflationPressure: "28 PSI" },
      { sku: "EU 8.3 - 24", size: "8.3 - 24", ply: "14 B", weight: "33 kg", diameter: "1010 mm", sectionWidth: "220 mm", treadWidth: "230 mm", treadCount: 14, treadDepth: "45 mm", inflationPressure: "28 PSI" },
      { sku: "EU 9.5 - 24", size: "9.5 - 24", ply: "14 B", weight: "35 kg", diameter: "1050 mm", sectionWidth: "250 mm", treadWidth: "240 mm", treadCount: 14, treadDepth: "41 mm", inflationPressure: "28 PSI" },
      { sku: "EU 11.2 - 24", size: "11.2 - 24", ply: "14 B", weight: "49 kg", diameter: "1130 mm", sectionWidth: "300 mm", treadWidth: "290 mm", treadCount: 14, treadDepth: "41 mm", inflationPressure: "28 PSI" },
      { sku: "EU 12.2 - 24", size: "12.2 - 24", ply: "14 B", weight: "49 kg", diameter: "1130 mm", sectionWidth: "300 mm", treadWidth: "290 mm", treadCount: 14, treadDepth: "41 mm", inflationPressure: "29 PSI" },
      { sku: "EU 13.6 - 24", size: "13.6 - 24", ply: "14 B", weight: "68 kg", diameter: "1210 mm", sectionWidth: "339 mm", treadWidth: "340 mm", treadCount: 15, treadDepth: "55 mm", inflationPressure: "23 PSI" },
      { sku: "EU 14.9 - 24", size: "14.9 - 24", ply: "14 B", weight: "66 kg", diameter: "1260 mm", sectionWidth: "320 mm", treadWidth: "300 mm", treadCount: 16, treadDepth: "48 mm", inflationPressure: "28 PSI" },
      { sku: "EU 12.4/13.6 - 26", size: "12.4/13.6 - 26", ply: "16 B", weight: "64 kg", diameter: "1260 mm", sectionWidth: "320 mm", treadWidth: "300 mm", treadCount: 16, treadDepth: "48 mm", inflationPressure: "28 PSI" },
      { sku: "EU 13.6 - 26", size: "13.6 - 26", ply: "16 B", weight: "64 kg", diameter: "1260 mm", sectionWidth: "320 mm", treadWidth: "300 mm", treadCount: 16, treadDepth: "48 mm", inflationPressure: "28 PSI" },
      { sku: "EU 12.4 - 28", size: "12.4 - 28", ply: "16 B", weight: "62 kg", diameter: "1260 mm", sectionWidth: "320 mm", treadWidth: "300 mm", treadCount: 16, treadDepth: "48 mm", inflationPressure: "28 PSI" },
      { sku: "EU 13.6 - 28", size: "13.6 - 28", ply: "16 B", weight: "71 kg", diameter: "1340 mm", sectionWidth: "340 mm", treadWidth: "320 mm", treadCount: 16, treadDepth: "48 mm", inflationPressure: "28 PSI" },
      { sku: "EU 14.9 - 28", size: "14.9 - 28", ply: "16 B", weight: "71 kg", diameter: "1340 mm", sectionWidth: "340 mm", treadWidth: "320 mm", treadCount: 16, treadDepth: "48 mm", inflationPressure: "28 PSI" },
      { sku: "EU 12.4 - 32", size: "12.4 - 32", ply: "16 B", weight: "68 kg", diameter: "1340 mm", sectionWidth: "340 mm", treadWidth: "320 mm", treadCount: 16, treadDepth: "48 mm", inflationPressure: "28 PSI" },
    ],
  },
  {
    id: "gai-dao-s",
    name: "Gai Dão S",
    type: "Đi Rừng",
    description: "Mô tả chi tiết cho loại gai Gai Dão S.",
    imageUrl: "https://placehold.co/600x600/888/fff?text=Gai+Dão+S",
    models: [
      { sku: "EU 800 - 16", size: "800 - 16", ply: "12 B", weight: "22 kg", diameter: "808 mm", sectionWidth: "212 mm", treadWidth: "200 mm", treadCount: 13, treadDepth: "38 mm", inflationPressure: "30 PSI" },
      { sku: "EU 800 - 18", size: "800 - 18", ply: "12 B", weight: "21 kg", diameter: "808 mm", sectionWidth: "212 mm", treadWidth: "200 mm", treadCount: 13, treadDepth: "38 mm", inflationPressure: "30 PSI" },
    ],
  },
  {
    id: "gai-moc-7",
    name: "Gai Móc 7",
    type: "Đi Rừng",
    description: "Mô tả chi tiết cho loại gai Gai Móc 7.",
    imageUrl: "https://placehold.co/600x600/999/fff?text=Gai+Móc+7",
    models: [
      { sku: "EU 18.4 - 30", size: "18.4 - 30", ply: "16 B", weight: "137 kg", diameter: "1600 mm", sectionWidth: "445 mm", treadWidth: "425 mm", treadCount: 16, treadDepth: "80 mm", inflationPressure: "33 PSI" },
    ],
  },
  {
    id: "gai-ngang",
    name: "Gai Ngang",
    type: "Đi Rừng",
    description: "Mô tả chi tiết cho loại gai Gai Ngang.",
    imageUrl: "https://placehold.co/600x600/aaa/fff?text=Gai+Ngang",
    models: [
      { sku: "EU 650 - 12", size: "650 - 12", ply: "14 B", weight: "13.5 kg", diameter: "655 mm", sectionWidth: "174 mm", treadWidth: "170 mm", treadCount: 13, treadDepth: "24 mm", inflationPressure: "30 PSI" },
    ],
  },
  {
    id: "gai-xoi",
    name: "Gai Xới",
    type: "Đi Ruộng",
    description: "Mô tả chi tiết cho loại gai Gai Xới.",
    imageUrl: "https://placehold.co/600x600/bbb/fff?text=Gai+Xới",
    models: [
      { sku: "EU 600 - 12", size: "600 - 12", ply: "10 B", weight: "11.5 kg", diameter: "620 mm", sectionWidth: "162 mm", treadWidth: "160 mm", treadCount: 14, treadDepth: "20 mm", inflationPressure: "30 PSI" },
      { sku: "EU 600 - 14", size: "600 - 14", ply: "10 B", weight: "11.5 kg", diameter: "645 mm", sectionWidth: "146 mm", treadWidth: "147 mm", treadCount: 14, treadDepth: "23 mm", inflationPressure: "30 PSI" },
      { sku: "EU 650 - 14", size: "650 - 14", ply: "12 B", weight: "13 kg", diameter: "675 mm", sectionWidth: "160 mm", treadWidth: "154 mm", treadCount: 14, treadDepth: "23 mm", inflationPressure: "30 PSI" },
      { sku: "EU 700 - 14", size: "700 - 14", ply: "12 B", weight: "13 kg", diameter: "675 mm", sectionWidth: "160 mm", treadWidth: "154 mm", treadCount: 14, treadDepth: "23 mm", inflationPressure: "30 PSI" },
      { sku: "EU 750 - 16", size: "750 - 16", ply: "12 B", weight: "16.5 kg", diameter: "800 mm", sectionWidth: "188 mm", treadWidth: "180 mm", treadCount: 17, treadDepth: "25 mm", inflationPressure: "30 PSI" },
    ],
  },
  {
    id: "gai-xoi-l",
    name: "Gai Xới L",
    type: "Đi Ruộng",
    description: "Mô tả chi tiết cho loại gai Gai Xới L.",
    imageUrl: "https://placehold.co/600x600/ccc/fff?text=Gai+Xới+L",
    models: [
      { sku: "EU 650 - 12", size: "650 - 12", ply: "18 B", weight: "15.5 kg", diameter: "680 mm", sectionWidth: "182 mm", treadWidth: "180 mm", treadCount: 13, treadDepth: "30 mm", inflationPressure: "30 PSI" },
    ],
  },
  {
    id: "gai-xoi-t",
    name: "Gai Xới T",
    type: "Đi Ruộng",
    description: "Mô tả chi tiết cho loại gai Gai Xới T.",
    imageUrl: "https://placehold.co/600x600/ddd/fff?text=Gai+Xới+T",
    models: [
      { sku: "EU 800 - 16", size: "800 - 16", ply: "12 B", weight: "18 kg", diameter: "810 mm", sectionWidth: "184 mm", treadWidth: "180 mm", treadCount: 17, treadDepth: "25 mm", inflationPressure: "30 PSI" },
      { sku: "EU 800 - 18", size: "800 - 18", ply: "12 B", weight: "18 kg", diameter: "810 mm", sectionWidth: "184 mm", treadWidth: "180 mm", treadCount: 17, treadDepth: "25 mm", inflationPressure: "30 PSI" },
    ],
  },
  {
    id: "gai-xuoi",
    name: "Gai Xuôi",
    type: "Đi Ruộng",
    description: "Mô tả chi tiết cho loại gai Gai Xuôi.",
    imageUrl: "https://placehold.co/600x600/eee/fff?text=Gai+Xuôi",
    models: [
      { sku: "EU 650 - 12", size: "650 - 12", ply: "14 B", weight: "13.5 kg", diameter: "655 mm", sectionWidth: "174 mm", treadWidth: "170 mm", treadCount: 13, treadDepth: "24 mm", inflationPressure: "30 PSI" },
    ],
  },
  {
    id: "hq-tiron",
    name: "HQ TIRON",
    type: "Đi Rừng",
    description: "Mô tả chi tiết cho loại gai HQ TIRON.",
    imageUrl: "https://placehold.co/600x600/111/fff?text=HQ+TIRON",
    models: [
      { sku: "EU 13.6 - 36-1", size: "13.6 - 36", ply: "16 B", weight: "92 kg", diameter: "1530 mm", sectionWidth: "340 mm", treadWidth: "320 mm", treadCount: 21, treadDepth: "58 mm", inflationPressure: "29 PSI" },
      { sku: "EU 13.6 - 36-2", size: "13.6 - 36", ply: "16 B", weight: "90 kg", diameter: "1530 mm", sectionWidth: "340 mm", treadWidth: "320 mm", treadCount: 21, treadDepth: "58 mm", inflationPressure: "29 PSI" },
    ],
  },
  {
    id: "luc-si",
    name: "Lực Sĩ",
    type: "Đi Rừng",
    description: "Mô tả chi tiết cho loại gai Lực Sĩ.",
    imageUrl: "https://placehold.co/600x600/222/fff?text=Lực+Sĩ",
    models: [
      { sku: "EU 11.2 - 20", size: "11.2 - 20", ply: "14 B", weight: "42 kg", diameter: "1050 mm", sectionWidth: "244 mm", treadWidth: "240 mm", treadCount: 16, treadDepth: "44 mm", inflationPressure: "28 PSI" },
      { sku: "EU 12.00 - 20", size: "12.00 - 20", ply: "14 B", weight: "49 kg", diameter: "1110 mm", sectionWidth: "280 mm", treadWidth: "264 mm", treadCount: 18, treadDepth: "38 mm", inflationPressure: "29 PSI" },
      { sku: "EU 13.6 - 20", size: "13.6 - 20", ply: "16 B", weight: "61 kg", diameter: "1185 mm", sectionWidth: "296 mm", treadWidth: "300 mm", treadCount: 15, treadDepth: "45 mm", inflationPressure: "33 PSI" },
      { sku: "EU 9.5 - 22", size: "9.5 - 22", ply: "14 B", weight: "40 kg", diameter: "1050 mm", sectionWidth: "244 mm", treadWidth: "240 mm", treadCount: 16, treadDepth: "44 mm", inflationPressure: "28 PSI" },
      { sku: "EU 9.5 - 24", size: "9.5 - 24", ply: "14 B", weight: "38 kg", diameter: "1050 mm", sectionWidth: "244 mm", treadWidth: "240 mm", treadCount: 16, treadDepth: "44 mm", inflationPressure: "28 PSI" },
      { sku: "EU 11.2 - 24", size: "11.2 - 24", ply: "14 B", weight: "47 kg", diameter: "1110 mm", sectionWidth: "280 mm", treadWidth: "264 mm", treadCount: 18, treadDepth: "38 mm", inflationPressure: "29 PSI" },
      { sku: "EU 12.2 - 24", size: "12.2 - 24", ply: "14 B", weight: "54 kg", diameter: "1185 mm", sectionWidth: "296 mm", treadWidth: "300 mm", treadCount: 19, treadDepth: "45 mm", inflationPressure: "33 PSI" },
      { sku: "EU 13.6 - 24", size: "13.6 - 24", ply: "14 B", weight: "54 kg", diameter: "1185 mm", sectionWidth: "296 mm", treadWidth: "300 mm", treadCount: 19, treadDepth: "45 mm", inflationPressure: "33 PSI" },
      { sku: "EU 16.9 - 28", size: "16.9 - 28", ply: "16 B", weight: "110 kg", diameter: "1460 mm", sectionWidth: "425 mm", treadWidth: "395 mm", treadCount: 20, treadDepth: "48 mm", inflationPressure: "25 PSI" },
      { sku: "EU 16.9 - 30", size: "16.9 - 30", ply: "16 B", weight: "109 kg", diameter: "1460 mm", sectionWidth: "425 mm", treadWidth: "395 mm", treadCount: 20, treadDepth: "48 mm", inflationPressure: "25 PSI" },
      { sku: "EU 12.4 - 32", size: "12.4 - 32", ply: "16 B", weight: "88 kg", diameter: "1360 mm", sectionWidth: "370 mm", treadWidth: "350 mm", treadCount: 20, treadDepth: "46 mm", inflationPressure: "28 PSI" },
    ],
  },
  {
    id: "moc-7",
    name: "Móc 7",
    type: "Đi Rừng",
    description: "Mô tả chi tiết cho loại gai Móc 7.",
    imageUrl: "https://placehold.co/600x600/333/fff?text=Móc+7",
    models: [
      { sku: "EU 16.9 - 28", size: "16.9 - 28", ply: "14 B", weight: "114 kg", diameter: "1470 mm", sectionWidth: "430 mm", treadWidth: "410 mm", treadCount: 15, treadDepth: "70 mm", inflationPressure: "25 PSI" },
      { sku: "EU 18.4 - 28", size: "18.4 - 28", ply: "16 B", weight: "141 kg", diameter: "1600 mm", sectionWidth: "445 mm", treadWidth: "425 mm", treadCount: 16, treadDepth: "80 mm", inflationPressure: "33 PSI" },
      { sku: "EU 16.9 - 30", size: "16.9 - 30", ply: "16 B", weight: "112 kg", diameter: "1470 mm", sectionWidth: "430 mm", treadWidth: "410 mm", treadCount: 15, treadDepth: "70 mm", inflationPressure: "25 PSI" },
      { sku: "EU 16.9 - 34", size: "16.9 - 34", ply: "16 B", weight: "136 kg", diameter: "1600 mm", sectionWidth: "445 mm", treadWidth: "425 mm", treadCount: 16, treadDepth: "80 mm", inflationPressure: "33 PSI" },
    ],
  },
  {
    id: "pelttlas",
    name: "PELTTLAS",
    type: "Đi Rừng",
    description: "Mô tả chi tiết cho loại gai PELTTLAS.",
    imageUrl: "https://placehold.co/600x600/444/fff?text=PELTTLAS",
    models: [
      { sku: "EU 13.6 - 36-1", size: "13.6 - 36", ply: "16 B", weight: "100 kg", diameter: "1530 mm", sectionWidth: "340 mm", treadWidth: "320 mm", treadCount: 23, treadDepth: "58 mm", inflationPressure: "29 PSI" },
      { sku: "EU 15.5 - 36", size: "15.5 - 36", ply: "16 B", weight: "100 kg", diameter: "1530 mm", sectionWidth: "340 mm", treadWidth: "320 mm", treadCount: 23, treadDepth: "58 mm", inflationPressure: "29 PSI" },
      { sku: "EU 13.6 - 36-2", size: "13.6 - 36", ply: "16 B", weight: "98 kg", diameter: "1530 mm", sectionWidth: "340 mm", treadWidth: "320 mm", treadCount: 23, treadDepth: "58 mm", inflationPressure: "29 PSI" },
    ],
  },
];
