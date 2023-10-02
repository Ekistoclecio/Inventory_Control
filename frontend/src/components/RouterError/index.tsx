import { Box, Typography } from "@mui/material";

export default function RouterError() {
  return (
    <Box
      display="flex"
      alignItems={"center"}
      justifyContent={"center"}
      height={"100%"}
    >
      <Typography variant="h6">Error 404: Pagina não encontrada!</Typography>
    </Box>
  );
}
