import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { RegisterFormProps } from "../../interface/componentProps.interface";
import { useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegisterFormData } from "../../interface/forms.interface";
import { signUp } from "../../services/api/signUp";
import { useAlertContext } from "../../providers/context/alertContext";

const registerFormSchema = z
  .object({
    name: z.string().nonempty("O nome é obrigatório"),
    lastName: z.string().nonempty("O sobrenome é obrigatório"),
    email: z
      .string()
      .nonempty("O e-mail é obrigatório")
      .email("Formato de e-mail inválido"),
    password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterForm({ changeLoginForm }: RegisterFormProps) {
  const { openAlert } = useAlertContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "all",
    resolver: zodResolver(registerFormSchema),
  });

  async function userRegister(registerData: UserRegisterFormData) {
    const response = await signUp(registerData);
    if (response?.status && response.status >= 200 && response.status <= 300) {
      openAlert(response.data.message, "success");
      changeLoginForm();
    } else {
      openAlert(response?.data.message, "error");
    }
  }
  return (
    <Box width={280} padding={2}>
      <Typography variant="h6" marginBottom={2} textAlign={"center"}>
        Cadastrar
      </Typography>
      <Box component="form" onSubmit={handleSubmit(userRegister)}>
        <Box display={"flex"} flexDirection={"column"} gap={2} marginBottom={2}>
          <TextField
            label="Nome"
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            label="Sobrenome"
            variant="outlined"
            type="text"
            size="small"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            fullWidth
            {...register("lastName")}
          />
          <TextField
            label="E-mail"
            variant="outlined"
            type="text"
            size="small"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            {...register("email")}
          />
          <TextField
            label="Senha"
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
                    aria-label="Alterna a visibilidade da senha"
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
            label="Repetir senha"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            size="small"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Alterna a visibilidade da confirmação da senha"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("confirmPassword")}
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"} marginBottom={1}>
          <Button type="submit" variant="contained">
            Registrar
          </Button>
        </Box>
      </Box>
      <Typography textAlign={"center"}>Ja possui um cadastro?</Typography>
      <Box display={"flex"} marginTop={-1} justifyContent={"center"}>
        <Button onClick={changeLoginForm}>Entrar</Button>
      </Box>
    </Box>
  );
}
