import { IBanner } from "../utils/types";

export const Banner = ({
  label,
  containerClassNames,
  labelClassNames,
}: IBanner) => {
  return (
    <div
      className={`${containerClassNames} h-32 w-full flex justify-center items-center bg-[color:var(--color-bg-secondary)] rounded-xl`}
    >
      <div
        className={`${labelClassNames} text-3xl text-[color:var(--color-text-primary)] font-medium`}
      >
        {label}
      </div>
    </div>
  );
};
