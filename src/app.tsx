import { AnimatePresence } from "motion/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Homepage from "./app/homepage";
import CountryDetailPage from "./app/country-detail-page";
import MainLayout from "./components/layout/main-layout";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />

          <Route path="/:cca" element={<CountryDetailPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
