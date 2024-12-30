import { tv } from 'tailwind-variants';

export const inputStyles = tv({
  base: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
  variants: {
    intent: {
      primary: 'cursor-pointer',
      disabled: 'cursor-not-allowed opacity-50',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

export const labelStyles = {
  label: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
};
