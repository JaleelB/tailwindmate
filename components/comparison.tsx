import React from 'react';
import { findColorInTailwind } from '@/scripts/fromTailwind';

type ColorComparisonProps = {
  originalColor: string;
  tailwindColor: string;
}

function ColorComparison({ originalColor, tailwindColor }: ColorComparisonProps) {

    return (
        <div 
            className='flex flex-col md:flex-row gap-4 mt-12 text-neutral-500'
        >
            <div className='w-full'>
                <p className='font-bold text-lg'>Original Color</p>
                <p>Original color code: {originalColor}</p>
                <div className="w-full h-20 md:h-28 rounded-md mt-4" style={{ backgroundColor: originalColor }}/>
            </div>
            
            <div className='w-full'>
                <p className='font-bold text-lg'>Tailwind Color</p>
                <p>Tailwind color class: {tailwindColor}</p>
                <div className="w-full h-20 md:h-28 rounded-md mt-4" style={{ backgroundColor: findColorInTailwind(tailwindColor, originalColor) }}/>
            </div>
        </div>
    );
}

export default ColorComparison;

