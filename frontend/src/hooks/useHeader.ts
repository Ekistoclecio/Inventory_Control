// Hook responsável por gerir a lógica do componente "Header".
export function useHeader() {
  const titles = {
    "/": "Produtos",
    "/user": "Usuário",
  };

  // Função que utiliza o nome (name) e sobrenome (lastName) para gerar uma cor de fundo personalizada para o avatar do usuário.
  function generateRandomAvatarBackgroundColor(fullName: string) {
    let hash = 0;
    let i;

    for (i = 0; i < fullName.length; i += 1) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  // Função que extrai as iniciais do nome (name) e sobrenome (lastName) do usuário para serem usadas no avatar.
  function generateAvatarString(fullName: string) {
    return `${fullName.split(" ")[0][0]}${fullName.split(" ")[1][0]}`;
  }

  return { generateRandomAvatarBackgroundColor, generateAvatarString, titles };
}
