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
import { placeRequest } from "../../providers/actions/Predictions";
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
    textAlign: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: "5px 20px",
    boxShadow: "0px 1px 10px #888888",
    [theme.breakpoints.down("xs")]: {
      margin: "0 0 0 30px",
    },
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
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid container direction="row" justifyContent="flex-start">
          <Grid item xs={1}>
            <IconButton
              edge="start"
              onClick={onClickIcon}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs={11} md={6}>
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
