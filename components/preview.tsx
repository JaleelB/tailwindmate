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
    const whiteContrast = chroma.contrast(bgColor, '#E5E5E5') as number;
    const blackContrast = chroma.contrast(bgColor, '#292524') as number;

    return whiteContrast > blackContrast ? '#E5E5E5' : '#292524';
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
