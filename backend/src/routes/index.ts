import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ProductController } from "../controllers/ProductController";

const routes = Router();

// Rotas publicas
routes.post("/user/create", new UserController().create);
routes.post("/user/login", new UserController().login);
//-----------------------------------------------

// Middlewares
routes.use(authMiddleware);
//-----------------------------------------------

// Rotas autenticadas
routes.put("/user/changeUserData", new UserController().changeUserData);
routes.patch(
  "/user/changeUserPassword",
  new UserController().changeUserPassword
);
routes.get("/user/products/:page", new UserController().getProducts);

routes.post("/product/create", new ProductController().create);
routes.delete("/product/delete/:name", new ProductController().delete);
routes.put("/product/update", new ProductController().update);
routes.get("/product", new ProductController().searchByName);
//-----------------------------------------------

export default routes;
