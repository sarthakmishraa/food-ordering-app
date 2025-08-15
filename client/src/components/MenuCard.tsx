import { IMenuCard } from "../utils/types";
import { PrimaryButton } from "./PrimaryButton";
import {
  INRSymbol,
  placeholderUrl,
  DISCOUNT_PERCENTAGE,
  toastStyles,
} from "../utils/constants";
import { useAppDispatch } from "../store/hooks";
import { addItemToCart } from "../slices/cartSlice";
import toast from "react-hot-toast";

export const MenuCard = (props: IMenuCard) => {
  const item = props.item;

  const dispatch = useAppDispatch();

  const discountedPrice =
    item?.price - (item?.price * DISCOUNT_PERCENTAGE) / 100;

  const price = (
    price: number,
    extraClassNames?: string
  ) => {
    return (
      <div
        className={`${extraClassNames} text-lg font-semibold`}
      >
        <span className="mx-1">{INRSymbol}</span>
        {price}
      </div>
    );
  };

  const addToCart = () => {
    const itemToCart = {
      id: item?.id,
      quantity: 1,
    };
    dispatch(addItemToCart(itemToCart));
    toast.success(`${item?.name} added to cart`, {
      style: toastStyles,
    });
  };

  return (
    <div
      key={item?.id}
      className="p-2 space-y-2 text-sm font-normal border border-slate-300 rounded-md"
    >
      <div className="flex items-center">
        <img
          src={placeholderUrl}
          alt="food item"
          className="w-[148px] h-[108px]"
        />
        <div className="flex flex-col mx-4 space-y-2 w-full">
          <div className="text-center text-lg font-medium">
            {item?.name}
          </div>
          <div className="overflow-hidden text-ellipsis">
            {item?.description}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <s>{price(item?.price)}</s>
              {price(discountedPrice, "!text-2xl")}
            </div>
            <PrimaryButton
              text="Add to cart"
              onClick={addToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
