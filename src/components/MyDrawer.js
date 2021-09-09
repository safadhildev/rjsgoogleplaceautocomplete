import React, { useEffect, useState } from "react";
import {
  Button,
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

const drawerWidth = 380;
const mobileWidth = 280;
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#F5F5F5",
    [theme.breakpoints.down("xs")]: {
      width: mobileWidth,
      flexShrink: 0,
    },
  },
  input: {
    backgroundColor: "#FFF",
    border: "none",
    borderRadius: 5,
    width: "100%",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  drawerSubtitle: {
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 14,
    color: "#01579B",
    flex: 1,
    cursor: "pointer",
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
  emptyText: {
    color: "#9E9E9E",
    fontSize: 14,
  },
  locationButton: {
    background: "#212121",
    color: "#FFF",
    textTransform: "capitalize",
    "&:hover": {
      background: "#212121",
      color: "#FFF",
    },
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
      <ListItem>
        <Typography variant="p" className={classes.drawerSubtitle}>
          Places Autocomplete
        </Typography>
      </ListItem>

      <Divider />
      <div style={{ minHeight: 300 }}>
        <ListItem
          style={{ alignItems: "flex-start", justifyContent: "space-between" }}
        >
          <Typography variant="p" className={classes.drawerSubtitle}>
            Recent
          </Typography>
          {data?.length > 0 && (
            <Button
              variant="outlined"
              size="small"
              className={classes.clearButton}
              onClick={onClearHistory}
            >
              Clear All
            </Button>
          )}
        </ListItem>
        <List>
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <ListItem className={classes.item}>
                <Grid
                  container
                  xs={12}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    noWrap
                    className={classes.itemText}
                    onClick={() => {
                      onSelectItem(index);
                    }}
                  >
                    {item?.description}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      onRemoveItem(index);
                    }}
                  >
                    <Close />
                  </IconButton>
                </Grid>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <Typography variant="p" className={classes.emptyText}>
                No Item
              </Typography>
            </ListItem>
          )}
        </List>
      </div>
      <Divider />
    </Drawer>
  );
};

export default MyDrawer;
