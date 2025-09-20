import { IMenuCard } from "../utils/types";
import { PrimaryButton } from "./PrimaryButton";
import {
  INRSymbol,
  placeholderUrl,
  DISCOUNT_PERCENTAGE,
  toastStyles,
  REACT_ICONS_MD_ICON_SIZE,
  REACT_ICONS_IO_ICON_SIZE,
} from "../utils/constants";
import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";
import {
  addItemToCart,
  decreaseQuantityFromCart,
  removeItemFromCart,
  useCart,
} from "../slices/cartSlice";
import toast from "react-hot-toast";
import { Label } from "./Label";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { IoMdRemoveCircle } from "react-icons/io";

export const MenuCard = (props: IMenuCard) => {
  const item = props.item;

  const dispatch = useAppDispatch();
  const cart = useAppSelector(useCart);

  const isInCart = cart?.find((i) => i?.id === item?.id);

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
      quantity: isInCart?.quantity || 1,
    };
    dispatch(addItemToCart(itemToCart));
    toast.success(`${item?.name} added to cart`, {
      style: toastStyles,
    });
  };

  const decreaseQuantity = () => {
    if (isInCart?.quantity === 1) {
      toast.success(`${item?.name} removed from cart`, {
        style: toastStyles,
      });
    }
    const itemToDecrease = {
      id: isInCart?.id || "",
      quantity: isInCart?.quantity || 0,
    };
    dispatch(decreaseQuantityFromCart(itemToDecrease));
  };

  const removeFromCart = () => {
    const itemToRemove = {
      id: isInCart?.id || "",
      quantity: isInCart?.quantity || 0,
    };
    dispatch(removeItemFromCart(itemToRemove));
    toast.success(`${item?.name} removed from cart`, {
      style: toastStyles,
    });
  };

  return (
    <div
      key={item?.id}
      className="p-2 space-y-2 text-sm font-normal bg-[color:var(--color-bg-secondary)] rounded-md"
    >
      <div className="flex items-center">
        <img
          src={placeholderUrl}
          alt="food item"
          className="w-[148px] h-[108px] rounded-lg object-cover"
        />
        <div className="flex flex-col mx-4 space-y-2 w-full">
          <div className="text-lg font-medium">
            {item?.name}
          </div>
          <div className="overflow-hidden text-ellipsis line-clamp-2">
            {item?.description}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <s>{price(item?.price)}</s>
              {price(discountedPrice, "!text-2xl")}
            </div>
            {isInCart && isInCart?.quantity > 0 ? (
              <div className="flex items-center space-x-2">
                <PrimaryButton
                  children={
                    <IoMdRemoveCircle
                      size={REACT_ICONS_IO_ICON_SIZE}
                    />
                  }
                  onClick={decreaseQuantity}
                />
                <Label
                  text={isInCart?.quantity?.toString()}
                  className="w-[18px] text-center"
                />
                <PrimaryButton
                  children={
                    <IoMdAddCircle
                      size={REACT_ICONS_IO_ICON_SIZE}
                    />
                  }
                  onClick={addToCart}
                />
                <PrimaryButton
                  children={
                    <MdDelete
                      size={REACT_ICONS_MD_ICON_SIZE}
                    />
                  }
                  onClick={removeFromCart}
                />
              </div>
            ) : (
              <PrimaryButton
                text="Add to cart"
                onClick={addToCart}
                extraContainerClassNames="hover:bg-[color:var(--color-bg-surface)] hover:text-[color:var(--color-bg-secondary)] rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
