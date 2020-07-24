import { createMuiTheme } from "@material-ui/core/styles";
import { lightBlue, deepOrange, blueGrey } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[400],
    },
    secondary: {
      main: deepOrange[500],
    },
    common: {
      grey: { main: blueGrey[50] },
    },
    background: {
      main: blueGrey[50],
    },
  },
  spot: {
    height: "40px",
    width: "40px",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  props: {
    MuiButton: {
      disableRipple: false,
      color: "primary",
      variant: "contained",
    },
    MuiTextField: {
      variant: "outlined",
      margin: "normal",
      fullWidth: true,
      size: "small",
    },
    MuiPaper: {
      square: true,
    },
    Typography: {
      variant: "body1",
    },
  },
});

export default theme;
