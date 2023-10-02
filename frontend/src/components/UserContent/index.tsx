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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import ChangePasswordModal from "../ChangePasswordModal";
import { UserDataEditForm } from "../../interface/forms.interface";
import { useSessionContext } from "../../providers/context/sessionContext";
import { changeUserData } from "../../services/api/changeUserData";
import { useAlertContext } from "../../providers/context/alertContext";
import { setToStorage } from "../../utils/storage";

const dataUserFormSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  lastName: z.string().nonempty("O sobrenome é obrigatório"),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
});

type DataUserForm = z.infer<typeof dataUserFormSchema>;

const defaultEditFieldForm = {
  name: false,
  lastName: false,
  email: false,
};

export default function UserContent() {
  const { userSession, setUserSession, logout } = useSessionContext();
  const { openAlert } = useAlertContext();
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
  const [editFieldForm, setEditFieldForm] = useState({
    name: false,
    lastName: false,
    email: false,
  });
  const [errorInEmailField, setErrorInEmailField] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DataUserForm>({
    mode: "all",
    resolver: zodResolver(dataUserFormSchema),
    values: {
      name: userSession?.name || "",
      lastName: userSession?.lastName || "",
      email: userSession?.email || "",
    },
  });
  const getUserName = useCallback(() => {
    console.log(userSession?.name);
    return userSession?.name || "";
  }, [userSession]);

  function handleEditFieldButton(field: "name" | "lastName" | "email") {
    if (!errors[field]) {
      if (!editFieldForm[field]) {
        reset();
      }
      setEditFieldForm({
        ...defaultEditFieldForm,
        [field]: !editFieldForm[field],
      });
    }
  }

  async function handleEditForm(userData: UserDataEditForm) {
    console.log(userData);
    if (!userSession) return;
    const response = await changeUserData(userData, userSession.token);
    if (response?.status === 401) {
      logout();
    } else if (
      response?.status &&
      response.status >= 200 &&
      response.status <= 300
    ) {
      openAlert(response.data.message, "success");
      setUserSession({
        ...userSession,
        name: userData.name.charAt(0).toUpperCase() + userData.name.slice(1),
        lastName:
          userData.lastName.charAt(0).toUpperCase() +
          userData.lastName.slice(1),
        email: userData.email,
      });
      setToStorage("activeSession", {
        ...userSession,
        name: userData.name.charAt(0).toUpperCase() + userData.name.slice(1),
        lastName:
          userData.lastName.charAt(0).toUpperCase() +
          userData.lastName.slice(1),
        email: userData.email,
      });
      setErrorInEmailField(false);
    } else {
      openAlert(response?.data.message, "error");
      if (response?.data.field === "email") {
        setErrorInEmailField(true);
        setEditFieldForm({
          ...defaultEditFieldForm,
          email: true,
        });
      }
    }
  }

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
