import {
  MdRestaurant,
  MdBakeryDining,
  MdLocalCafe,
} from "react-icons/md";
import { TbChefHat } from "react-icons/tb";

const categories = [
  {
    icon: <MdRestaurant size={22} />,
    label: "Restaurants",
  },
  {
    icon: <TbChefHat size={22} />,
    label: "Cloud Kitchens",
  },
  {
    icon: <MdLocalCafe size={22} />,
    label: "Cafés",
  },
  {
    icon: <MdBakeryDining size={22} />,
    label: "Bakeries",
  },
];

export const CategoryPills = () => {
  return (
    <section className="mt-10">
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <div
            key={category.label}
            className="
                flex
                items-center
                gap-3
                rounded-full
                border
                border-[color:var(--color-border)]
                bg-[color:var(--color-bg-surface)]
                px-5
                py-3
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-lg
              "
          >
            {category.icon}

            <span className="font-medium">
              {category.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
