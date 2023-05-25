import { twColors } from "@/types/colors";
import chroma from "chroma-js";


export type ColorCodes = {
    rgb: string;
    rgba: string;
    hsl: string;
    hsla: string;
    hex: string;
}

export function findTailwindClassHexEquivalent(tailwindClass: string, lastValidColor: string): string {

    if(tailwindClass.toLowerCase() === "white") return "#ffffff";
    if(tailwindClass.toLowerCase() === "black") return "#000000";

    const tailwindClassArr = removePrefixesAndAddToArr(tailwindClass);
    const colorName = tailwindClassArr[0];
    const shade = tailwindClassArr[1] || '500';
    const color = twColors[colorName as string];
    if (color && shade in color) {
        return (color as { [shade: string]: string })[shade] || "";
    } else {
        return lastValidColor;
    }
}

export function removePrefixesAndAddToArr(tailwindClass: string): string[] {
    const tailwindClassArr = tailwindClass.split('-');
    const tailwindClassArrWithoutPrefixes = tailwindClassArr.filter((item) => item !== 'text' && item !== 'bg');
    return tailwindClassArrWithoutPrefixes;
}

export function getColorCodes(hexColor: string): ColorCodes {
    const color = chroma(hexColor);

    const rgb: number[] = color.rgb();
    const rgba: number[] = color.rgba();
    const hsl: number[] = color.hsl();

    const rgbString = `rgb(${rgb[0] ?? 0}, ${rgb[1] ?? 0}, ${rgb[2] ?? 0})`;
    const rgbaString = `rgba(${rgba[0] ?? 0}, ${rgba[1] ?? 0}, ${rgba[2] ?? 0}, ${rgba[3] ?? 1})`;
    const hslString = `hsl(${hsl[0] !== undefined && !isNaN(hsl[0]) ? Math.round(hsl[0]) : 0}, ${hsl[1] !== undefined && !isNaN(hsl[1]) ? Math.round(hsl[1] * 100) : 0}%, ${hsl[2] !== undefined && !isNaN(hsl[2]) ? Math.round(hsl[2] * 100) : 0}%)`;
    const hslaString = `hsla(${hsl[0] !== undefined && !isNaN(hsl[0]) ? Math.round(hsl[0]) : 0}, ${hsl[1] !== undefined && !isNaN(hsl[1]) ? Math.round(hsl[1] * 100) : 0}%, ${hsl[2] !== undefined && !isNaN(hsl[2]) ? Math.round(hsl[2] * 100) : 0}%, ${rgba[3] ?? 1})`;

    return {
        rgb: rgbString,
        rgba: rgbaString,
        hsl: hslString,
        hsla: hslaString,
        hex: hexColor
    };
}
