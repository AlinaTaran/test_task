import { PrimaryButton } from "../../../components/primary-button";
import { useTranslation } from "next-i18next";

interface IHeader {
  onClick: () => void;
}

export const Header = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between tablet:mb-10">
      <h1
        className="mb-6 tablet:mb-0 text-[28px] leading-[30px] font-[900] tablet:text-[39px]
      tablet:leading-[54px] mobile:mx-auto tablet:mx-0 text-center mobile:text-start"
        data-testid="choose-plan-headline"
      >
        {t("payment_page.choose_plan")}
      </h1>
      <PrimaryButton
        className="hidden mobile:block w-[273px] !text-[20px] !leading-[30px] !py-4 !rounded-[12px] font-bold"
        onClick={onClick}
      >
        {t("payment_page.continue")}
      </PrimaryButton>
    </div>
  );
};
