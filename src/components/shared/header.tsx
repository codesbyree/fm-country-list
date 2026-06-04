import ThemeToggler from "../../features/theme-provider/components/theme-toggler";

export default function Header() {
  return (
    <header className="bg-card p-6 py-8 flex items-center justify-between shadow-md shadow-slate-500/10">
      <p className="font-bold text-foreground">Where in the world?</p>
      <ThemeToggler />
    </header>
  );
}
