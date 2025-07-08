import namer from "color-namer";

export function getColorName(hex) {
  if (!hex) return "";
  try {
    const result = namer(hex);
    return result.basic[0].name || hex;
  } catch {
    return hex;
  }
}
