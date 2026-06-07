import BackButton from "../components/shared/back-button";
import PageTransition from "../components/shared/page-transition";
import CountryDetail from "../features/country-detail/components/country-detail";

export default function CountryDetailPage() {
  return (
    <PageTransition>
      <main className="w-full h-full p-6">
        <section id="country-detail" className="flex flex-col gap-13 lg:max-w-7xl lg:mx-auto">
          <BackButton />

          <CountryDetail />
        </section>
      </main>
    </PageTransition>
  );
}
