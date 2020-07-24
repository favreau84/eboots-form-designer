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
export default function BlobPreview({ blob, height, width }) {
  const [src, setSrc] = useState();
  const classes = useStyles();

  async function load() {
    const reader = new FileReader();
    if (blob) {
      reader.readAsDataURL(blob);
    }
    reader.addEventListener("load", (e) => {
      setSrc(reader.result);
    });
  }

  useEffect(() => {
    load();
  }, [blob]);

  return (
    <div
      className={classes.imageContainer}
      style={{
        backgroundImage: `url(${src})`,
        height,
        width,
        border: "solid 1px black",
      }}
    />
  );
}
