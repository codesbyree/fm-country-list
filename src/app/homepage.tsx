import PageTransition from "../components/shared/page-transition";
import SearchAndFilter from "../features/search-and-filter/components/search-and-filter";
import CountryCardList from "../features/search-result/components/country-card-list";

export default function Homepage() {
  return (
    <PageTransition>
      <main className="w-full h-full p-6">
        <SearchAndFilter />
        <CountryCardList />
      </main>
    </PageTransition>
  );
}
