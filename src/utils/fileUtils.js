export const readFileToArrayBuffer = async (fileData) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileData);
    reader.onload = () => {
      const result = reader.result;
      // Convert to array buffer
      const bytes = new Uint8Array(result);
      resolve(bytes);
    };
  });
};
