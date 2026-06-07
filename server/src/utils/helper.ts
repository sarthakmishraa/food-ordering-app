import { IPurchasedItem } from "../types/types";
import {
  DISCOUNT_PERCENTAGE,
  PAGE_SIZE,
  TAX_PERCENTAGE,
} from "./constants";
import { menuItems } from "./mocks";

export const getTotalAmountFromOrderSummary = (
  itemsPurchased: IPurchasedItem[],
  includeTax: boolean
) => {
  let amount = 0;
  itemsPurchased?.map((purchasedItem) => {
    const itemObj = menuItems?.find(
      (i) => i?.id === purchasedItem?.id
    );
    if (!itemObj) return false;

    amount +=
      purchasedItem?.quantity *
      (itemObj?.price -
        (itemObj?.price * DISCOUNT_PERCENTAGE) / 100);
  });

  if (includeTax) {
    amount = amount + (amount * TAX_PERCENTAGE) / 100;
    return amount;
  } else {
    return amount;
  }
};

export function searchThroughItems(
  searchText: string,
  data: any[],
  keysToSearch: string[],
  pageNumber: string | number,
  pageSize: number = PAGE_SIZE
) {
  let filteredData = data || [];
  if (searchText) {
    const loweredCaseSearchText = searchText.toLowerCase();
    filteredData = data.filter((item) => {
      return keysToSearch?.every((key) => {
        return item?.[key]
          ?.toString()
          .toLowerCase()
          .includes(loweredCaseSearchText);
      });
    });
  }

  const totalItems = filteredData.length;

  if (pageNumber === undefined || pageNumber === null) {
    return {
      data: filteredData,
      pagination: {
        totalItems,
        totalPages: 1,
        currentPage: 0,
        hasMore: false,
      },
    };
  }

  const pageNo =
    typeof pageNumber === "string"
      ? parseInt(pageNumber, 10)
      : pageNumber;
  const validPageNo = isNaN(pageNo) ? 0 : pageNo;

  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = validPageNo * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = filteredData.slice(
    startIndex,
    endIndex
  );

  return {
    data: paginatedData,
    totalItems,
    // totalPages,
    // currentPage: validPageNo,
    hasMore: validPageNo < totalPages - 1,
  };
}
