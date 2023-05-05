import React, { useState, useRef } from 'react';

interface ColorComponentProps {
  type: string;
  placeholder: string;
}

function ColorComponent({ type, placeholder }: ColorComponentProps) {
  const [inputColor, setInputColor] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const displayedColorRef = useRef('#43e5a2');

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(event.target.value);
    if (event.target.value) {
      displayedColorRef.current = event.target.value;
    }
  };

  const handleColorCopy = async () => {
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
          style={{ backgroundColor: displayedColorRef.current }}
          className="h-32 m-2 w-full rounded-md relative cursor-pointer"
        >
          <div className="absolute inset-0 flex items-center justify-center text-black">
            <span>
              {inputColor || type}: {displayedColorRef.current}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorComponent;
