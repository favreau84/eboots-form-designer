import { fileToImagesBlobs } from "./utils/pdfUtils.js";

export function createPdf(pdfFile) {
  return {
    file: pdfFile,
    blobs: fileToImagesBlobs(pdfFile),
  };
}
