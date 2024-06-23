import { cva, VariantProps } from 'class-variance-authority';

export const buttonStyles = cva('font-bold py-2 px-4 rounded', {
  variants: {
    intent: {
      primary: 'bg-blue-500 hover:bg-blue-700 text-white ',
      secondary:
        'bg-transparent hover:bg-blue-500 text-blue-700 border border-blue-500 hover:border-transparent',
      disabled: 'bg-blue-500 text-white opacity-50 cursor-not-allowed text-white ',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

export type ButtonVariantProps = VariantProps<typeof buttonStyles>;
