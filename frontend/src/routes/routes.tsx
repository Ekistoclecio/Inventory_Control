import { createBrowserRouter } from "react-router-dom";
import RouterError from "../pages/RouterError";
import ProductContent from "../components/ProductContent";
import UserContent from "../components/UserContent";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import Home from "../pages/Home";

// Define as rotas presentes na aplicação quando o usuário está logado.
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <RouterError />,
    children: [
      {
        path: "/",
        element: <ProductContent />,
      },
      {
        path: "user",
        element: <UserContent />,
      },
    ],
  },
]);

// Fornece um array de configuração que é utilizado na renderização dos elementos de navegação.
export const navOptions = [
  {
    text: "Produtos",
    icon: <InventoryIcon />,
    url: "/",
  },
  {
    text: "Usuário",
    icon: <PersonIcon />,
    url: "/user",
  },
];
