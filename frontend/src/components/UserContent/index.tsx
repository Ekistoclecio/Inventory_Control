import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ChangePasswordModal from "../ChangePasswordModal";
import { useUserContent } from "../../hooks/useUserContent";

// Componente que exibe e permite editar os dados do usuário, incluindo um botão para alterar a senha.
export default function UserContent() {
  const {
    handleSubmit,
    handleEditForm,
    errors,
    editFieldForm,
    handleEditFieldButton,
    register,
    errorInEmailField,
    setOpenModalChangePassword,
    openModalChangePassword,
  } = useUserContent();
  return (
    <>
      <Box marginTop={-1}>
        <Paper elevation={3}>
          <Box padding={2}>
            <Typography variant="h6" textAlign={"center"} marginBottom={4}>
              Dados do Usuário
            </Typography>
            <Box
              component={"form"}
              onSubmit={handleSubmit(handleEditForm)}
              gap={2}
              display={"flex"}
              flexDirection={"column"}
            >
              <Box gap={2} display={"flex"}>
                <Box>
                  <TextField
                    label="Nome"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    InputProps={{
                      readOnly: !editFieldForm.name,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            type={editFieldForm.name ? "button" : "submit"}
                            onClick={() => handleEditFieldButton("name")}
                            aria-label="Editar Nome"
                            edge="end"
                          >
                            {editFieldForm.name ? <CheckIcon /> : <EditIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...register("name")}
                  />
                </Box>
                <TextField
                  label="Sobrenome"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  InputProps={{
                    readOnly: !editFieldForm.lastName,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleEditFieldButton("lastName")}
                          aria-label="Editar Sobrenome"
                          edge="end"
                          type={editFieldForm.lastName ? "button" : "submit"}
                        >
                          {editFieldForm.lastName ? (
                            <CheckIcon />
                          ) : (
                            <EditIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("lastName")}
                />
              </Box>
              <Box>
                <TextField
                  label="E-mail"
                  fullWidth
                  error={!!errors.email || errorInEmailField}
                  helperText={errors.email?.message}
                  InputProps={{
                    readOnly: !editFieldForm.email,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleEditFieldButton("email")}
                          aria-label="Editar E-mail"
                          edge="end"
                          type={editFieldForm.email ? "button" : "submit"}
                        >
                          {editFieldForm.email ? <CheckIcon /> : <EditIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("email")}
                />
              </Box>
            </Box>
            <Box marginTop={2}>
              <Button
                variant="contained"
                onClick={() => setOpenModalChangePassword(true)}
              >
                Alterar Senha
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
      <ChangePasswordModal
        isOpenModalChangePassword={openModalChangePassword}
        closeChangePasswordModal={() => setOpenModalChangePassword(false)}
      />
    </>
  );
}
