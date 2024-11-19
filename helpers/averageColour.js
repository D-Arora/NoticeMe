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
      { format: SaveFormat.PNG, base64: true }
    );

    const binaryString = atob(manipResult.base64);
    console.log(binaryString);

    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    let dataStart = 0;
    for (let i = 0; i < bytes.length - 4; i++) {
      if (
        bytes[i] === 0x49 &&
        bytes[i + 1] === 0x44 &&
        bytes[i + 2] === 0x41 &&
        bytes[i + 3] === 0x54
      ) {
        dataStart = i + 8;
        break;
      }
    }

    const colorCounts = {};
    for (let i = dataStart; i < bytes.length; i += 4) {
      const r = bytes[i];
      const g = bytes[i + 1];
      const b = bytes[i + 2];
      const a = bytes[i + 3];

      if (a > 0) {
        const key = `${r},${g},${b}`;
        // console.log("r", r);
        colorCounts[key] = (colorCounts[key] || 0) + 1;
      }
    }

    let dominantColor = null;
    let maxCount = 0;

    for (const [color, count] of Object.entries(colorCounts)) {
      if (count > maxCount) {
        maxCount = count;
        dominantColor = color;
      }
    }

    console.log(dominantColor);

    if (dominantColor) {
      const [r, g, b] = dominantColor.split(",").map(Number);
      const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)}`;
      console.log("Extracted color:", hexColor);
      return hexColor;
    }

    throw new Error("No dominant color found.");
  } catch (error) {
    console.error("Error in getImageDominantColor:", error);
    return "#6200ee";
  }
};
