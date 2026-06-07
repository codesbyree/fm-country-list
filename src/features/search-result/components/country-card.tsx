import { Link } from "react-router-dom";
import { motion } from "motion/react";

import type { ComponentPropsWithoutRef } from "react";
import type { BaseResponse } from "../types/response.types";
import { numberFormat } from "../../../utils/number.utils";

import AspectRatio from "../../../components/ui/aspect-ration";
import CardDetailRow from "../../../components/ui/card-detail-row";

type Props = ComponentPropsWithoutRef<"article"> & BaseResponse;

const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
};

export default function CountryCard(props: Props) {
  const { name, flags, population, region, capital, cca3 } = props;

  return (
    <Link to={`/${cca3}`}>
      <motion.article layout variants={itemVariants} initial="hidden" animate="show" exit="exit" className="w-70 lg:w-full rounded-lg shadow-lg overflow-hidden bg-card">
        <AspectRatio ratio={16 / 9}>
          <img src={flags.svg} alt={flags.alt} className="w-full h-full object-cover bg-slate-200 dark:bg-slate-600" loading="lazy" />
        </AspectRatio>

        <div className="p-6 text-foreground border-t border-slate-200 dark:border-slate-900">
          <h4 className="mb-6 font-bold text-lg line-clamp-1">{name.common}</h4>
          <CardDetailRow className="mb-2" label="Population" value={numberFormat(population)} />
          <CardDetailRow className="mb-2" label="Region" value={region} />
          <CardDetailRow label="Capital" value={capital.join(",")} />
        </div>
      </motion.article>
    </Link>
  );
}
