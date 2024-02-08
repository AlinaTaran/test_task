import { PrimaryButton } from "../../components/primary-button";
import { PaymentPlanId } from "../../use-cases/get-subscription-products";
import { BannerDiscount } from "./components/BannerDiscount";
import { BannerMostPopular } from "./components/BannerMostPopular";
import { BannerYourDocIsReady } from "./components/BannerYourDocIsReady";
import { Header } from "./components/Header";
import { PDFDoc } from "./components/PDFDoc";
import { PlanContainer } from "./components/PlanContainer";
import { PlanSelect } from "./components/PlanSelect";
import { Plans } from "./components/Plans";
import { getPlans } from "./helpers/getPlans";
import { renderImage } from "./helpers/renderImage";
import { usePlans } from "./hooks/usePlans";
import { IPaymentPageInteractor } from "./types";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import React, { useEffect } from "react";

export interface IProps {
  interactor: IPaymentPageInteractor;
  header: React.ReactNode;
}
export const PaymentPageRouter: React.FC<IProps> = ({ interactor, header }) => {
  const { t } = useTranslation();

  const { isSecondEmail, isThirdEmail, isImageLoading } = interactor;
  const { onContinue, selectedPlan, onSelectPlan } = usePlans();

  const plans = getPlans(t);

  useEffect(() => {
    if (document.getElementsByClassName("swiper-wrapper")[0]) {
      // @ts-ignore
      document.getElementsByClassName("swiper-wrapper")[0].style.display =
        "flex";
    }
  }, [interactor.isRemoteConfigLoading, interactor.isPlansLoading]);

  return (
    <>
      <Head>
        {/* @NOTE: viewer */}
        <link rel="stylesheet" type="text/css" href="/lib/PDFViewCtrl.css" />

        {/* @NOTE: viewer */}
        <script src="/lib/PDFViewCtrl.full.js"></script>
      </Head>
      {header}

      <div className="bg-[#F7F7F7] mobile:pt-[48px] pt-8 text-[#1D1D1D] !font-primaryB">
        <div className="bg-white fixed w-full bottom-0 left-0 flex justify-center mobile:hidden z-[1020] px-4 py-2">
          <PrimaryButton
            className="w-full max-w-[424px] !py-[17px] font-bold"
            onClick={() => onContinue()}
            data-testid="choose-plan-continue-button"
          >
            {t("payment_page.continue")}
          </PrimaryButton>
        </div>
        <div className="tablet:max-w-[1140px] mobile:max-w-[570px] mx-auto px-4 small-desktop:px-0">
          <Header onClick={() => onContinue()}></Header>

          <div className="pb-[150px] tablet:pb-[200px]">
            <div className="tablet:flex tablet:gap-x-4 max-w-[1140px] mx-auto">
              <PDFDoc isImageLoading={isImageLoading} interactor={interactor} />
              <div className="max-w-[658px] w-full mobile:max-w-full">
                {plans.map((plan, id) => (
                  <PlanContainer
                    id={id}
                    plan={plan}
                    onClick={() => onSelectPlan(plan.id)}
                  >
                    {plan.id === PaymentPlanId.MONTHLY_FULL && (
                      <BannerMostPopular />
                    )}
                    {/* ==== for 2nd email and 3rd email the same layout ======*/}

                    {(isSecondEmail || isThirdEmail) &&
                      plan.id !== PaymentPlanId.ANNUAL && <BannerDiscount />}

                    {/* ==== for 2nd email and 3rd email the same layout ======*/}

                    <PlanSelect plan={plan} selectedPlan={selectedPlan} />
                  </PlanContainer>
                ))}

                <div className="tablet:hidden my-4">
                  <div className="bg-[#EBE7F5] min-h-[390px] flex items-center justify-center px-[60px] py-[24px] rounded-[10px] relative">
                    <BannerYourDocIsReady />
                    {renderImage(interactor)}
                  </div>
                </div>

                <Plans
                  selectedPlan={selectedPlan}
                  isSecondEmail={isSecondEmail}
                  isThirdEmail={isThirdEmail}
                  plans={plans}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
