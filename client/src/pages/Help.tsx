import { useEffect, useState } from "react";
import { IHelpData } from "../utils/types";
import { Banner } from "../components/Banner";
import toast from "react-hot-toast";
import { toastStyles } from "../utils/constants";
import { SomethingWentWrong } from "../components/SomethingWentWrong";
import { Label } from "../components/Label";

export const Help = () => {
  const [helpData, setHelpData] =
    useState<IHelpData | null>(null);
  const [loading, setLoading] = useState(false);
  const BE_API_URL = import.meta.env.VITE_BE_URL;

  const getHelpDetails = () => {
    setLoading(true);
    fetch(`${BE_API_URL}/help`)
      .then((res) => res.json())
      .then((data) => {
        setHelpData(data);
      })
      .catch((error) => {
        console.error("Error fetching menu: ", error);
        toast.error("Something went wrong", {
          style: toastStyles,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getHelpDetails();
  }, []);

  return (
    <div>
      {loading ? (
        <Banner label={`Loading...`} />
      ) : (
        <>
          {helpData ? (
            <div className="flex flex-col items-center space-y-4">
              <Label text="Contact Us" />
              <div className="text-lg">
                <div>Name: {helpData?.name}</div>
                <div>Email: {helpData?.email}</div>
              </div>
            </div>
          ) : (
            <>
              <SomethingWentWrong />
            </>
          )}
        </>
      )}
    </div>
  );
};
