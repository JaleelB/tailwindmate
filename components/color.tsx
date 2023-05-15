import React, { useState, useRef } from 'react';
import namer, { type Color } from 'color-namer';
import chroma from 'chroma-js';
import colorToTailwindClass from '@/scripts/toTailwind';
import { findColorInTailwind } from '@/scripts/fromTailwind';

type ColorComponentProps = {
  type: string;
  placeholder: string;
}

function ColorComponent({ type, placeholder }: ColorComponentProps) {

  
  const [inputColor, setInputColor] = useState('');
  const displayedColorRef = useRef('teal-500');
  const colorName = useRef(getColorName('#43e5a2').name);
  const [copyMessage, setCopyMessage] = useState('');
  const lastValidColor = useRef('#43e5a2');


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

  const getTextColor = (bgColor: string) => {
    const whiteContrast = chroma.contrast(bgColor, '#E5E5E5') as number;
    const blackContrast = chroma.contrast(bgColor, '#292524') as number;

    return whiteContrast > blackContrast ? '#E5E5E5' : '#292524';
  };
  

  return (
    <div className="w-full border border-neutral-700 rounded-md mt-12">
      <div className="flex justify-between w-full bg-neutral-800 p-2">
        <input
          type="text"
          value={inputColor}
          placeholder={placeholder}
          onChange={handleColorChange}
          className="p-2 w-full sm:w-72 text-white bg-neutral-900 rounded-md"
        />
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
      {copyMessage && (
        <div
          className={`fixed bottom-4 md:bottom-8 right-0 md:right-4 mt-4 mr-4 text-white py-3 px-8 rounded-md cursor-pointer ${
            copyMessage === 'Color copied successfully!' ? 'shadow-success bg-green-800 border border-green-600 ' : 'shadow-error bg-red-800 border border-red-600'
          }`}
        >
          {copyMessage === 'Color copied successfully!' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 inline mr-2"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 inline mr-2"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-13a1 1 0 112 0v6a1 1 0 11-2 0V5zm1 11a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          )}
            <p className="inline">{copyMessage}</p>
        </div>
      )}
  </div>
);
}

export default ColorComponent;