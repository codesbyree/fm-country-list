import { Outlet } from "react-router-dom";

import ThemeProvider from "../../features/theme-provider/components/theme-provider";
import Header from "../shared/header";

export default function MainLayout() {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}
