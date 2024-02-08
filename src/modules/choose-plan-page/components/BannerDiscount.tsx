import { useTranslation } from "next-i18next";

export const BannerDiscount = () => {
  const { t } = useTranslation();

  return (
    <div
      className="flex justify-center items-center w-full bg-[#FF6A48] text-[#FFFFFF] text-[11px] leading-[18px]
tablet:text-[16px] tablet:leading-[22px] tablet:py-1 absolute top-0 left-0 rounded-[10px_10px_0_0] font-medium"
    >
      <p>{t("payment_page.discount_for_monthly")}</p>
    </div>
  );
};
