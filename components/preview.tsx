import { findTailwindClassHexEquivalent } from '@/scripts/fromTailwind';
import chroma from 'chroma-js';
import React from 'react'

type ColorPreviewProps = {
  colorCode: string;
  colorName: string;
  lastValidColorCode: string;
  type: string;
  onCopy: (color: string) => void;
}

function ColorPreview ({colorName, colorCode, onCopy, lastValidColorCode, type}: ColorPreviewProps){

  const bgColor = findTailwindClassHexEquivalent(colorCode, lastValidColorCode);
  const textColor = getTextColor(bgColor);

function getTextColor (bgColor: string): string {
  try {
    const color = chroma(bgColor);
    const alpha = color.alpha();
    console.log('Alpha:', alpha);
    // Bei Transparenz < 50% immer dunkler Text
    if (alpha < 0.5) {
      return '#E5E5E5';
    }
    
    // Standard-Luminanz-Regel für opake/halbtransparente Farben
    const luminance = color.luminance();
    console.log('Luminance:', luminance);
    return luminance > 0.5 ? '#292524' : '#E5E5E5';
    
  } catch {
    return '#292524';
  }
}

  return (
    <div className="flex justify-center w-full" onClick={() => onCopy(type === "to-tailwind" ? colorCode : bgColor)}>
      <div
        style={{ backgroundColor: bgColor }}
        className="h-32 m-2 w-full rounded-md relative cursor-pointer"
      >
        <div 
          className="absolute inset-0 flex items-center justify-center text-black"
          style={{ color: textColor }}
        >
          <div className='font-medium flex flex-col gap-1 text-center'>
            <span className='text-2xl'>{colorName}</span>
            <span className='text-sm p-1'>{type === "to-tailwind" ? colorCode : bgColor}</span>  
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorPreview
