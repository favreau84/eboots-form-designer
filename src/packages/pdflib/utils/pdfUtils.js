export const fileToImagesBlobs = async (file) => {
  const pdfjs = await import("pdfjs-dist/build/pdf");
  const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");

  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const bytes = await readFileToArrayBuffer(file);
  const pdf = await pdfjs.getDocument(bytes).promise;
  const page1 = await pdf.getPage(1);
  const blob1 = await pageToBlob(page1);
  page1.cleanup();
  pdf.cleanup();
  pdf.destroy();

  return [blob1];
};

// file input => array buffer

const readFileToArrayBuffer = async (fileData) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileData);
    reader.onload = () => {
      const result = reader.result;
      const bytes = new Uint8Array(result);
      resolve(bytes);
    };
  });
};

// pdf page => canvas

const pageToCanvas = async (page, desiredResolution) => {
  const viewport = page.getViewport({ scale: 1 });

  const scale = desiredResolution
    ? Math.min(
        desiredResolution / viewport.width,
        desiredResolution / viewport.height
      )
    : 1;

  // Prepare canvas using PDF page dimensions
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.height = viewport.height * scale;
  canvas.width = viewport.width * scale;

  // Render PDF page into canvas context
  const scaledViewport = page.getViewport({ scale });
  const renderContext = {
    canvasContext: context,
    viewport: scaledViewport,
  };
  await page.render(renderContext).promise;
  return canvas;
};

// pdf page => blob
const pageToBlob = async (page, desiredResolution) => {
  const canvas = await pageToCanvas(page, desiredResolution);
  return await new Promise((resolve) => canvas.toBlob(resolve));
};
