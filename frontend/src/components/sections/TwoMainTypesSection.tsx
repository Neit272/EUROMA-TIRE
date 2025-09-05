import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const mainTypes = [
  {
    name: "Lốp Đi Rừng",
    description: "Khả năng chống cắt chém, bám đường vượt trội trên địa hình hiểm trở.",
    href: "/gai?type=di-rung",
  },
  {
    name: "Lốp Đi Ruộng",
    description: "Thiết kế gai đặc biệt giúp thoát bùn nhanh, tăng sức kéo trên nền đất yếu.",
    href: "/gai?type=di-ruong",
  },
];

const TwoMainTypesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainTypes.map((type) => (
            <Link href={type.href} key={type.name}>
              <Card className="relative overflow-hidden group h-64 flex items-end p-6 bg-primary text-primary-foreground shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative z-10">
                  <CardTitle className="text-3xl font-bold">{type.name}</CardTitle>
                  <CardDescription className="text-gray-300 mt-2">{type.description}</CardDescription>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TwoMainTypesSection;
