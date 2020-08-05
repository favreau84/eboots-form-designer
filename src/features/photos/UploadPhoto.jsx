import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { BlockBlobClient } from "@azure/storage-blob";
import axios from "axios";

const api = axios.create({
  baseURL: "https://capics-api-uploads.azurewebsites.net/api/",
});

export default function UploadPhoto() {
  const [file, setFile] = useState();

  function handleChange(e) {
    const file = e.currentTarget.files[0];
    console.log("file:", file);
    setFile(file);
  }

  async function handleSubmit() {
    // get blobSasUrl
    const res = await api({
      method: "POST",
      url: "/createUpload",
      data: {
        listUid: "0-draft",
        contentType: file.type,
      },
    });
    const blobSasUrl = res.data.SasToken;
    uploadFile(file, blobSasUrl);
  }

  async function uploadFile(file, blobSasUrl) {
    const blockBlobClient = new BlockBlobClient(blobSasUrl);
    await blockBlobClient.uploadBrowserData(file, {
      blobHTTPHeaders: { blobContentType: "image/png" },
      onProgress: (ev) => console.log(ev),
    });
    console.log("done");
  }

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
