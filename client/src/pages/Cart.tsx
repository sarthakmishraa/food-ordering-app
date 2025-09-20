import { useEffect } from "react";
import { Banner } from "../components/Banner";
import {
  getCartSummary,
  useCart,
  useCartSummary,
} from "../slices/cartSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";
import {
  INRSymbol,
  IPaymentMethod,
  NetworkStatusEnum,
} from "../utils/constants";
import { mockOrderSummary } from "../utils/mockData";
import { SomethingWentWrong } from "../components/SomethingWentWrong";
import { LoadingScreen } from "../components/LoadingScreen";

export const Cart = () => {
  const cart = useAppSelector(useCart);
  const {
    data: cartSummaryData,
    networkStatus: cartSummaryNetworkStatus,
  } = useAppSelector(useCartSummary);

  const amountAfterTax =
    cartSummaryData?.amountAfterTax || 0;
  const amountBeforeTax =
    cartSummaryData?.amountBeforeTax || 0;
  const itemsFromCartDetails =
    cartSummaryData?.itemsFromCartDetails || [];
  const selectedAddress = mockOrderSummary?.selectedAddress;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartSummary(cart));
  }, []);

  return (
    <div className="w-full h-full">
      {cartSummaryNetworkStatus ===
      NetworkStatusEnum.Error ? (
        <SomethingWentWrong />
      ) : cartSummaryNetworkStatus ===
        NetworkStatusEnum.Loading ? (
        <>
          <LoadingScreen />
        </>
      ) : cartSummaryNetworkStatus ===
        NetworkStatusEnum.Loaded ? (
        <>
          <Banner label={"Your cart"} />
          <div className="w-full h-[480px] flex flex-row px-2 py-4 space-x-2">
            <div className="w-full flex flex-col justify-between p-2 space-y-2 border border-[color:var(--color-border)] rounded-sm">
              <div className="border border-[color:var(--color-border)] rounded-sm p-4">
                Stepper
              </div>
              <div className="flex flex-grow border border-[color:var(--color-border)] rounded-sm p-4">
                <div>
                  <div>{selectedAddress?.address}</div>
                  <div>{selectedAddress?.city}</div>
                  <div>{selectedAddress?.countryCode}</div>
                  <div>{selectedAddress?.pincode}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[40%] justify-between p-2 border border-[color:var(--color-border)] rounded-sm overflow-y-auto space-y-4">
              <div>
                {itemsFromCartDetails?.map(
                  (item, index: number) => (
                    <div className="p-2" key={index}>
                      <div className="flex justify-between">
                        <div>{item?.dish?.name}</div>
                        <div>
                          Price:{" "}
                          {item?.dish?.price *
                            item?.quantity}
                        </div>
                      </div>
                      <div>Quantity: {item?.quantity}</div>
                    </div>
                  )
                )}
                <hr />
                <div className="p-2 flex justify-between">
                  <div>Total</div>
                  <div>
                    {`${INRSymbol} ${amountBeforeTax?.toFixed(
                      2
                    )}`}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold">
                  <div>Amount including tax: </div>
                  <div>{`${INRSymbol} ${amountAfterTax?.toFixed(
                    2
                  )}`}</div>
                </div>
                <div className="flex justify-between font-bold">
                  <div>Payment Method: </div>
                  <div>{IPaymentMethod.ONLINE}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
