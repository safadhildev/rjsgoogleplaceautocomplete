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
import { Menu as MenuIcon, MyLocation } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DataService from "../../services/DataService";
import { useDispatch, useSelector } from "react-redux";
import { placeRequest } from "../../providers/actions/Predictions";
import { MyDrawer, MyMap } from "../../components";

const appBarHeight = 60;
const useStyles = makeStyles((theme) => ({
  appBarContainer: {
    height: appBarHeight,
    backgroundColor: "transparent",
    boxShadow: "none",
    [theme.breakpoints.up("sm")]: {
      padding: 10,
    },
  },
  appBarWrapper: {
    justifyContent: "center",
    backgroundColor: "#212121",
    [theme.breakpoints.up("sm")]: {
      borderRadius: 10,
    },
  },
  menuButton: {
    // backgroundColor: "#FFF",
    width: 40,
    height: 40,
    // boxShadow: "0px 1px 10px #888888",
    border: "none",
    color: "#FFF",
  },
  toolbar: theme.mixins.toolbar,
  autocompleteInput: {
    textAlign: "center",
    backgroundColor: "#ECEFF1",
    borderRadius: 10,
    padding: "5px 20px",
    // boxShadow: "0px 1px 10px #888888",
  },
  locationButton: {
    backgroundColor: "#FFF",
  },
}));

const MyAppBar = ({
  onClickIcon,
  predictions,
  onInputChange,
  onChange,
  value,
  loading,
}) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBarContainer}>
      <Toolbar className={classes.appBarWrapper}>
        <Grid container direction="row" justifyContent="flex-start" spacing={8}>
          <Grid item xs={1}>
            <IconButton
              edge="end"
              onClick={onClickIcon}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs={10} md={6} justifyContent="flex-start">
            <Autocomplete
              freeSolo
              // autoComplete
              autoSelect={predictions.length > 0}
              loading={loading || predictions.length === 0}
              inputValue={value}
              options={predictions}
              getOptionLabel={(option) => option.description || ""}
              className={classes.autocompleteInput}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Search Places"
                    size="small"
                    className={classes.input}
                    value={value}
                  />
                );
              }}
              onInputChange={onInputChange}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
