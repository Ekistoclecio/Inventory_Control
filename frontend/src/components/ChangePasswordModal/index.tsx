import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ChangePasswordModalProps } from "../../interface/componentProps.interface";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useChangePasswordModal } from "../../hooks/useChangePasswordModal";

// Componente responsável por renderizar o modal que permite ao usuário alterar sua senha.
export default function ChangePasswordModal({
  isOpenModalChangePassword,
  closeChangePasswordModal,
}: ChangePasswordModalProps) {
  const {
    closeModal,
    handleSubmit,
    changePassword,
    showPassword,
    errors,
    setShowPassword,
    register,
    showNewPassword,
    setShowNewPassword,
    showConfirmNewPassword,
    setShowConfirmNewPassword,
  } = useChangePasswordModal({ closeChangePasswordModal });

  return (
    <Modal
      open={isOpenModalChangePassword}
      onClose={closeModal}
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
          Alterar Senha
        </Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit(changePassword)}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <TextField
            label="Senha Atual"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            size="small"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Alterna a visibilidade da senha atual"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("password")}
          />
          <TextField
            label="Nova Senha"
            variant="outlined"
            type={showNewPassword ? "text" : "password"}
            size="small"
            fullWidth
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Alterna a visibilidade da senha nova"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    {showNewPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("newPassword")}
          />
          <TextField
            label="Repetir Nova Senha"
            variant="outlined"
            type={showConfirmNewPassword ? "text" : "password"}
            size="small"
            fullWidth
            error={!!errors.confirmNewPassword}
            helperText={errors.confirmNewPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Alterna a visibilidade da confirmação da senha nova"
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                    edge="end"
                  >
                    {showConfirmNewPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("confirmNewPassword")}
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
              Alterar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
