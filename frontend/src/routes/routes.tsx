import { createBrowserRouter } from "react-router-dom";
import RouterError from "../components/RouterError";
import ProductContent from "../components/ProductContent";
import UserContent from "../components/UserContent";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import Home from "../pages/Home";

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
