import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const QueryProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} position="top" />
  </QueryClientProvider>
);

export default QueryProvider;
