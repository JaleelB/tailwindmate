declare module 'chroma-js' {
  export interface Chroma {
    (color: string): ChromaInstance;
    distance(color: chroma.Color, arg1: never): never;
    valid: (color: string) => boolean;
  }

  export interface ChromaInstance {
    hex(): string;
  }

  const chroma: Chroma;
  export default chroma;
}

  