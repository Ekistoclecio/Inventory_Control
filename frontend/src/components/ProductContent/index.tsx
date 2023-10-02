import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateEditProductModal from "../CreateEditProductModal";
import { useProductsContext } from "../../providers/context/productsContext";
import { useProductContent } from "../../hooks/useProductContent";

// Componente responsável por renderizar a tabela de produtos juntamente com uma barra de pesquisa e um botão que permite criar um novo produto.
export default function ProductContent() {
  const { finishedProducts } = useProductsContext();
  const {
    searchString,
    setSearchString,
    searchedProducts,
    handleSearchInputValue,
    setProducts,
    handleOpenCreateEditProductModal,
    scrollContainerRef,
    handleScroll,
    products,
    loadingMoreData,
    openCreateEditProductModal,
    setOpenCreateEditProductModal,
    productData,
    deleteProduct,
  } = useProductContent();

  return (
    <>
      <Box marginTop={-1}>
        <Paper elevation={3}>
          <Box padding={2} display={"flex"} flexDirection={"column"} gap={2}>
            <Autocomplete
              freeSolo
              disableClearable
              fullWidth
              size="small"
              value={searchString}
              onChange={(event, newValue) => setSearchString(newValue)}
              options={searchedProducts.map((item) => item.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pesquisar Produto"
                  InputProps={{
                    onChange: (event) => handleSearchInputValue(event),
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Pesquiser produto"
                          edge="end"
                          onClick={() => setProducts(searchedProducts)}
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Button
              variant="contained"
              sx={{
                paddingY: 0,
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "max-content",
                alignSelf: "flex-end",
              }}
              onClick={() => handleOpenCreateEditProductModal()}
            >
              <Typography fontSize={26}>+</Typography>
              Adicionar Produto
            </Button>
            <TableContainer
              component={Paper}
              elevation={2}
              ref={scrollContainerRef}
              onScroll={handleScroll}
              sx={{
                maxHeight: "71vh",
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#cccccc",
                  borderRadius: "24px",
                },
              }}
            >
              <Table
                stickyHeader
                sx={{ minWidth: { md: 600, lg: 750 } }}
                aria-label="Tabela de produtos"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        maxWidth: "max-content",
                      }}
                    >
                      Quantidade
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "80px",
                      }}
                    >
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow
                      key={product.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          maxWidth: "max-content",
                        }}
                      >
                        {product.quantity}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          maxWidth: "max-content",
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            handleOpenCreateEditProductModal(
                              product.name,
                              product.quantity,
                              product.id
                            )
                          }
                          sx={{
                            color: "black",
                            backgroundColor: "#ffc107",
                            ":hover": {
                              backgroundColor: "#e0a800",
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteProduct(product.name)}
                          sx={{
                            color: "white",
                            backgroundColor: "#dc3545",
                            ":hover": {
                              backgroundColor: "#c82333",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!finishedProducts && loadingMoreData && (
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  marginBottom={2}
                >
                  <CircularProgress size={30} />
                </Box>
              )}
            </TableContainer>
          </Box>
        </Paper>
      </Box>
      <CreateEditProductModal
        isOpenCreateEditProductModal={openCreateEditProductModal}
        closeCreateEditProductModal={() => setOpenCreateEditProductModal(false)}
        productName={productData.name}
        productQuantity={productData.quantity}
        productId={productData.id}
      />
    </>
  );
}
