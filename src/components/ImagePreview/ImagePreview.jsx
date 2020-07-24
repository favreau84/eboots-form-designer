import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "100%",
    //overflow: "auto",
  },
}));
export default function ImagePreview({ src, height, width }) {
  const classes = useStyles();

  return (
    <div
      className={classes.imageContainer}
      style={{
        backgroundImage: `url(${src})`,
        height,
        width,
      }}
    />
  );
}
