import React from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import ImagePreview from "components/ImagePreview";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  imageContainer: {
    width: 210,
    height: 297,
    marginTop: theme.spacing(1),
  },
}));

export default function Form({ id, name, imageUrl }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>{name}</Typography>
      <Paper elevation={12} className={classes.imageContainer}>
        <ImagePreview src={imageUrl} width="100%" height="100%" />
      </Paper>
    </div>
  );
}
