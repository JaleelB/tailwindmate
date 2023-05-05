"use client";
import React, { useState, useRef } from 'react';

interface ColorComponentProps {
  type: string
  placeholder: string
}

function ColorComponent({ type, placeholder }: ColorComponentProps) {

  const [inputColor, setInputColor] = useState('');
  const displayedColorRef = useRef('#009abc');

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(event.target.value);
    if (event.target.value) {
      displayedColorRef.current = event.target.value;
    }
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
      <div className="flex justify-center w-full">
        <div
          style={{ backgroundColor: displayedColorRef.current }}
          className="h-32 m-2 w-full rounded-md"
        ></div>
      </div>
    </div>
  );
}

export default ColorComponent;
