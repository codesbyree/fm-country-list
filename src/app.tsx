import Homepage from "./app/homepage";
import Header from "./components/shared/header";
import ThemeProvider from "./features/theme-provider/components/theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <Homepage />
    </ThemeProvider>
  );
}
