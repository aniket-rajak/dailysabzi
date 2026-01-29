import { ShoppingCart, Truck, Leaf } from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Easy Ordering",
    desc: "Browse & order groceries in just a few clicks.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Same day delivery with live order tracking.",
  },
  {
    icon: Leaf,
    title: "Fresh & Organic",
    desc: "Directly sourced from farms for freshness.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg text-center animate-fade-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <item.icon className="w-12 h-12 mx-auto text-emerald-600" />
            <h3 className="mt-4 text-xl font-semibold text-emerald-800">
              {item.title}
            </h3>
            <p className="mt-2 text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
