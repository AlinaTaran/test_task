// import { EDIT_FILENAME_LC_KEY, EDIT_FILE_LC_KEY } from '@/common/constants'
import { useRemoteConfig } from "../../providers/remote-config-provider";
import { useUser } from "../../providers/user-provider";
import { API } from "../../services/api";
import {
  PaymentPlanId,
  useGetSubscriptionProducts,
} from "../../use-cases/get-subscription-products";
import { PAGE_LINKS } from "./constants/pageLinks";
import { useImageCover } from "./hooks/useImageCover";
import { usePlans } from "./hooks/usePlans";
import { IPaymentPageInteractor, InternalFileType, Plan } from "./types";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const usePaymentPageInteractor = (): IPaymentPageInteractor => {
  const router = useRouter();

  const { products } = useGetSubscriptionProducts();
  const { user } = useUser();
  const { setSelectedPlan } = usePlans();
  const {
    setFile,
    loadPdfCover,
    isImageLoading,
    loadImageCover,
    imagePDF,
    file,
    fileLink,
  } = useImageCover();

  const { abTests, isRemoteConfigLoading } = useRemoteConfig();

  const onCommentsFlip = () => {
    console.log("send event analytic0");
  };

  useEffect(() => {
    if (user?.subscription !== null) {
      router.push(`${PAGE_LINKS.DASHBOARD}`);
    }

    if (!user?.email) {
      router.back();

      return;
    }

    if (user?.email !== null) {
      return;
    }

    if (router.query?.token) {
      API.auth.byEmailToken(router.query.token as string);
    }
  }, [user?.subscription, user?.email, router.query?.token]);

  // @NOTE: analytics on page rendered
  useEffect(() => {
    if (!localStorage.getItem("select_plan_view")) {
      console.log("send event analytic3");
    }

    localStorage.setItem("select_plan_view", "true");

    return () => {
      localStorage.removeItem("select_plan_view");
    };
  }, []);

  useEffect(() => {
    API.files.getFiles().then((res) => {
      if (router.query?.file) {
        const chosenFile = res.files.find(
          (item) => item.id === router.query!.file
        );

        setFile(chosenFile);

        return;
      }
      setFile(res.files[res.files.length - 1]);
    });
  }, [API, router.query?.file]);

  // @NOTE: setting pre-select plan for users from remarketing emails
  useEffect(() => {
    if (router.query?.fromEmail === "true") {
      setSelectedPlan(PaymentPlanId.MONTHLY_FULL_SECOND_EMAIL);
      return;
    }
  }, [abTests]);

  useEffect(() => {
    loadPdfCover();
    loadImageCover();
  }, []);

  return {
    onCommentsFlip,

    imagePDF: imagePDF ? imagePDF : null,
    isImageLoading,
    fileName: file ? file.filename : null,
    fileType: file ? file.internal_type : null,
    fileLink,
    isEditorFlow:
      (router.query?.source === "editor" ||
        router.query?.source === "account") &&
      router.query.convertedFrom === undefined,
    isSecondEmail: router.query?.fromEmail === "true",
    isThirdEmail: router.query?.fromEmail === "true",

    isRemoteConfigLoading,

    isPlansLoading: products.length === 0,
  };
};
