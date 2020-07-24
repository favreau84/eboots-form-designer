import React from "react";
import FormsGrid from "./components/FormsGrid";

import { useSelector } from "react-redux";
import { selectForms } from "./formsSlice";

export default function FormsGridContainer() {
  const forms = useSelector(selectForms);
  return <FormsGrid forms={forms} />;
}
