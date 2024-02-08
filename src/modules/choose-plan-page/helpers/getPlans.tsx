import {
  PaymentPlanId,
  useGetSubscriptionProducts,
} from "../../../use-cases/get-subscription-products";
import check from "../assets/check.svg";
import cross from "../assets/cross.svg";
import { Plan } from "../types";
import { getAnnualFormattedPrice } from "./getAnnualFormattedPrice";
import { getCurrency } from "./getCurrency";
import { getTrialFormattedPrice } from "./getTrialFormattedPrice";

export const getPlans = (t: (key: string) => string): Plan[] => {
  const { products } = useGetSubscriptionProducts();

  const bullets = [
    {
      imgSrc: check,
      bullText: <span>{t("payment_page.plans.annual.bullet1")}</span>,
    },
    {
      imgSrc: check,
      bullText: <span>{t("payment_page.plans.monthly.bullet2")}</span>,
    },
    {
      imgSrc: check,
      bullText: <span>{t("payment_page.plans.monthly.bullet3")}</span>,
    },
    {
      imgSrc: check,
      bullText: <span>{t("payment_page.plans.annual.bullet4")}</span>,
    },
    {
      imgSrc: check,
      bullText: <span>{t("payment_page.plans.annual.bullet5")}</span>,
    },
    {
      imgSrc: check,
      bullText: <span>{t("payment_page.plans.annual.bullet6")}</span>,
    },
    {
      imgSrc: check,
      bullText: <span>{t("payment_page.plans.annual.bullet7")}</span>,
    },
    {
      imgSrc: check,
      bullText: <span>{t("payment_page.plans.annual.bullet8")}</span>,
    },
  ];

  return [
    {
      id: products[0]?.name as PaymentPlanId,
      title: t("payment_page.plans.monthly.title"),
      price: getTrialFormattedPrice(
        products[0]?.price!.trial_price!,
        products[0]?.price!.currency
      ),
      fullPrice: getTrialFormattedPrice(
        products[0]?.price?.price,
        products[0]?.price?.currency
      ),
      formattedCurrency: getCurrency(products[0]?.price.currency),
      date: null,
      bullets: [
        bullets[0],
        bullets[1],
        bullets[2],
        {
          imgSrc: cross,
          bullText: (
            <span className="text-[#878787]">
              {t("payment_page.plans.monthly.bullet4")}
            </span>
          ),
        },
        {
          imgSrc: cross,
          bullText: (
            <span className="text-[#878787]">
              {t("payment_page.plans.monthly.bullet5")}
            </span>
          ),
        },
        {
          imgSrc: cross,
          bullText: (
            <span className="text-[#878787]">
              {t("payment_page.plans.monthly.bullet6")}
            </span>
          ),
        },
        {
          imgSrc: cross,
          bullText: (
            <span className="text-[#878787]">
              {t("payment_page.plans.monthly.bullet7")}
            </span>
          ),
        },
        {
          imgSrc: cross,
          bullText: (
            <span className="text-[#878787]">
              {t("payment_page.plans.monthly.bullet8")}
            </span>
          ),
        },
      ],
      // @ts-ignore
      text: t("payment_page.plans.monthly.text", {
        formattedPrice: getTrialFormattedPrice(
          products[0]?.price?.price,
          products[0]?.price?.currency
        ),
      }),
    },
    {
      id: products[1]?.name as PaymentPlanId,
      title: t("payment_page.plans.monthly_full.title"),
      price: getTrialFormattedPrice(
        products[1]?.price?.trial_price!,
        products[1]?.price?.currency
      ),
      fullPrice: getTrialFormattedPrice(
        products[1]?.price?.price,
        products[1]?.price?.currency
      ),
      formattedCurrency: getCurrency(products[1]?.price.currency),
      date: null,
      bullets: bullets,
      // @ts-ignore
      text: t("payment_page.plans.monthly_full.text", {
        formattedPrice: getTrialFormattedPrice(
          products[1]?.price?.price,
          products[1]?.price?.currency
        ),
      }),
    },
    {
      id: products[2]?.name as PaymentPlanId,
      title: t("payment_page.plans.annual.title"),
      price: getAnnualFormattedPrice(
        products[2]?.price?.price,
        products[2]?.price?.currency
      ),
      date: t("payment_page.plans.annual.date"),
      bullets: bullets,
      // @ts-ignore
      text: t("payment_page.plans.annual.text", {
        formattedPrice: getTrialFormattedPrice(
          products[2]?.price?.price,
          products[2]?.price?.currency
        ),
      }),
    },
  ];
};
