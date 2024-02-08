import { PaymentPlanId } from "../../../use-cases/get-subscription-products";
import radio_off from "../assets/radio-off.svg";
import radio_on from "../assets/radio-on.svg";
import { Plan } from "../types";
import { useTranslation } from "next-i18next";
import Image from "next/image";

interface IPlanSelect {
  plan: Plan;
  selectedPlan: PaymentPlanId;
}

export const PlanSelect = ({ plan, selectedPlan }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between text-[15px] tablet:text-[25px] font-semibold leading-[18px] tablet:leading-[30px]">
      <div className="flex items-center">
        {selectedPlan === plan.id ? (
          <Image
            src={radio_on}
            alt="radio-off"
            className="w-6 tablet:w-7 mr-2 tablet:mr-4 cursor-pointer"
          />
        ) : (
          <Image
            src={radio_off}
            alt="radio-off"
            className="w-6 tablet:w-7 mr-2 tablet:mr-4 cursor-pointer"
          />
        )}
        <h4 className="font-[600]">
          {plan.id === PaymentPlanId.MONTHLY_FULL_SECOND_EMAIL
            ? t("payment_page.plans.monthly_full.title_premium")
            : plan.title}
        </h4>
      </div>
      <span className="text-[18px] tablet:text-[25px] leading-[24px] tablet:leading-[25px] font-[800]">
        {plan.price}
        <span className="text-[14px] tablet:text-[18px] leading-[18px] tablet:leading-[24px] font-[400]">
          {plan.date}
        </span>
      </span>
    </div>
  );
};
