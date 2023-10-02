import { Request, Response } from "express";
import { userRepository } from "../repositories/UserRepository";
import { productRepository } from "../repositories/ProductRepository";
import { validate } from "uuid";

// Classe responsável pelas funções de tratamento das rotas relacionadas aos produtos.
export class ProductController {
  // Função que realiza o cadastro de um novo produto, associando-o a um determinado usuário.
  async create(req: Request, res: Response) {
    const { name, quantity } = req.body;

    if (!name || !quantity) {
      return res.status(400).json({ message: "Requisição inválida" });
    }

    try {
      const user = await userRepository.findOneBy({ id: req.userId });
      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado!" });
      }

      const validateUniqueNameProduct = await productRepository.findOneBy({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        user: {
          id: req.userId,
        },
      });

      if (validateUniqueNameProduct) {
        return res.status(400).json({
          message: "Um produto com esse nome já está cadastrado no sistema.",
        });
      }

      const newProduct = productRepository.create({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        quantity,
        user: user,
      });

      await productRepository.save(newProduct);

      return res.status(201).json({ message: "Produto criado com sucesso!" });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }

  // Função responsável por excluir um produto da lista de produtos do usuário.
  async delete(req: Request, res: Response) {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ message: "Requisição inválida" });
    }

    try {
      const result = await productRepository.delete({
        name,
        user: {
          id: req.userId,
        },
      });

      if (result.affected > 0) {
        return res.json({ message: "Produto excluído com sucesso!" });
      } else {
        return res.status(404).json({
          message:
            "Produto não encontrado, por favor tente recarregar a página.",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }

  // Função responsável por atualizar os dados de um determinado produto já cadastrado no banco de dados.
  async update(req: Request, res: Response) {
    const { name, quantity, product_id } = req.body;

    if (!name || !quantity || !product_id) {
      return res.status(400).json({ message: "Requisição inválida" });
    }

    try {
      if (!validate(product_id)) {
        return res.status(400).json({
          message:
            "Produto não encontrado, por favor tente recarregar a página.",
        });
      }

      const result = await productRepository.update(
        {
          id: product_id,
          user: {
            id: req.userId,
          },
        },
        {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          quantity,
        }
      );

      if (result.affected > 0) {
        return res
          .status(200)
          .json({ message: "Produto atualizado com sucesso!" });
      } else {
        return res.status(400).json({
          message:
            "Produto não encontrado, por favor tente recarregar a página.",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }

  // Função que recebe uma string e busca quais produtos na lista de produtos do usuário possuem um nome cujas iniciais coincidam com a string.
  async searchByName(req: Request, res: Response) {
    const searchString = req.query.searchString as string;

    if (searchString?.length <= 0) {
      return res.status(400).json({ message: "Requisição inválida" });
    }

    try {
      const products = await productRepository
        .createQueryBuilder("product")
        .where("LOWER(product.name) ILIKE LOWER(:searchString)", {
          searchString: `${searchString}%`,
        })
        .andWhere("product.user.id = :userId", { userId: req.userId })
        .getMany();

      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
}
