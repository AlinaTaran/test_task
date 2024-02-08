import { PaymentPlanId } from "../../../use-cases/get-subscription-products";
import { Plan } from "../types";
import { ListOfBullets } from "./ListOfBullets";
import { Refund } from "./Refund";

interface IPlans {
  plans: Plan[];
  isSecondEmail: boolean;
  isThirdEmail: boolean;
  selectedPlan: PaymentPlanId;
}

export const Plans = ({
  plans,
  isSecondEmail,
  isThirdEmail,
  selectedPlan,
}: IPlans) => {
  return (
    <>
      {plans.map((plan, id) => (
        <div key={id}>
          {selectedPlan === plan.id && (
            <>
              <ListOfBullets plan={plan} />
              <p className="text-[14px] tablet:text-[17px] leading-[18px] tablet:leading-[24px] mt-4 tablet:mt-8 text-[#575757]">
                {plan.id === PaymentPlanId.ANNUAL ? (
                  <>{plan.text}</>
                ) : (
                  <>
                    {!isSecondEmail && !isThirdEmail && <>{plan.text}</>}
                    {(isSecondEmail || isThirdEmail) && (
                      <>
                        {" "}
                        After 7 days, auto-renews{" "}
                        <s>
                          {plan.formattedCurrency}
                          {plan.fullPrice === "€17.49" ? 34.99 : 49.99}
                        </s>{" "}
                        {plan.fullPrice} billed every month. Cancel anytime.
                      </>
                    )}
                  </>
                )}
              </p>
            </>
          )}
        </div>
      ))}
      <Refund />
    </>
  );
};
