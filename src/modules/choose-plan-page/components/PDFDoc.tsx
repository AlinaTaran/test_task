import { LoadingAnimation } from "../../../components/loading-animation";
import stars_doc_b from "../assets/stars_document-b.svg";
import { renderImage } from "../helpers/renderImage";
import { IPaymentPageInteractor } from "../types";
import { BannerYourDocIsReady } from "./BannerYourDocIsReady";
import { useTranslation } from "next-i18next";
import Image from "next/image";

interface IProps {
  isImageLoading: boolean;
  interactor: IPaymentPageInteractor;
}
export const PDFDoc = ({ isImageLoading, interactor }: IProps) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-[466px] w-full">
      <div className="relative hidden tablet:flex items-center justify-center bg-[#EBE7F5] px-[81px] py-10 rounded-[10px] tablet:min-h-[500px]">
        {isImageLoading && (
          <div className="w-[400px]">
            <LoadingAnimation currentState="loading" />
          </div>
        )}
        <BannerYourDocIsReady />
        {renderImage(interactor)}
      </div>
      <div className="hidden tablet:block">
        <div className="flex flex-col gap-y-3 justify-center items-center text-[16px] leading-[24px] mt-6 text-center">
          <p>
            <strong>4.5</strong> {t("payment_page.out_of")} <strong>5</strong>{" "}
            {t("payment_page.based")} <br />
            {t("payment_page.reviews_counter")}
          </p>
          <Image src={stars_doc_b} alt="stars_doc" className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
};
