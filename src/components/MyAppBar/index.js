import React, { useEffect, useState } from "react";
import {
  AppBar,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  TextField,
  Toolbar,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DataService from "../../services/DataService";
import { useDispatch, useSelector } from "react-redux";
import { placeRequest } from "../../providers/actions/Place";
import { MyDrawer, MyMap } from "../../components";

const appBarHeight = 60;
const useStyles = makeStyles((theme) => ({
  appBar: {
    height: appBarHeight,
    justifyContent: "center",
    // backgroundColor: "#212121",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  notchedOutline: { border: "none" },
  menuButton: {
    backgroundColor: "#FFF",
    width: 40,
    height: 40,
    margin: "0 10px 0 0",
    boxShadow: "0px 1px 10px #888888",
    border: "none",
    "&:hover": {
      backgroundColor: "#212121",
      color: "#FFF",
    },
  },
  toolbar: theme.mixins.toolbar,
  autocompleteInput: {
    width: "100%",
    textAlign: "center",
    "&:focus": {
      borderColor: "#000",
    },
  },
  inputWrapper: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    width: "50%",
    padding: "5px 10px",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  input: {
    borderRadius: 20,
    width: "100%",
    backgroundColor: "#FFF",
    padding: "0 10px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    boxShadow: "0px 1px 10px #888888",
  },
  locationButton: {
    backgroundColor: "#FFF",
  },
}));

const MyAppBar = ({ onClickIcon, predictions, onInputChange, onChange }) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          onClick={onClickIcon}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Grid container xs={12}>
          <Autocomplete
            freeSolo
            options={predictions}
            getOptionLabel={(option) => option.description}
            className={classes.autocompleteInput}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search Places"
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.notchedOutline,
                    focused: classes.focused,
                  },
                }}
              />
            )}
            onInputChange={onInputChange}
            onChange={onChange}
          />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
