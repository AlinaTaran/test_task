import black_star from "../assets/black-star.svg";
import { useTranslation } from "next-i18next";
import Image from "next/image";

export const BannerMostPopular = () => {
  const { t } = useTranslation();

  return (
    <div
      className="flex justify-center items-center w-full bg-[#FFD9A5] text-[10px] leading-[12px]
tablet:text-[12px] tablet:leading-[18px] py-1 absolute top-0 left-0 rounded-[12px_12px_0_0] font-bold"
    >
      <Image
        src={black_star}
        alt="black_star"
        className="mr-[3px] tablet:mr-[5px]"
      />
      <p>{t("payment_page.most_popular")}</p>
    </div>
  );
};
