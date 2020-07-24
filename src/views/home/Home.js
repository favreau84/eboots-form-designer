import React from "react";

import FormsGridContainer from "features/forms/FormsGridContainer";
import FormUploader from "features/forms/FormUploader";

export default function Home() {
  return (
    <div>
      <FormUploader />
      <FormsGridContainer />
    </div>
  );
}
