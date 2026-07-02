import { Fragment, useState } from "react";
import Input from "../../components/Input";
import { Label } from "../../components/Label";
import { PrimaryButton } from "../../components/PrimaryButton";
import {
  signInUser,
  updateUserDetails,
  useUserDetails,
} from "../../slices/appContextSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks";
import {
  FieldMapper,
  IUserDetails,
} from "../../utils/types";
import {
  NetworkStatusEnum,
  REQUIRED_FIELD_LABEL,
  fieldMapper,
  toastStyles,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthPage = () => {
  const {
    data: userDetails,
    networkStatus: userDetailsNetworkStatus,
  } = useAppSelector(useUserDetails);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSignInPage = location.pathname === "/signin";
  const onSignUpPage = location.pathname === "/signup";

  const handleUserDetailsChange = <
    K extends keyof IUserDetails
  >(
    key: K,
    value: IUserDetails[K]
  ) => {
    dispatch(
      updateUserDetails({
        [key]: value,
      })
    );
  };

  const handleAuthSubmit = async () => {
    try {
      setIsSubmitted(true);

      const signInFields: FieldMapper[] = [];
      fieldMapper?.map(
        (field) =>
          field?.showOnSignIn && signInFields.push(field)
      );

      const fieldsArray = onSignInPage
        ? signInFields
        : fieldMapper;

      const validFieldsBoolean = fieldsArray?.map(
        (field) => {
          const val = userDetails?.[
            field?.fieldKey
          ] as string;
          const isValid = !!val?.trim();
          return isValid;
        }
      );

      const isFormValid = validFieldsBoolean?.every(
        (field) => field === true
      );
      if (!isFormValid) return;

      if (onSignInPage) {
        await dispatch(signInUser());
      } else if (onSignUpPage) {
        // await dispatch(signUpUser());
      }
      navigate("/");
    } catch (error) {
      toast.error(`Something went wrong: ${error}`, {
        style: toastStyles,
      });
    }
  };

  const handleAuthToggle = () => {
    setIsSubmitted(false);
    if (onSignUpPage) {
      navigate("/signin");
    } else if (onSignInPage) {
      navigate("/signup");
    }
  };

  return (
    <div className="px-24 py-8 w-full h-full flex-1 flex items-center justify-center">
      <div className="rounded p-6 w-[50%] border">
        <Label
          text={`${
            onSignUpPage
              ? "Create Account"
              : onSignInPage
              ? "Welcome Back !"
              : null
          }`}
          className="font-bold leading-tighter tracking-tighter p-2"
        />
        {fieldMapper?.map((item) => {
          const hasError = !(
            userDetails?.[item?.fieldKey] as string
          )?.trim();
          const showField =
            (onSignInPage && item?.showOnSignIn) ||
            onSignUpPage;

          return (
            <Fragment key={item?.fieldKey}>
              {showField ? (
                <div className="flex flex-col p-2 items-start justify-center gap-2">
                  <Label
                    text={item?.label}
                    className="m-0 text-base text-left font-normal"
                  />
                  <Input
                    value={
                      (userDetails?.[
                        item?.fieldKey
                      ] as string) ?? ""
                    }
                    onChange={(val) =>
                      handleUserDetailsChange(
                        item?.fieldKey,
                        val
                      )
                    }
                    inputClassName="duration-300"
                    placeholder={item?.placeholder}
                    type={item?.fieldType}
                  />
                  {isSubmitted && hasError && (
                    <Label
                      text={REQUIRED_FIELD_LABEL}
                      className="m-0 text-sm text-left font-normal text-[color:var(--color-error)]"
                    />
                  )}
                </div>
              ) : null}
            </Fragment>
          );
        })}
        <PrimaryButton
          text={
            onSignUpPage
              ? "Sign Up"
              : onSignInPage
              ? "Sign In"
              : "Submit"
          }
          extraButtonClassNames="text-center w-full !text-base !rounded-lg"
          extraContainerClassNames="my-6"
          onClick={handleAuthSubmit}
          disabled={
            userDetailsNetworkStatus ===
            NetworkStatusEnum.Loading
          }
        />
        <div className="flex gap-1">
          <Label
            text={
              onSignUpPage
                ? "Already have an account ?"
                : onSignInPage
                ? "Dont have an account ?"
                : "Submit"
            }
            className="text-base font-normal"
          />
          <Label
            text={
              onSignUpPage
                ? "Sign In"
                : onSignInPage
                ? "Sign Up"
                : ""
            }
            className="text-base cursor-pointer duration-300"
            onClick={handleAuthToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
