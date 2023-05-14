import { twColors } from "@/types/colors";
import chroma from "chroma-js";


type ColorCodes = {
    rgb: string;
    rgba: string;
    hsl: string;
    hsla: string;
    hex: string;
}

export function findColorInTailwind(tailwindClass: string): string {

    if(tailwindClass.toLowerCase() === "white" || tailwindClass.toLowerCase() ===  "#fff" || tailwindClass.toLowerCase() === "#ffffff") return "#ffffff";
    if(tailwindClass.toLowerCase() === "black" || tailwindClass.toLowerCase() ===  "#000" || tailwindClass.toLowerCase() === "#000000") return "#000000";

    const tailwindClassArr = removePrefixesAndAddToArr(tailwindClass);
    const colorName = tailwindClassArr[0];
    const shade = tailwindClassArr[1] || '500';
    const color = twColors[colorName as string];
    if (color && shade in color) {
        return (color as { [shade: string]: string })[shade] || "";
    } else {
        return "";
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
    const rgbaString = `rgba(${rgba[0] ?? 0}, ${rgba[1] ?? 0}, ${rgba[2] ?? 0}, ${rgba[3] ?? 0})`;
    const hslString = `hsl(${Math.round(hsl[0] ?? 0)}, ${Math.round((hsl[1] ?? 0) * 100)}%, ${Math.round((hsl[2] ?? 0) * 100)}%)`;
    const hslaString = `hsla(${Math.round(hsl[0] ?? 0)}, ${Math.round((hsl[1] ?? 0) * 100)}%, ${Math.round((hsl[2] ?? 0) * 100)}%, ${Math.round((rgba[3] ?? 0) * 100) / 100})`;

    return {
        rgb: rgbString,
        rgba: rgbaString,
        hsl: hslString,
        hsla: hslaString,
        hex: hexColor
    };
}