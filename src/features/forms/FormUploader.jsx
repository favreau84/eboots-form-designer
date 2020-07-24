import React from "react";
import PdfUploader from "components/PdfUploader";
import { addForm } from "./formsSlice";
import { useDispatch } from "react-redux";

export default function FormUploader() {
  const dispatch = useDispatch();

  function handleFormSubmit({ imageUrl }) {
    console.log("imageUrl", imageUrl);
    dispatch(addForm({ id: 10, name: "formulaire", imageUrl }));
  }
  return <PdfUploader onSubmit={handleFormSubmit} />;
}
