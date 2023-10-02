import { SessionProvider } from "./context/sessionContext";
import { AlertProvider } from "./context/alertContext";
import { ProductsProvider } from "./context/productsContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <SessionProvider>
        <ProductsProvider>{children}</ProductsProvider>
      </SessionProvider>
    </AlertProvider>
  );
}
