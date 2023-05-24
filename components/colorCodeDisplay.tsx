import React from 'react';
import { findColorInTailwind } from '@/scripts/fromTailwind';
import { getColorCodes, type ColorCodes } from '@/scripts/fromTailwind';

type ColorCodesDisplayProps = {
  tailwindColorClass: string;
  originalColor: string;
  copyFunc: (color: string) => void;
};

function ColorCodesDisplay({ tailwindColorClass, originalColor, copyFunc }: ColorCodesDisplayProps) {
  const tailwindColor = findColorInTailwind(tailwindColorClass, originalColor);
  const colorCodes: ColorCodes = getColorCodes(tailwindColor);
  
  const colorCodesArray = Object.entries(colorCodes).map(([key, value]) => ({
    name: key.toUpperCase(),
    value
  }));

  return (
    <div className='mx-auto max-w-5xl border rounded-md border-neutral-700 bg-neutral-900 text-neutral-400 mt-10 lg:mt-16'>
      <div className="py-3.5 px-5 border-b border-b-neutral-700 text-white">Color Codes for {tailwindColor}</div>
      <div 
        className='px-5 py-6 grid md:grid-cols-2 gap-y-4 md:gap-x-12'
    >
        {colorCodesArray.map((code) => (
          <div 
            className='flex justify-between' 
            key={code.name}
            onClick={() => {
                copyFunc(code.value)
            }}
        >
            <p className='cursor-pointer'><span className='font-bold'>{code.name}:</span> {code.value}</p>
            <svg className='hidden sm:block cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <title>Copy color</title>
                <rect x="9" y="9" width="10" height="10" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorCodesDisplay;
