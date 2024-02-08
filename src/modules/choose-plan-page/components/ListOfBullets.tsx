import { Plan } from "../types";
import Image from "next/image";

interface IListOfBullets {
  plan: Plan[];
}

export const ListOfBullets = ({ plan }) => {
  return (
    <ul className="mobile:flex mobile:flex-col mobile:flex-wrap mobile:max-h-[144px]">
      {plan.bullets.map((point, inx) => (
        <li
          key={inx}
          className="text-[14px] tablet:text-[16px] leading-[18px] tablet:leading-[24px] font-[600] mb-3 last:mb-0 flex gap-x-2 mobile:items-center"
        >
          <Image src={point.imgSrc} alt="point" />
          {point.bullText}
        </li>
      ))}
    </ul>
  );
};
