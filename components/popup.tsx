import React from 'react'

type PopupProps = {
    copyMessage: string;
}

const Popup = ({copyMessage}: PopupProps) => {
  return (
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
  )
}

export default Popup
