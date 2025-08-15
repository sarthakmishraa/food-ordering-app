import { Banner } from "../components/Banner";
import { TAX_PERCENTAGE } from "../utils/constants";
import {
  menuItems,
  mockOrderSummary,
} from "../utils/mockData";
import { IOrderSummary } from "../utils/types";

export const Cart = () => {
  const itemsPurchased = mockOrderSummary?.purchasedItems;
  const selectedAddress = mockOrderSummary?.selectedAddress;
  const paymentDetails = mockOrderSummary?.paymentDetails;

  const getTotalAmountFromOrderSummary = (
    orderSummary: IOrderSummary,
    includeTax: boolean
  ) => {
    let amount = 0;
    orderSummary?.purchasedItems?.map((purchasedItem) => {
      const itemObj = menuItems?.find(
        (i) => i?.id === purchasedItem?.id
      );
      if (!itemObj) return false;

      amount += purchasedItem?.quantity * itemObj?.price;
    });

    if (includeTax) {
      amount = amount + (amount * TAX_PERCENTAGE) / 100;
      return amount;
    } else {
      return amount;
    }
  };

  const totalAmount = getTotalAmountFromOrderSummary(
    mockOrderSummary,
    false
  );

  const totalAmountIncludingTax =
    getTotalAmountFromOrderSummary(mockOrderSummary, true);

  return (
    <div className="w-full h-full">
      <Banner label={"Content"} />
      <div className="w-full h-[480px] flex flex-row px-2 py-4 space-x-2">
        <div className="w-full flex flex-col justify-between p-2 space-y-2 border border-slate-300 rounded-sm">
          <div className="border border-slate-300 rounded-sm p-4">
            Stepper
          </div>
          <div className="flex flex-grow border border-slate-300 rounded-sm p-4">
            <div>Stepper Content</div>
          </div>
        </div>
        <div className="flex flex-col w-[40%] justify-between p-2 border border-slate-300 rounded-sm">
          <div>
            {itemsPurchased?.map((item) => {
              const foundItem = menuItems?.find(
                (i) => i?.id === item?.id
              );
              if (!foundItem) return;
              return (
                <div className="p-2">
                  <div className="flex justify-between">
                    <div>{foundItem?.name}</div>
                    <div>
                      Price:{" "}
                      {foundItem?.price * item?.quantity}
                    </div>
                  </div>
                  <div>Quantity: {item?.quantity}</div>
                </div>
              );
            })}
            <hr />
            <div className="p-2 flex justify-between">
              <div>Total</div>
              <div>{totalAmount}</div>
            </div>
          </div>
          <div>
            <div>{selectedAddress?.address}</div>
            <div>{selectedAddress?.city}</div>
            <div>{selectedAddress?.countryCode}</div>
            <div>{selectedAddress?.pincode}</div>
          </div>
          <div>
            <div>
              Amount including tax:{" "}
              {paymentDetails?.amount ||
                totalAmountIncludingTax}
            </div>
            <div>{paymentDetails?.paymentMethod}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
