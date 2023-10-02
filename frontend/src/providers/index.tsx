import { SessionProvider } from "./context/sessionContext";
import { AlertProvider } from "./context/alertContext";
import { ProductsProvider } from "./context/productsContext";

// Componente responsável por agrupar os principais providers da aplicação.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <SessionProvider>
        <ProductsProvider>{children}</ProductsProvider>
      </SessionProvider>
    </AlertProvider>
  );
}
