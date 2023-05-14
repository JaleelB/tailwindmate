import { twColors } from "@/types/colors";


export function findColorInTailwind(tailwindClass: string): string | null {
    const tailwindClassArr = removePrefixesAndAddToArr(tailwindClass);
    const colorName = tailwindClassArr[0];
    const shade = tailwindClassArr[1] || '500';
    const color = twColors[colorName as string];
    if (color && shade in color) {
        return (color as { [shade: string]: string })[shade] || null;
    } else {
        return null;
    }
}

export function removePrefixesAndAddToArr(tailwindClass: string): string[] {
    const tailwindClassArr = tailwindClass.split('-');
    const tailwindClassArrWithoutPrefixes = tailwindClassArr.filter((item) => item !== 'text' && item !== 'bg');
    return tailwindClassArrWithoutPrefixes;
}
