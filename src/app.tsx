import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./app/homepage";
import CountryDetailPage from "./app/country-detail-page";
import MainLayout from "./components/layout/main-layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/:cca2" element={<CountryDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
