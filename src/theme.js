import { createMuiTheme } from "@material-ui/core/styles";

const arcBlue = '#19769F';
const arcOrange = "#FFBA60";
const grayColor = [
  "#999",
  "#777",
  "#3C4858",
  "#AAAAAA",
  "#D2D2D2",
  "#DDD",
  "#b4b4b4",
  "#555555",
  "#333",
  "#a9afbb",
  "#eee",
  "#e7e7e7"
];

const theme = createMuiTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      orange: `${arcOrange}`,
    },
    primary: {
      main: `${arcBlue}`,
      contrastText: "#fff",
    },
    secondary: {
      main: `${arcOrange}`,
      contrastText: "#fff",
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      color: "white",
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      textTransform: "none",
      color: "white",
      fontSize: "1rem",
    },
    h2: {
      fontFamily: "Roboto",
      fontWeight: 700,
      color: `${arcBlue}`,
      fontSize: "2.5rem",
    },
    h3: {
      color: grayColor[1],
      fontSize: "1.5rem",
      minHeight: "auto",
      fontWeight: "800",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      textDecoration: "none",
      marginBottom: '5px',
      marginLeft: '120px'
    },
    h4: {
      color: grayColor[1],
      fontSize: "1.3rem",
      minHeight: "auto",
      fontWeight: "800",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      textDecoration: "none",
      marginBottom: '5px',
      marginLeft: '0px'
    },
    h5: {
      color: grayColor[2],
      fontWeight: "800",
      fontSize: "14px",
      margin: 'auto'
     },
    body1: {
      fontSize: '1rem',
      textDecoration: 'none'
    }
  },
});

export default theme;
