import ThemeToggler from "../../features/theme-provider/components/theme-toggler";

export default function Header() {
  return (
    <header className="bg-card p-6 py-8 shadow-md shadow-slate-500/10 sticky top-0 z-1000">
      <div className="flex items-center justify-between lg:max-w-7xl w-full lg:mx-auto">
        <p className="font-bold text-foreground">Where in the world?</p>
        <ThemeToggler />
      </div>
    </header>
  );
}
