import type { ComponentPropsWithoutRef } from "react";
import type { CountryData } from "../types/country-detail.types";

import { cn } from "../../../utils/cn.utils";
import { getCurrencies, getLanguages, getNativeName } from "../utils/country-detail.utils";
import { numberFormat } from "../../../utils/number.utils";

import AspectRatio from "../../../components/ui/aspect-ration";
import CardDetailRow from "../../../components/ui/card-detail-row";
import CountryBorders from "./country-borders";

interface Props extends ComponentPropsWithoutRef<"article"> {
  data: CountryData;
}

export default function CountryDetailCard(props: Props) {
  const { className, data, ...rest } = props;

  return (
    <article className={cn("flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-20", className)} {...rest}>
      <AspectRatio ratio={16 / 9} className="border border-slate-200 dark:border-background">
        <img src={data.flags.svg} alt={data.flags.alt} className="w-full h-full lg:h-auto object-cover" />
      </AspectRatio>

      <div className="flex flex-col gap-8 lg:gap-12">
        <h1 className="font-bold text-xl text-foreground lg:text-2xl">{data.name.common}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          <div className="flex flex-col gap-4">
            <CardDetailRow label="Native Name" value={getNativeName(data)} />
            <CardDetailRow label="Population" value={numberFormat(data.population)} />
            <CardDetailRow label="Region" value={data.region} />
            <CardDetailRow label="Sub Region" value={data.subregion} />
            <CardDetailRow label="Capital" value={data.capital.join(", ")} />
          </div>

          <div className="flex flex-col gap-4">
            <CardDetailRow label="Tol Level Domain" value={data.tld.join(", ")} />
            <CardDetailRow label="Currencies" value={getCurrencies(data).join(", ")} />
            <CardDetailRow label="Languages" value={getLanguages(data).join(", ")} />
          </div>
        </div>

        <CountryBorders borders={data.borders} />
      </div>
    </article>
  );
}
