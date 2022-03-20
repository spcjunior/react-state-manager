import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export interface IStyles {
  botMessage?: boolean;
  userActive?: boolean;
}
export const useStyles = makeStyles<Theme, IStyles>({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    "& div": {
      border: "solid 1px #cbcbca",
      borderRadius: 3,
    },
  },
  usersContainer: {
    display: "flex",
    flexDirection: "column",
    marginRight: "10px",
    maxWidth: "300px",
    flexGrow: 1,
    flexShrink: 0,
    width: "300px",
    "& section:first-child": {
      overflowX: "auto",
      flexGrow: 1,
      "& div": {
        display: "block",
        padding: "10px",
        margin: "5px",
        cursor: "pointer",
        "& p": {
          margin: "0px",
          padding: "0px",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        },
        "&:hover": {
          background: "#efefee",
        },
      },
    },
    "& section:last-child": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
      background: "#f2f2f2",
      "& button": {
        padding: "10px",
        minWidth: "100px",
        border: "solid 1px #cccccc",
        background: "#efefee",
        borderRadius: "20px",
        "&:hover": {
          background: "#ffffff",
        },
        "&:active": {
          fontWeight: "600",
        },
      },
    },
  },
  charContainer: {
    flexGrow: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  chatHistory: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 3,
    marginBottom: 10,
    height: "calc(100% - 200px)",
    "& p": {
      margin: 0,
      padding: 0,
    },
    "& section": {
      padding: "10px",
      margin: "5px",
    },
    "& section:first-child": {
      minHeight: "100px",
      "& label": {
        fontSize: "20pt",
        padding: "20px 0px",
        fontWeight: 600,
        color: "#9a9a9a",
      },
    },
    "& section:last-child": {
      overflowY: "auto",
      flexGrow: 1,
      border: "solid 1px #cbcbca",
      borderRadius: 3,
    },
  },
  chatMessage: {
    height: "100%",
    display: "flex",
    overflowY: "auto",
    paddingRight: "10px",
    flexDirection: "column-reverse",
    justifyContent: "flex-start",
  },
  rowMessage: {
    margin: "0px",
    padding: "0px",
    border: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: (props) => (props.botMessage ? "flex-start" : "flex-end"),
  },
  cardMessage: {
    marginBottom: "10px",
    padding: "5px 10px",
    minWidth: "200px",
    maxWidth: "80%",
    background: (props) => (props.botMessage ? "#f0faf0" : "#f9f9ee"),
  },
  chatTextMessage: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: "150px",
    "& textarea": {
      height: "100%",
      margin: "5px",
      border: "solid 1px #cbcbca",
      fontSize: "12pt",
    },
  },
  buttonArea: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    "& button": {
      padding: "5px 20px",
      marginLeft: "5px",
    },
  },
  cardUser: {
    background: (props) => {
      return props.userActive ? "#efefee" : "#ffffff";
    },
  },
  lifecycle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    "& label": {
      margin: "10px",
    },
    "& button": {
      padding: "10px",
    },
  },
});
