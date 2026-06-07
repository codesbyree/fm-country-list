import AspectRatio from "../../../components/ui/aspect-ration";
import Skeleton from "../../../components/ui/skeleton";

export default function CountryDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
      <AspectRatio ratio={16 / 9}>
        <Skeleton className="w-full h-full" />
      </AspectRatio>

      <Skeleton className="w-50 h-5 lg:w-60 lg:h-7" />
    </div>
  );
}
