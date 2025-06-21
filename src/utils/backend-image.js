export const getBackendImageUrl = (filepath) => {
  if (!filepath) return "";

  const cleanPath = filepath.replace(/\\/g, "/");

  return `http://localhost:5050/${cleanPath}`;
};
