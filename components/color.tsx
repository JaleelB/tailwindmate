import React, { useState, useRef } from 'react';
import namer, { type Color } from 'color-namer';
import chroma from 'chroma-js';
import colorToTailwindClass from '@/scripts/toTailwind';
import { findColorInTailwind } from '@/scripts/fromTailwind';
import Popup from './popup';
import ColorPreview from './preview';

type ColorComponentProps = {
  type: string;
  placeholder: string;
}

function ColorComponent({ type, placeholder }: ColorComponentProps) {

  
  const [inputColor, setInputColor] = useState(type === "to-tailwind" ? "#43e5a2" : "rose-600");
  const displayedColorRef = useRef(type === "to-tailwind" ? "teal-500" : "#E11D48");
  const colorName = useRef(getColorName(type === "to-tailwind" ? '#43e5a2' : "#E11D48").name);
  const [copyMessage, setCopyMessage] = useState('');
  const lastValidColor = useRef(type === "to-tailwind" ? '#43e5a2' : "#E11D48");
  const [showColorPreview, setShowColorPreview] = useState(false);

  function handleColorChange (event: React.ChangeEvent<HTMLInputElement>) {
    setInputColor(event.target.value);
    if (
      event.target.value &&
      typeof chroma.valid === "function" &&
      chroma.valid(event.target.value)
    ) {
      const closestTailwindColor = colorToTailwindClass(event.target.value);
      displayedColorRef.current = closestTailwindColor
      colorName.current = getColorName(event.target.value).name
      lastValidColor.current = event.target.value; 
    } else {
      displayedColorRef.current = lastValidColor.current; 
      colorName.current = getColorName(lastValidColor.current).name;
    }
  }

  async function handleColorCopy () {
    try {
      await navigator.clipboard.writeText(displayedColorRef.current);
      setCopyMessage(`Color copied successfully!`);
      setTimeout(() => {
        setCopyMessage('');
      }, 4000);
    } catch (error) {
      console.error('Failed to copy color:', error);
      setCopyMessage(`Failed to copy color code!`);
      setTimeout(() => {
        setCopyMessage('');
      }, 4000);
    }
  }

  function getColorName (colorCode: string): Color {
    if ((chroma.valid as (color: string) => boolean)(colorCode)) {
      const colorNames = namer(colorCode);
      return colorNames.ntc[0] || { name: 'Unknown', hex: '', distance: -1 };
    } else {
      return { name: 'Invalid', hex: '', distance: -1 };
    }
  }

  function showPreview() {
    setShowColorPreview(showColorPreview => !showColorPreview);
  }

  function getTextColor (bgColor: string): string {
    const whiteContrast = chroma.contrast(bgColor, '#E5E5E5') as number;
    const blackContrast = chroma.contrast(bgColor, '#292524') as number;

    return whiteContrast > blackContrast ? '#E5E5E5' : '#292524';
  }


  return (
    <>
    <div className="w-full border border-neutral-700 rounded-md mt-12">
      <div className="w-full bg-neutral-800 p-2 relative">
        <input
          type="text"
          value={inputColor}
          placeholder={placeholder}
          onChange={handleColorChange}
          className="p-2 w-full sm:w-72 text-white bg-neutral-900 rounded-md"
        />
        {inputColor && (
          <button onClick={() =>  setInputColor('')} className="text-white -ml-8 -top-1.5 h-7 w-8 cursor-pointer relative">
            <svg className="absolute inset-0 m-auto" width="11" height="12" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M10 1.50714L8.99286 0.5L5 4.49286L1.00714 0.5L0 1.50714L3.99286 5.5L0 9.49286L1.00714 10.5L5 6.50714L8.99286 10.5L10 9.49286L6.00714 5.5L10 1.50714Z" 
                fill="white"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="flex justify-center w-full" onClick={() => void handleColorCopy()}>
        <div
          style={{ backgroundColor: findColorInTailwind(displayedColorRef.current, lastValidColor.current) }}
          className="h-32 m-2 w-full rounded-md relative cursor-pointer"
        >
          <div 
            className="absolute inset-0 flex items-center justify-center text-black"
            style={{ color: getTextColor(findColorInTailwind(displayedColorRef.current, lastValidColor.current)) }}
          >
            <div className='font-medium flex flex-col gap-1 text-center'>
              <span className='text-2xl'>{colorName.current}</span>
              <span className='text-sm p-1'>{displayedColorRef.current}</span>  
            </div>
          </div>
        </div>
      </div>
    </div>

    {type === "to-tailwind" && 
      <button 
        className="mt-5 sm:mt-3 text-neutral-400 bg-neutral-800 hover:bg-neutral-700 py-2 px-6 font-medium rounded-full"
        onClick={showPreview}
      >
       { !showColorPreview ? 'Show color preview' : 'Hide color preview'}
      </button>
    }
    
    {copyMessage && (
      <Popup copyMessage={copyMessage} />
    )}

    {showColorPreview && (
      <ColorPreview 
        originalColor={lastValidColor.current}
        tailwindColor={displayedColorRef.current}
      />
    )}
  </>
);
}

export default ColorComponent;