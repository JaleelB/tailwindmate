import { twColors } from "@/types/colors";
import chroma from "chroma-js";
import { on } from "events";


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
    if(tailwindClass.toLowerCase() === "transparent") return lastValidColor;
    if(tailwindClass.toLowerCase() === "current") return lastValidColor;
    if(tailwindClass.toLowerCase() === "inherit") return lastValidColor;

    let tailwindClassArr = removePrefixesAndAddToArr(tailwindClass);
    const colorName = tailwindClassArr[0];
    const onlyColorName = colorName?.split('/')[0]; // in case of alpha like bg-white/50
    if (onlyColorName === "white" || onlyColorName === "black"){
        if (tailwindClassArr[1]){
            console.log('shade found for white/black, returning last valid color');
            return lastValidColor;
        }else if(onlyColorName){
            console.log('alpha found for white/black');
            const alpha = colorName.split('/')[1];
            if (!alpha){
                return onlyColorName === "white" ? `#ffffff` : `#000000`;
            }
            const alphaHex = parseInt(alpha) == 100 ? '' : alphaPercentToHex(parseInt(alpha));
            return onlyColorName === "white" ? `#ffffff${alphaHex}` : `#000000${alphaHex}`;
        }
    }
    let shade = tailwindClassArr[1] || '500';
    const [alpha, normalizedShade] = getAlphaFromTailwindClassArr(shade);
    shade = normalizedShade;
    console.log('shade',shade);
    const alphaHex = parseInt(alpha) == 100 ? '' : alphaPercentToHex(parseInt(alpha));
    const color = twColors[colorName as string];
    if (typeof color === "string"){
        return `${color || ""}${alphaHex}`;
    }
    if (color && shade in color) {
        return `${(color as { [shade: string]: string })[shade] || ""}${alphaHex}`;
    } else {
        return lastValidColor;
    }
}

export function alphaPercentToHex(percent: number): string {
    if (percent < 0 || percent > 100){
        return '';
    }
    // get the alpha value out of percent
    const alpha = Math.round((percent / 100) * 255);
    // convert into hex
    return alpha.toString(16).padStart(2, "0").toUpperCase();
}

export function getAlphaFromTailwindClassArr(shade: string): [string, string] {
    const parts = shade.split('/');
    const alpha = parts[1] || "100"; // Default alpha to "1" if not provided
    return [alpha, parts[0] || ""]; // Default parts[0] to an empty string if undefined
}

export function removePrefixesAndAddToArr(tailwindClass: string): string[] {
    const prefixList = ['bg', 'text', 'decoration', 'border', 'outline', 'shadow', 'inset-shadow', 'ring', 'inset-ring', 'accent', 'caret', 'fill', 'stroke'] // according to https://tailwindcss.com/docs/colors#using-color-utilities 

    const tailwindClassArr = tailwindClass.split('-');
    const tailwindClassArrWithoutPrefixes = tailwindClassArr.filter((item) => !prefixList.includes(item.toLowerCase()));
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
