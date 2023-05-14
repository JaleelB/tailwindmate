import { findColorInTailwind } from "@/scripts/fromTailwind";

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

