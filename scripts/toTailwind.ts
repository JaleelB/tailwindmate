import chroma from "chroma-js";
import * as tailwindColors from "tailwindcss/colors";

type ColorFormat = "color text" | "hsla" | "hsl" | "rgb" | "rgba" | "hex";

interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

type TailwindColor = string | {
  [shade: number]: Color;
};

type TailwindColors = {
  [key: string]: TailwindColor;
};

const twColors = tailwindColors as unknown as TailwindColors;

function parseColor(colorInput: string): Color {

  const colorRegex: Record<ColorFormat, RegExp> = {
    "color text": /^(\w+)$/i,
    "hsla": /^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d*(?:\.\d+)?)\s*\)$/i,
    "hsl": /^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/i,
    "rgb": /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i,
    "rgba": /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*(?:\.\d+)?)\s*\)$/i,
    "hex": /^#([0-9a-f]{3,8})$/i,
  };

  const format = Object.entries(colorRegex)
    .find(([_, regex]) => colorInput.match(regex))?.[0] as ColorFormat | undefined;

  if (!format) {
    throw new Error(`Invalid color input: "${colorInput}"`);
  }

  const regex = colorRegex[format];
  const match = colorInput.match(regex);

  if (!match) {
    throw new Error(`Invalid color input for format "${format}": "${colorInput}"`);
  }

  switch (format) {
    case "color text": {
      const colorName = match[1]?.toLowerCase();
      if (!colorName) {
        throw new Error(`Invalid color text input: "${colorInput}"`);
      }

      const color = twColors[colorName];
      if (!color) {
        throw new Error(`Unknown color name: "${colorName}"`);
      }

      if (typeof color === 'string') {
        const colorObj = hexToRgb(color);
        return colorObj;
      } else if (typeof color === 'object') {
        if (color[500] === undefined) {
          throw new Error(`Color shade 500 is undefined for "${colorName}"`);
        }
        return color[500];
      } else {
        throw new Error(`Unexpected color type: "${typeof color}"`);
      }
    }
    case "hsla":
    case "hsl": {
      const [h, s, l, a] = match.slice(1).map((x) => parseFloat(x));
      return hslToRgb(h as number, s as number, l as number, a);
    }
    case "rgb":
    case "rgba": {
      const r = parseFloat(match[1] || "0");
      const g = parseFloat(match[2] || "0");
      const b = parseFloat(match[3] || "0");
      const a = parseFloat(match[4] || "1");
      
      if (isNaN(r) || isNaN(g) || isNaN(b)) {
        throw new Error(`Invalid RGB(A) values: "${colorInput}"`);
      }
      
      return { r, g, b, a };
    }

    case "hex": {
      const hex = match[1] as string;
      return hexToRgb(hex);
    }
  }
}

function hslToRgb(h: number, s: number, l: number, a?: number): Color {
  const normalize = (x: number) => (x < 0 ? x + 1 : x > 1 ? x - 1 : x);
  const hueToRgb = (p: number, q: number, t: number) => {
    const nt = normalize(t);
    if (nt < 1 / 6) return p + (q - p) * 6 * nt;
    if (nt < 1 / 2) return q;
    if (nt < 2 / 3) return p + (q - p) * (2 / 3 - nt) * 6;
    return p;
  };

  s /= 100;
  l /= 100;
  h /= 360;

  if (s === 0) {
    const x = Math.round(l * 255);
    return { r: x, g: x, b: x, a };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = hueToRgb(p, q, h + 1 / 3);
  const g = hueToRgb(p, q, h);
  const b = hueToRgb(p, q, h - 1 / 3);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a,
  };
}

function hexToRgb(hex: string): Color {
  const hexMatchResult = hex.padStart(8, "f").match(/../g);

  if (!hexMatchResult) {
    throw new Error(`Invalid hex input: "${hex}"`);
  }

  const rgba = hexMatchResult.map((x) => parseInt(x, 16));

  if (rgba.some((x) => isNaN(x))) {
    throw new Error(`Invalid hex input: "${hex}"`);
  }

  return {
    r: rgba[0] ?? 0,
    g: rgba[1] ?? 0,
    b: rgba[2] ?? 0,
    a: (rgba[3] ?? 255) / 255,
  };
}


function findClosestTailwindColor(color: Color): string {
  const colorNames = Object.keys(twColors);

  let minDistance = Infinity;
  let closestColorName: string | null = null;
  let closestShade: number | null = null;

  for (const colorName of colorNames) {
    const shades = twColors[colorName];
    if (typeof shades !== "object") continue;

    for (const [shade, shadeColor] of Object.entries(shades)) {
      const distance = colorDistance(color, shadeColor);
      if (distance < minDistance) {
        minDistance = distance;
        closestColorName = colorName;
        closestShade = parseInt(shade, 10);
      }
    }
  }

  if (!closestColorName || closestShade === null) {
    throw new Error("Failed to find a matching Tailwind color");
  }

  return `${closestColorName}-${closestShade}`;
}

function colorDistance(color1: Color, color2: Color): number {
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
      Math.pow(color1.g - color2.g, 2) +
      Math.pow(color1.b - color2.b, 2)
  );
}

export default function colorToTailwindClass(colorInput: string): string {
  // Check if the input color is a Tailwind color name
  const isTailwindColorName = Object.keys(twColors).includes(colorInput.toLowerCase());

  // Return the Tailwind color name with a default shade if it's a match
  if (isTailwindColorName) {
    if(colorInput.toLowerCase() === "white" || colorInput.toLowerCase() === "black"){
      return colorInput.toLowerCase();
    }
    return `${colorInput.toLowerCase()}-500`;
  }

  // Convert non-Tailwind color names to hex values using chroma-js
  const inputColor: string = chroma.valid(colorInput) ? chroma(colorInput).hex() : colorInput;

  const parsedColor = parseColor(inputColor);
  console.log("parsedColor", parsedColor)
  console.log("inputColor", inputColor)
  const tailwindClass = findClosestTailwindColor(parsedColor);

  return tailwindClass;
}


// // // Usage example:
// // console.log(colorToTailwindClass("#ff5733", "hex")); // Output: "orange-500"
export const printColors = () => console.log(tailwindColors)

