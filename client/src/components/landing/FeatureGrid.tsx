import {
  FaBolt,
  FaMobileAlt,
  FaRobot,
  FaShoppingCart,
} from "react-icons/fa";

import { FeatureCard } from "./FeatureCard";

const features = [
  {
    title: "Lightning Fast Setup",
    description:
      "Launch your restaurant ordering platform in just a few minutes.",
    icon: <FaBolt />,
  },
  {
    title: "AI Assistant",
    description:
      "Let Gusto answer customer questions and provide menu recommendations.",
    icon: <FaRobot />,
  },
  {
    title: "Mobile Friendly",
    description:
      "Optimized for phones, tablets, and desktops out of the box.",
    icon: <FaMobileAlt />,
  },
  {
    title: "Online Ordering",
    description:
      "Accept orders directly from your customers without extra hassle.",
    icon: <FaShoppingCart />,
  },
];

export const FeatureGrid = () => {
  return (
    <section className="mt-24">
      <div className="text-center">
        <h2 className="text-4xl font-black">
          Everything you need
        </h2>

        <p className="mt-4 text-lg opacity-70">
          KitchenFlow provides all the tools to manage your
          online ordering experience.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};
