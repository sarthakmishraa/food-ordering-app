import { IBanner } from "../utils/types";

export const Banner = ({
  label,
  containerClassNames,
  labelClassNames,
}: IBanner) => {
  return (
    <div
      className={`${containerClassNames} h-32 w-full flex justify-center items-center bg-green-800 rounded-sm`}
    >
      <div
        className={`${labelClassNames} text-3xl text-slate-300 font-medium`}
      >
        {label}
      </div>
    </div>
  );
};
