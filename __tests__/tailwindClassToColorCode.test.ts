import { findColorInTailwind, getColorCodes } from "@/scripts/fromTailwind";

describe('tailwindColorToClass', () => {
    test('tailwind class to hex value', () => {
        expect(findColorInTailwind('red-800')).toEqual('#991b1b');
        expect(findColorInTailwind('bg-red-800')).toEqual('#991b1b');
        expect(findColorInTailwind('text-red-800')).toEqual('#991b1b');

        // Test with different colors and shades
        expect(findColorInTailwind('blue-500')).toEqual('#3b82f6');
        expect(findColorInTailwind('green-300')).toEqual('#86efac');

        // Test with default shade when no shade is specified
        expect(findColorInTailwind('blue')).toEqual('#3b82f6');  // assuming default shade is '500'

        // Test with non-existing colors and shades
        expect(findColorInTailwind('nonexistentcolor-800')).toEqual(null);
        expect(findColorInTailwind('red-9999')).toEqual(null);
    });
});

describe('getColorCodes', () => {
    test('converts hex to rgb, rgba, hsl, hsla correctly', () => {
        const colorCodes = getColorCodes('#3b82f6');
        expect(colorCodes).toEqual({
            "hsl": "hsl(217, 91%, 60%)",
            "hsla": "hsla(217, 91%, 60%, 1)",
            "rgb": "rgb(59, 130, 246)",
            "rgba": "rgba(59, 130, 246, 1)",
        });
    });

    test('handles short hex codes', () => {
        const colorCodes = getColorCodes('#f00');
        expect(colorCodes).toEqual({
            "hsl": "hsl(0, 100%, 50%)",
            "hsla": "hsla(0, 100%, 50%, 1)",
            "rgb": "rgb(255, 0, 0)",
            "rgba": "rgba(255, 0, 0, 1)",
        });
    });

    test('handles hex with alpha channel', () => {
        const colorCodes = getColorCodes('#18c784');
        expect(colorCodes).toEqual({
            "hsl": "hsl(157, 78%, 44%)",
            "hsla": "hsla(157, 78%, 44%, 1)",
            "rgb": "rgb(24, 199, 132)",
            "rgba": "rgba(24, 199, 132, 1)",
        });
    });
});
