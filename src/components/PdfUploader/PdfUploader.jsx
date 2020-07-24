import React, { useState, useRef } from "react";
import clsx from "clsx";
import { makeStyles, Button, Typography } from "@material-ui/core";
import { createPdf } from "packages/pdflib";
import BlobPreview from "components/blob-preview";

const useStyles = makeStyles((theme) => ({
  root: {},
  draggableContainer: {
    width: "100px",
    height: "200px",
    backgroundColor: "rgba(147, 148, 148, 0.23)",
    padding: "6px",
    borderRadius: "4px",
    border: "2px dashed rgba(95, 92, 92, 0.2)",
    fontSize: "14px",
    display: "flex",
    marginBottom: "7px",
    position: "relative",
    overflow: "hidden",
  },
  primaryBorder: {
    borderColor: theme.palette.primary.main,
  },
  fileInput: {
    opacity: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  browseButtonContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: "8px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  helperTextContainer: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  blobPreviewContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
  },
}));

export default function PdfUploader({ onSubmit }) {
  const classes = useStyles();
  const fileInputRef = useRef();

  const [onDragOver, setOnDragOver] = useState(false);
  const [blob, setBlob] = useState();
  const [localUrl, setLocalUrl] = useState();
  const [imageUrl, setImageUrl] = useState();

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setOnDragOver(true);
  }
  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setOnDragOver(false);
  }
  async function handleDrop(e) {
    e.preventDefault();
    setOnDragOver(false);
    const file = e.dataTransfer.items[0].getAsFile();
    setLocalUrl(window.URL.createObjectURL(file));
    const blobs = await createPdf(file).blobs;
    setBlob(blobs[0]);
    setImageUrl(window.URL.createObjectURL(blobs[0]));
  }
  function handleChange(e) {
    const file = e.currentTarget.files[0];
  }

  function handleSubmit() {
    if (onSubmit) {
      console.log("submit");
      onSubmit({ imageUrl });
    }
  }

  return (
    <div>
      <div
        className={clsx(
          classes.draggableContainer,
          onDragOver && classes.primaryBorder
        )}
      >
        <div className={classes.blobPreviewContainer}>
          <BlobPreview height="100%" width="100%" blob={blob} />
        </div>
        <input
          className={classes.fileInput}
          type="file"
          ref={fileInputRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onChange={handleChange}
        />
        <div className={classes.helperTextContainer}>
          <Typography>Drag and drop a pdf file</Typography>
        </div>
        <div className={classes.browseButtonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => fileInputRef.current.click()}
          >
            Browse
          </Button>
        </div>
      </div>
      <div className={classes.submitButtonContainer}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
