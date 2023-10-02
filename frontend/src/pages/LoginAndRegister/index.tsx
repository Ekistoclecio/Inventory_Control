import { Box, Paper } from "@mui/material";
import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

export default function LoginAndRegister() {
  const [isNewUser, setIsNewUser] = useState(false);
  return (
    <Box
      height={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        bgcolor={"#ECECEC"}
        paddingX={2}
        height={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexGrow={1}
        sx={{
          backgroundImage:
            'url("src/assets/images/loginAndRegisterScreenImage.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <Paper elevation={5}>
          {isNewUser ? (
            <RegisterForm changeLoginForm={() => setIsNewUser(false)} />
          ) : (
            <LoginForm changeRegisterForm={() => setIsNewUser(true)} />
          )}
        </Paper>
      </Box>
    </Box>
  );
}
