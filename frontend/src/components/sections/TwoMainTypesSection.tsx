import { getLoaiLops } from "@/lib/strapi";
import Link from "next/link";

export const TwoMainTypesSection = async () => {
  const tireTypes = await getLoaiLops();

  const jungleType = tireTypes.find(type => type.name === "Đi Rừng");
  const fieldType = tireTypes.find(type => type.name === "Đi Ruộng");

  const types = [
    {
      name: "Lốp Đi Rừng",
      description: "Chinh phục mọi địa hình hiểm trở, từ đường đất đá đến sình lầy.",
      href: "/gai?type=di-rung",
      imageUrl: jungleType?.imageUrl || "https://placehold.co/600x400/222/fff?text=Đi+Rừng",
    },
    {
      name: "Lốp Đi Ruộng",
      description: "Bám bùn vượt trội, chuyên dụng cho đồng ruộng và các bề mặt mềm.",
      href: "/gai?type=di-ruong",
      imageUrl: fieldType?.imageUrl || "https://placehold.co/600x400/444/fff?text=Đi+Ruộng",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {types.map((type) => (
            <Link href={type.href} key={type.name}>
              <div
                className="relative h-64 rounded-lg overflow-hidden group bg-cover bg-center p-8 flex flex-col justify-end items-start text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1)), url(${type.imageUrl})` }}
              >
                <h3 className="text-3xl font-bold">{type.name}</h3>
                <p className="mt-2 max-w-xs">{type.description}</p>
                <div className="mt-4 px-4 py-2 bg-white text-gray-900 font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Khám Phá Ngay
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TwoMainTypesSection;
