import * as tailwindColors from "tailwindcss/colors";

export type Color = {
    r: number;
    g: number;
    b: number;
    a?: number;
  }
  
type TailwindColor = {
    [shade: number]: string
};

export type TailwindColors = {
    [key: string]: TailwindColor;
};
  
export const twColors = tailwindColors as unknown as TailwindColors;