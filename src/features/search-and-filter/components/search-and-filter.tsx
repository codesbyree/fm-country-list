import RegionFilter from "./region-filter";
import SearchForm from "./search-form";

export default function SearchAndFilter() {
  return (
    <section id="search-and-filter" className="flex flex-col gap-13">
      <SearchForm />
      <RegionFilter />
    </section>
  );
}
