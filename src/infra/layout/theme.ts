import { ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Alegreya Sans",
    fontWeightLight: 500,
    fontWeightRegular: 600,
    fontWeightMedium: 700
  },
  palette: {
    mode: "light",
    primary: {
      main: "#FFBD58"
    }
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#ffc873",
            color: "black",
            borderRadius: "25px"
          }
        }
      }
    }
  }
};
