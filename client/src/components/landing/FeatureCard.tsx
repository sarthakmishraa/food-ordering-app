interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <div
      className="
          rounded-2xl
          border
          border-[color:var(--color-border)]
          bg-[color:var(--color-bg-surface)]
          p-6
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-xl
        "
    >
      <div className="mb-5 text-3xl">{icon}</div>

      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-7 opacity-70">
        {description}
      </p>
    </div>
  );
};
