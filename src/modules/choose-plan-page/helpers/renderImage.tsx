import fake_file from "../assets/fake-file.svg";
import { useImageCover } from "../hooks/useImageCover";
import { IPaymentPageInteractor, InternalFileType } from "../types";
import Image from "next/image";

export const renderImage = (interactor: IPaymentPageInteractor) => {
  const { imagePDF, isImageLoading, fileLink } = useImageCover();

  const isPDFFile = interactor.fileType === "PDF";

  const isImage =
    interactor.fileType === InternalFileType.JPEG ||
    interactor.fileType === InternalFileType.JPG ||
    interactor.fileType === InternalFileType.PNG;

  if (isPDFFile) {
    if (imagePDF !== null) {
      return (
        <Image
          src={URL.createObjectURL(imagePDF)}
          width={312}
          height={472}
          alt="file_img"
        />
      );
    }

    if (imagePDF === null && !isImageLoading) {
      return <Image src={fake_file} alt="fake_file" priority />;
    }

    return null;
  }

  if (isImage && fileLink) {
    return (
      <Image
        src={fileLink}
        alt="file_img"
        className="w-full max-w-[222px] h-auto tablet:max-w-[303px]"
        width={250}
        height={300}
      />
    );
  }

  return <Image src={fake_file} alt="fake_file" />;
};
