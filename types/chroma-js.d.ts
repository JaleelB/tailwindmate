declare module 'chroma-js' {
    export interface Chroma {
      valid: (color: string) => boolean;
    }
  
    const chroma: Chroma;
    export default chroma;
}
  