import { Link } from "react-router-dom";
import { motion } from "motion/react";

import type { ComponentPropsWithoutRef } from "react";
import type { BaseResponse } from "../types/response.types";

import AspectRatio from "../../../components/ui/aspect-ration";
import { numberFormat } from "../utils/search-result.utils";

type Props = ComponentPropsWithoutRef<"article"> & BaseResponse;

const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
};

export default function CountryCard(props: Props) {
  const { name, flags, population, region, capital, cca2 } = props;

  return (
    <Link to={cca2}>
      <motion.article layout variants={itemVariants} initial="hidden" animate="show" exit="exit" className="w-70 lg:w-full rounded-lg shadow-lg overflow-hidden bg-card">
        <AspectRatio ratio={16 / 9}>
          <img src={flags.svg} alt={flags.alt} className="w-full h-full object-cover bg-slate-200 dark:bg-slate-600" loading="lazy" />
        </AspectRatio>

        <div className="p-6 text-foreground border-t border-slate-200 dark:border-slate-900">
          <h4 className="mb-6 font-bold text-lg line-clamp-1">{name.common}</h4>
          <p className="mb-2 font-medium">
            Population:
            <span className="ml-1 opacity-70 font-normal">{numberFormat(population)}</span>
          </p>
          <p className="mb-2 font-medium">
            Region:
            <span className="ml-1 opacity-70 font-normal">{region}</span>
          </p>
          <p className="font-medium">
            Capital:
            <span className="ml-1 opacity-70 font-normal">{capital.join(",")}</span>
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
