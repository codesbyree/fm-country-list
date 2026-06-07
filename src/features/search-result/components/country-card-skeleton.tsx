import AspectRatio from "../../../components/ui/aspect-ration";
import Skeleton from "../../../components/ui/skeleton";

export default function CountryCardSekeleton() {
  return (
    <div className="w-70 rounded-lg shadow-lg overflow-hidden bg-card">
      <AspectRatio ratio={16 / 9}>
        <Skeleton className="w-full h-full" />
      </AspectRatio>

      <div className="p-6">
        <Skeleton className="h-5 w-40 mb-6" />
        <Skeleton className="h-5 w-30 mb-3" />
        <Skeleton className="h-5 w-25 mb-3" />
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
  );
}
