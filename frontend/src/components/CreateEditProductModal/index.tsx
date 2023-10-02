import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { CreateEditProductModalProps } from "../../interface/componentProps.interface";
import { useCreateEditProductModal } from "../../hooks/useCreateEditProductModal";

// Componente responsável por renderizar o modal que permite ao usuário adicionar um novo produto ou editar um produto já existente.
export default function CreateEditProductModal({
  isOpenCreateEditProductModal,
  closeCreateEditProductModal,
  productName,
  productQuantity,
  productId,
}: CreateEditProductModalProps) {
  const {
    handleSubmit,
    handleCreateEditProduct,
    errors,
    register,
    closeModal,
  } = useCreateEditProductModal({
    closeCreateEditProductModal,
    productId,
    productName,
  });
  return (
    <Modal
      open={isOpenCreateEditProductModal}
      onClose={closeCreateEditProductModal}
      aria-labelledby="Alterar Senha"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "#fff",
          borderRadius: 5,
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          textAlign={"center"}
          marginBottom={2}
        >
          {productName?.length > 0 ? "Editar Produto" : "Adicionar Produto"}
        </Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit(handleCreateEditProduct)}
          display={"flex"}
          gap={2}
          flexDirection={"column"}
        >
          <TextField
            label="Nome do Produto"
            variant="outlined"
            type={"text"}
            size="small"
            defaultValue={productName.length > 0 ? productName : ""}
            fullWidth
            error={!!errors.newProductName}
            helperText={errors.newProductName?.message}
            {...register("newProductName")}
          />
          <TextField
            label="Quantidade"
            variant="outlined"
            type="number"
            size="small"
            defaultValue={productName.length > 0 ? productQuantity : ""}
            fullWidth
            error={!!errors.newProductQuantity}
            helperText={errors.newProductQuantity?.message}
            {...register("newProductQuantity", {
              setValueAs: (value: string) => parseInt(value),
            })}
          />
          <Box display={"flex"} gap={2} justifyContent={"flex-end"}>
            <Button onClick={closeModal} variant="outlined">
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                alignSelf: "center",
                width: "min-content",
              }}
            >
              {productName.length > 0 ? "Salvar" : "Criar"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
