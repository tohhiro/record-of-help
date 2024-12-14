import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: 'font-bold py-2 px-4 rounded text-white bg-blue-500',
  variants: {
    intent: {
      primary: 'hover:bg-blue-700  ',
      secondary:
        'bg-transparent hover:bg-blue-500 text-blue-700 border border-blue-500 hover:border-transparent',
      disabled: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});
