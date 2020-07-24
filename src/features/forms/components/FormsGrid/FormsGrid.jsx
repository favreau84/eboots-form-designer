import React from "react";
import { makeStyles } from "@material-ui/core";
import Form from "./Form";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formContainer: {
    padding: theme.spacing(1),
  },
}));

export default function FormsGrid({ forms }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {forms.map((form) => (
        <div key={form.id} className={classes.formContainer}>
          <Form {...form} />
        </div>
      ))}
    </div>
  );
}
