import { QueryClient, QueryClientProvider as QCProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return <QCProvider client={queryClient}>{children}</QCProvider>;
}
