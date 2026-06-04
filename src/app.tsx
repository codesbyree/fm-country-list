import Homepage from "./app/homepage";
import ThemeProvider from "./features/theme-provider/components/theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <Homepage />
    </ThemeProvider>
  );
}
