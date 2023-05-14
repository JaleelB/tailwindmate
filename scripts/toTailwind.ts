import { type TailwindColors, twColors, type Color } from "@/types/colors";
import chroma from "chroma-js";


function isColorHexValue(color: string): boolean {
  return /^#([0-9a-f]{3,8})$/i.test(color);
}

function hexToRgb(hex: string): Color {

  if (!chroma.valid(hex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const chromaColor = chroma(hex);
  const [r, g, b] = chromaColor.rgb();
  const a = chromaColor.alpha();
  return { r, g, b, a };
}

function findColorInTailwind(hexColor: string, tailwindColors: TailwindColors): [string, string] | null {
  for (const [colorName, color] of Object.entries(tailwindColors)) {
    if (typeof color === "string") {
      if (color.toLowerCase() === hexColor.toLowerCase()) {
        return [colorName, 'DEFAULT'];
      }
    } else if (typeof color === "object") {
      for (const [shade, shadeColor] of Object.entries(color)) {
        if (typeof shadeColor === "string" && (shadeColor).toLowerCase() === hexColor.toLowerCase()) {
          return [colorName, shade];
        }
      }
    }
  }

  return null;
}

function closestColor(inputColor: Color, colors: TailwindColors): [string, string] {
  let closestColorName = "";
  let closestShade = "";
  let smallestDistance = Infinity;

  for (const [colorName, color] of Object.entries(colors)) {
    if (typeof color === "string") {

      if (!chroma.valid(color)) continue; // skip invalid colors
      
      const distance = colorDistance(inputColor, hexToRgb(color));
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestColorName = colorName;
        closestShade = "DEFAULT";
      }
    } else if (typeof color === "object") {
      for (const [shade, shadeColor] of Object.entries(color)) {
        if (typeof shadeColor === "string" && !chroma.valid(shadeColor)) continue; // skip invalid colors
        const distance = colorDistance(inputColor, typeof shadeColor === "string" ? hexToRgb(shadeColor) : shadeColor);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestColorName = colorName;
          closestShade = shade;
        }
      }
    }
  }

  return [closestColorName, closestShade];
}

function colorDistance(color1: Color, color2: Color): number {
  //Euclidean distance
  const dr = color1.r - color2.r;
  const dg = color1.g - color2.g;
  const db = color1.b - color2.b;
  const da = (color1.a || 0) - (color2.a || 0);

  return Math.sqrt(dr * dr + dg * dg + db * db + da * da);
}

export default function colorToTailwindClass(colorInput: string): string {

  const isTailwindColorName = Object.keys(twColors).includes(colorInput.toLowerCase());

  if (isTailwindColorName) {
    if(
      colorInput.toLowerCase() === "white" || 
      colorInput.toLowerCase() === "black"
    ){
      return colorInput.toLowerCase();
    }
  }

  const isValidColor = chroma.valid(colorInput);
  if(!isValidColor) throw new Error(`Invalid color input: "${colorInput}"`);

  const hexColor = !isColorHexValue(colorInput) ? chroma(colorInput).hex() : colorInput;
  const rgbColor = hexToRgb(hexColor);

  const result = findColorInTailwind(hexColor, twColors);
  if(result !== null){
    const [colorName, shade] = result;
    if (shade === "DEFAULT") {
      return colorName;
    }
    return `${colorName}-${shade}`;
  }
  else{
    const [colorName, shade] = closestColor(rgbColor, twColors);
  
    if (shade === "DEFAULT") {
      return colorName;
    }

    return `${colorName}-${shade}`;
  }
  
}



