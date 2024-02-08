import { API } from "../../../services/api";
import { ApiFile } from "../../../services/api/types";
import { generatePDFCover } from "../../../use-cases/generate-pdf-cover";
import { imagesFormat } from "../constants/imagesFormat";
import { InternalFileType } from "../types";
import { useRouter } from "next/router";
import { useState } from "react";

export const useImageCover = () => {
  const router = useRouter();

  const [file, setFile] = useState<ApiFile>();
  const [fileLink, setFileLink] = useState<string | null>(null);
  const [imagePDF, setImagePDF] = useState<Blob | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // @NOTE: generating cover for pdf-documents
  const loadPdfCover = async (): Promise<void> => {
    if (!file || file.internal_type !== "PDF") {
      return;
    }

    setIsImageLoading(true);

    try {
      const fileUrl = await (async () => {
        if (router.query?.file) {
          return router.query.editedFile === "true"
            ? API.files
                .editedFile(router.query.file as string)
                .then((r) => r.url)
            : API.files
                .downloadFile(router.query.file as string)
                .then((r) => r.url);
        }

        return API.files.downloadFile(file.id).then((r) => r.url);
      })();

      const pdfCover = await generatePDFCover({
        pdfFileUrl: fileUrl,
        width: 640,
      });
      setImagePDF(pdfCover);
    } finally {
      setIsImageLoading(false);
    }
  };

  const loadImageCover = async () => {
    if (
      !file ||
      !imagesFormat.includes(file.internal_type) ||
      // @NOTE: this two checks fir filename exists because sometimes OS do not pass file.type correctly
      !imagesFormat.includes(
        file.filename.slice(-3).toUpperCase() as InternalFileType
      ) ||
      !imagesFormat.includes(
        file.filename.slice(-4).toUpperCase() as InternalFileType
      )
    ) {
      return;
    }
    const fileUrl = await (async () => {
      if (router.query?.file) {
        return router.query.editedFile === "true"
          ? API.files.editedFile(router.query.file as string).then((r) => r.url)
          : API.files
              .downloadFile(router.query.file as string)
              .then((r) => r.url);
      }

      return API.files.downloadFile(file.id).then((r) => r.url);
    })();

    setFileLink(fileUrl);
  };
  return {
    file,
    fileLink,
    loadPdfCover,
    loadImageCover,
    imagePDF,
    isImageLoading,
    setFile,
  };
};
