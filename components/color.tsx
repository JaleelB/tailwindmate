import React, { useState, useRef } from 'react';
import namer, { type Color } from 'color-namer';
import chroma from 'chroma-js';
import colorToTailwindClass from '@/scripts/toTailwind';
import Popup from './popup';
import ColorComparison from './comparison';
import ColorPreview from './preview';
import ColorCodesDisplay from './colorCodeDisplay';

type ColorComponentProps = {
  type: string;
  placeholder: string;
}

function ColorComponent({ type, placeholder }: ColorComponentProps) {

  const [inputColor, setInputColor] = useState(type === "to-tailwind" ? "#43e5a2" : "rose-600");
  const displayedColorRef = useRef(type === "to-tailwind" ? "emerald-400" : "#E11D48");
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

  function handleColorCopy(color: string) {
    void(async (colorToCopy: string) => {
      let message = `Color copied successfully!`;
      try {
        await navigator.clipboard.writeText(colorToCopy);
      } catch (error) {
        console.error('Failed to copy color:', error);
        message = `Failed to copy color code!`;
      } finally {
        setCopyMessage(message);
        setTimeout(() => {
          setCopyMessage('');
        }, 4000);
      }
    })(color);
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
      <ColorPreview 
        colorName={colorName.current}
        colorCode={displayedColorRef.current}
        lastValidColorCode={lastValidColor.current}
        onCopy={handleColorCopy}
      />
    </div>

    {type === "to-tailwind" && 
      <button 
        className="mt-5 sm:mt-3 text-neutral-400 bg-neutral-800 hover:bg-neutral-700 py-2 px-6 font-medium rounded-full"
        onClick={showPreview}
      >
       { !showColorPreview ? 'Show color preview' : 'Hide color preview'}
      </button>
    }
    
    {
      type === "from-tailwind" && 
      <ColorCodesDisplay
        copyFunc={handleColorCopy}
        tailwindColorClass={displayedColorRef.current}
        originalColor={lastValidColor.current}
      />
    }
    
    {copyMessage && (
      <Popup copyMessage={copyMessage} />
    )}

    {showColorPreview && (
      <ColorComparison 
        originalColor={lastValidColor.current}
        tailwindColor={displayedColorRef.current}
      />
    )}
  </>
);
}

export default ColorComponent;