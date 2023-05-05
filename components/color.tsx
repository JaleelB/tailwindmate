"use client";
import React, { useState } from 'react';

interface ColorComponentProps {
  type: string
}

function ColorComponent({ type }: ColorComponentProps) {
  const [color, setColor] = useState('#009abc');

  const handleColorChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setColor(event.target.value);
  };

  return (
    <div className="w-full border border-neutral-700 rounded-md mt-12">
      <div className="flex justify-between w-full bg-neutral-800 p-2">
        <input
          type="text"
          value={color}
          onChange={handleColorChange}
          className="p-2 w-64 text-white bg-neutral-900 rounded-md"
        />
      </div>
      <div className="flex justify-center w-full">
        <div
          style={{ backgroundColor: color }}
          className="h-32 m-2 w-full rounded-md"
        ></div>
      </div>
    </div>
  );
}

export default ColorComponent;
