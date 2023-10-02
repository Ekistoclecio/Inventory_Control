import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LoginFormProps } from "../../interface/componentProps.interface";
import { useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSessionContext } from "../../providers/context/sessionContext";
import { LoginFormData, loginFormSchema } from "../../utils/zod/loginForm";

// Componente responsável por renderizar o formulário de login do usuário.
export default function LoginForm({ changeRegisterForm }: LoginFormProps) {
  const { login } = useSessionContext();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  return (
    <Box width={280} padding={2}>
      <Typography variant="h6" marginBottom={2} textAlign={"center"}>
        Entrar
      </Typography>
      <Box component="form" onSubmit={handleSubmit(login)}>
        <Box display={"flex"} flexDirection={"column"} gap={2} marginBottom={2}>
          <TextField
            label="E-mail"
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            label="Senha"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Alterna a visibilidade da senha"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"} marginBottom={1}>
          <Button type="submit" variant="contained">
            Acessar
          </Button>
        </Box>
      </Box>
      <Typography textAlign={"center"}>
        Ainda não possui um cadastro?
      </Typography>
      <Box display={"flex"} marginTop={-1} justifyContent={"center"}>
        <Button onClick={changeRegisterForm}>Cadastre-se</Button>
      </Box>
    </Box>
  );
}
