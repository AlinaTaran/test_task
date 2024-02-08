import {
  PaymentPlanId,
  useGetSubscriptionProducts,
} from "../../../use-cases/get-subscription-products";
import { PAGE_LINKS } from "../constants/pageLinks";
import { useRouter } from "next/router";
import { useState } from "react";

interface IUsePlans {
  selectedPlan: PaymentPlanId;
  setSelectedPlan: (plan: PaymentPlanId) => void;
  onSelectPlan: (plan: PaymentPlanId) => void;
  onContinue: (place?: string) => void;
}

export const usePlans = (): IUsePlans => {
  const router = useRouter();
  const { products } = useGetSubscriptionProducts();

  const [selectedPlan, setSelectedPlan] = useState<PaymentPlanId>(
    PaymentPlanId.MONTHLY_FULL
  );

  const onSelectPlan = (plan: PaymentPlanId) => {
    if (selectedPlan === plan) {
      setSelectedPlan(plan);
      onContinue("planTab");

      return;
    }
    setSelectedPlan(plan);
    const product = products?.find((item) => item.name === plan);

    console.log(
      "send event analytic1",
      "productId: ",
      plan,
      "currency: ",
      product?.price?.currency || "USD",
      "value: ",
      (product?.price?.price || 0) / 100
    );
  };

  const onContinue = (place?: string) => {
    console.log(
      "send event analytic2",
      "place: ",
      place ? place : "button",
      "planName: ",
      selectedPlan
    );

    localStorage.setItem("selectedPlan", selectedPlan);

    router.push({ pathname: `${PAGE_LINKS.PAYMENT}`, query: router.query });
  };

  return { selectedPlan, setSelectedPlan, onSelectPlan, onContinue };
};
