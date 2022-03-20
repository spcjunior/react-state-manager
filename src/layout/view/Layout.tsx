import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";

import { makeStyles } from "@mui/styles";

function Layout() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.menu}>
        <Menu />
      </div>
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "row",
  },
  menu: {
    background: "#f2f2f2",
    display: "flex",
    flexDirection: "row",
    minWidth: "250px",
    border: "solid 1px #cbcbca",
    borderRadius: "5px",
    margin: "10px",
  },
  content: {
    margin: "10px",
    border: "solid 1px #cbcbca",
    borderRadius: "5px",
    width: "100%",
    padding: "10px",
  },
});

export default Layout;
