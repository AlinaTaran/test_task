import { PaymentPlanId } from "../../../use-cases/get-subscription-products";
import { Plan } from "../types";
import classNames from "classnames";
import { ReactNode } from "react";

interface IPlanContainerProps {
  id: number;
  children: ReactNode;
  plan: Plan;
  onClick: () => void;
}

export const PlanContainer = ({
  children,
  id,
  plan,
  onClick,
}: IPlanContainerProps) => {
  return (
    <div
      key={id}
      onClick={onClick}
      className={classNames(
        "bg-[#FFFFFF] hover:cursor-pointer rounded-[12px] p-5 tablet:p-0 tablet:py-9 tablet:px-9 tablet:mb-4 mb-3 relative",
        {
          "p-0 tablet:py-0 pt-[26px] pb-[14px] tablet:pt-[44px] tablet:pb-[28px] px-5":
            plan.id === PaymentPlanId.MONTHLY_FULL,
        },
        {
          "p-0 tablet:py-0 pt-[26px] pb-[14px] tablet:pt-[47px] tablet:pb-[19px] px-5":
            plan.id === PaymentPlanId.MONTHLY_FULL_SECOND_EMAIL,
        },
        {
          "p-0 tablet:py-0 pt-[26px] pb-[14px] tablet:pt-[47px] tablet:pb-[19px] px-5":
            plan.id === PaymentPlanId.MONTHLY_SECOND_EMAIL,
        },
        {
          "p-0 tablet:py-0 pt-[26px] pb-[14px] tablet:pt-[47px] tablet:pb-[19px] px-5":
            plan.id === PaymentPlanId.MONTHLY_FULL_THIRD_EMAIL,
        },
        {
          "p-0 tablet:py-0 pt-[26px] pb-[14px] tablet:pt-[47px] tablet:pb-[19px] px-5":
            plan.id === PaymentPlanId.MONTHLY_THIRD_EMAIL,
        }
      )}
    >
      {children}
    </div>
  );
};
