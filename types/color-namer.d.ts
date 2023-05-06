declare module 'color-namer' {
    export interface Color {
      name: string;
      hex: string;
      distance: number;
    }
  
    export interface ColorGroups {
      ntc: Color[];
    }
  
    function namer(colorCode: string): ColorGroups;
  
    export = namer;
}
  