import {
  FaClock,
  FaMobileAlt,
  FaRobot,
  FaStore,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaStore size={24} />,
    value: "100%",
    label: "Customizable",
  },
  {
    icon: <FaRobot size={24} />,
    value: "24/7",
    label: "AI Assistant",
  },
  {
    icon: <FaMobileAlt size={24} />,
    value: "All",
    label: "Devices",
  },
  {
    icon: <FaClock size={24} />,
    value: "Minutes",
    label: "Quick Setup",
  },
];

export const StatsSection = () => {
  return (
    <section className="mt-24">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="
                rounded-2xl
                border
                border-[color:var(--color-border)]
                bg-[color:var(--color-bg-surface)]
                p-8
                text-center
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "
          >
            <div className="mb-4 flex justify-center text-orange-500">
              {stat.icon}
            </div>

            <h3 className="text-3xl font-black">
              {stat.value}
            </h3>

            <p className="mt-2 text-sm opacity-70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
