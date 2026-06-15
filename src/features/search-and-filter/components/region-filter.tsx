import { useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

export default function RegionFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleValueChange = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query.length) params.set("region", query);
    else {
      params.delete("region");
    }

    params.set("offset", "0");
    params.set("limit", "25");
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="w-full max-w-55">
      <Select onValueChange={handleValueChange} defaultValue={searchParams.get("region") ?? ""}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Region" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="africa">Africa</SelectItem>
            <SelectItem value="americas">Americas</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="oceania">Oceania</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
