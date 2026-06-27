import { IBanner } from "../utils/types";

export const Banner = ({
  label,
  containerClassNames,
  labelClassNames,
}: IBanner) => {
  return (
    <div className="w-full relative">
      <div
        className={`h-32 w-full flex justify-center items-center rounded-xl shadow-md border ${containerClassNames}`}
      >
        <div
          className={`font-bold text-3xl sm:text-5xl lg:text-7xl tracking-tight text-[color:var(--color-text-primary)] ${labelClassNames}`}
        >
          {label}
        </div>
      </div>
      <div className="absolute inset-x-0 -bottom-px h-0.5 w-full bg-gradient-to-r from-transparent via-[color:var(--color-text-primary)] to-transparent"></div>
    </div>
  );
};
