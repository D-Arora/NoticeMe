import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Asset } from "expo-asset";

export const getImageDominantColor = async (imageUri) => {
  try {
    const asset = Asset.fromModule(imageUri);
    await asset.downloadAsync();
    const resolvedUri = asset.localUri || asset.uri;

    const manipResult = await manipulateAsync(
      resolvedUri,
      [{ resize: { width: 10, height: 10 } }],
      { format: SaveFormat.JPEG, base64: true }
    );

    const binaryString = atob(manipResult.base64);

    const colorHistogram = extractColorHistogram(binaryString);

    const dominantColor = findDominantColor(colorHistogram);

    console.log("Extracted color:", dominantColor);
    return dominantColor || "#6200ee";
  } catch (error) {
    console.error("Error in getImageDominantColor:", error);
    return "#6200ee";
  }
};

function extractColorHistogram(binaryString) {
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  const colorCounts = {};
  let dataStart = 0;

  dataStart = byteArray.indexOf(0xff, 2);

  for (let i = dataStart; i < byteArray.length; i += 3) {
    const r = byteArray[i];
    const g = byteArray[i + 1];
    const b = byteArray[i + 2];

    const colorKey = `${r},${g},${b}`;
    colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
  }

  return colorCounts;
}

function findDominantColor(colorHistogram) {
  let dominantColor = null;
  let maxCount = 0;

  for (const [color, count] of Object.entries(colorHistogram)) {
    if (count > maxCount) {
      maxCount = count;
      dominantColor = color;
    }
  }

  if (dominantColor) {
    const [r, g, b] = dominantColor.split(",").map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  return null;
}
