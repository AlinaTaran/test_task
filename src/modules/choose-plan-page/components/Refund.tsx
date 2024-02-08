import { useTranslation } from "next-i18next";

export const Refund = () => {
  const { t } = useTranslation();

  return (
    <p className="text-[14px] leading-[18px] tablet:text-[17px] tablet:leading-[28px] text-[#575757]">
      <span className="font-[700]">
        {t("payment_page.refund_description_1")}
      </span>{" "}
      <span>{t("payment_page.refund_description_2")}</span>{" "}
      <a href="mailto:support@pdfmaster.app" className="text-[#575757]">
        support@pdfmaster.app
      </a>
      {", "}
      <span>{t("payment_page.refund_description_3")}</span>
    </p>
  );
};
