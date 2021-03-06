import {
  AppBar,
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../../store/user/userActions";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  displayName: {
    margin: "5px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    "&.active": {
      color: "lightgreen",
    },
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  const user = useSelector((state) => state.user.user);
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
  };
  const changePath = (path) => {
    dispatch(push(path));
  };
  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={state.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar component={Box} position="static" pb={2}>
        <Toolbar>
          <Container>
            <Grid container direction="column">
              <Grid
                item
                container
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
              >
                <NavLink
                  to="/cafe-list"
                  exact
                  className={classes.navLink}
                >
                  <Typography variant="h4">
                    Cafe critic
                  </Typography>
                </NavLink>
                {user?.token && (
                  <div>
                    <Grid
                      container
                      alignItems="center"
                      direction="row"
                    >
                      <Avatar
                        alt="person image"
                        src={user?.avatarImage}
                      />
                      <Typography
                        className={classes.displayName}
                        variant="h6"
                      >
                        {user?.displayName}
                      </Typography>
                      <Box ml={3}>
                        <NavLink
                          to="/add-cafe"
                          exact
                          className={classes.navLink}
                        >
                          <Typography variant="h6">
                            Register new cafe
                          </Typography>
                        </NavLink>
                      </Box>
                    </Grid>
                  </div>
                )}
                {user?.token ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={logOutHandler}
                  >
                    Log out
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => changePath("/")}
                  >
                    Get in
                  </Button>
                )}
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>

      <Box component="main" paddingTop="5px">
        <Container>{children}</Container>
      </Box>
    </div>
  );
};

export default Layout;
