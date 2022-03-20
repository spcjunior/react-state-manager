import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import { RoutesList } from "../../routes";

const Menu: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {RoutesList.map((i, index) => {
        return index === 5 ? (
          <React.Fragment key={index}>
            <hr style={{ borderTop: "solid 1px #cbcbca", width: "100%" }} />
            <Link to={i.value}>
              <strong>{`${index} - ${i.key}`}</strong>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment key={index}>
            <Link to={i.value}>
              <strong>{`${index} - ${i.key}`}</strong>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    width: "100%",
    height: "100%",
    "& a": {
      textDecoration: "none",
      display: "block",
      padding: "5px 10px",
      border: "solid 1px #cbcbca",
      borderRadius: "3px",
      marginBottom: "5px",
      background: "#ffffcc",
      color: "#7a7a78",
      "&:hover": {
        background: "#dddd69",
      },
    },
  },
});

export default Menu;
