export default function preprocessColor(color: string): string {
  color = color.toLowerCase().trim();
  
  return color.replace(/((rgb|hsl)a?\([\d.\s%]+\))/i, (match, color: string, func: string) => {
    const values: string = color.substring(func.length+1, color.length-1);
    const valueList: string[] = values.split(/\s+/).map((value: string, i: number) => {
      if (i > 0 && /hsl/i.test(func) && !/%$/.test(value)) {
        return `${value}%`;
      }
      return value;
    });

    return `${func}(${valueList.join(', ')})`;
  });
}
