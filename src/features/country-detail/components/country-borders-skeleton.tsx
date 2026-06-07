import Skeleton from "../../../components/ui/skeleton";

export default function CountryBordersSkeleton() {
  return (
    <div>
      <Skeleton className="w-40 h-5 mb-4" />

      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
      </div>
    </div>
  );
}
