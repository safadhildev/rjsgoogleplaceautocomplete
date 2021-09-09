import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Close, Menu as MenuIcon } from "@material-ui/icons";
import { stopBubbling } from "../../services/util";

const drawerWidth = 380;
const mobileWidth = 280;
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#FFF",
    // backgroundColor: "transparent",
    boxShadow: "none",
    margin: "5px",
    height: window.innerHeight - 10,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    [theme.breakpoints.down("xs")]: {
      width: mobileWidth,
      flexShrink: 0,
    },
  },
  drawerSubtitle: {
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#F5F5F5",
    padding: "0px 10px",
    margin: "10px 0",
    borderRadius: 5,
  },

  itemText: {
    fontSize: 14,
    color: "#78909C",
    cursor: "pointer",
    textOverflow: "ellipsis",
  },
  clearButton: {
    color: "#F44336",
    fontSize: 12,
    textTransform: "capitalize",
    borderColor: "#F44336",
    "&:hover": {
      backgroundColor: "#F44336",
      color: "#FFF",
    },
  },
  emptyWrapper: {
    display: "flex",
    backgroundColor: "#ECEFF1",
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  emptyText: {
    color: "#9E9E9E",
    fontSize: 14,
  },
  locationButton: {
    background: "#212121",
    color: "#FFF",
    borderRadius: 10,
    textTransform: "capitalize",
    "&:hover": {
      background: "#212121",
      color: "#FFF",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    color: "#B0BEC5",
  },
}));

const MyDrawer = ({
  open,
  onClose,
  data,
  onClearHistory,
  onRemoveItem,
  onSelectItem,
  onGetCurrentLocation,
}) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{ margin: "20px 0", display: "flex", flexDirection: "column" }}
        >
          <Typography variant="p" className={classes.title}>
            Places Autocomplete
          </Typography>
          <Typography variant="p" className={classes.description}>
            Created by Syed Ahmad Fadhil Bin Syed Hassan
          </Typography>
        </div>
        <Divider />
        <div style={{ margin: "20px 0" }}>
          <Button
            variant="contained"
            fullWidth
            className={classes.locationButton}
            onClick={onGetCurrentLocation}
          >
            Get My Current Location
          </Button>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <Typography variant="p" className={classes.drawerSubtitle}>
            Recent
          </Typography>
          <Button
            variant="outlined"
            size="small"
            className={classes.clearButton}
            onClick={onClearHistory}
            disabled={data?.length === 0}
          >
            Clear All
          </Button>
        </div>

        <List
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "scroll",
          }}
        >
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <ListItem className={classes.item}>
                <div
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography
                    noWrap
                    className={classes.itemText}
                    onClick={() => {
                      onSelectItem(item);
                    }}
                  >
                    {item?.description}
                  </Typography>
                </div>
                <IconButton
                  onClick={() => {
                    onRemoveItem(index);
                  }}
                >
                  <Close />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <div className={classes.emptyWrapper}>
              <Typography variant="p" className={classes.emptyText}>
                No Item
              </Typography>
            </div>
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default MyDrawer;
