import { findColorInTailwind } from '@/scripts/fromTailwind';
import chroma from 'chroma-js';
import React from 'react'

type ColorPreviewProps = {
  colorCode: string;
  colorName: string;
  lastValidColorCode: string;
  onCopy: () => void;
}

function ColorPreview ({colorName, colorCode, onCopy, lastValidColorCode}: ColorPreviewProps){

  const bgColor = findColorInTailwind(colorCode, lastValidColorCode);
  const textColor = getTextColor(bgColor);

  function getTextColor (bgColor: string): string {
    const whiteContrast = chroma.contrast(bgColor, '#E5E5E5') as number;
    const blackContrast = chroma.contrast(bgColor, '#292524') as number;

    return whiteContrast > blackContrast ? '#E5E5E5' : '#292524';
  }

  return (
    <div className="flex justify-center w-full" onClick={onCopy}>
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
            <span className='text-sm p-1'>{colorCode}</span>  
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorPreview
