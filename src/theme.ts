import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          "& ::-webkit-scrollbar": { width: "5px", height: "5px" },
          "& ::-webkit-scrollbar-track": {
            boxShadow: `inset 0 0 5px #fff`,
            borderRadius: "10px",
          },
          "& ::-webkit-scrollbar-thumb": {
            backgroundColor: "#C4C8CC",
            borderRadius: "10px",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#3498db",
    },
    secondary: {
      main: "#2ecc71",
    },
    error: {
      main: "#cc0000",
    },
  },
});

export default theme;
