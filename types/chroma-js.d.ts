declare module 'chroma-js' {
  import type { Color as CustomColor } from '../scripts/toTailwind';

  export type Color = string | CustomColor | [number, number, number];

  export interface ChromaStatic {
    (color: Color): ChromaInstance;
    rgb(r: number, g: number, b: number): ChromaInstance;
    hsl(h: number, s: number, l: number, a?: number): ChromaInstance;
    valid(color: string): boolean;
  }

  export interface ChromaInstance {
    hsl(): number[];
    get(arg0: string): unknown;
    lab(): [number, number, number];
    rgb(): [number, number, number];
    rgba(): [number, number, number, number];
    hex(): string;
    alpha(): number;
  }

  const chroma: ChromaStatic;
  export = chroma;
}
