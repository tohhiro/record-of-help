import { tv } from 'tailwind-variants';

export const dashboardStyles = {
  container: 'm-8 text-center',
  inputDateContainer: 'flex justify-center items-center gap-4',
  errorMessageContainer: 'text-xs text-red-500 h-4',
  sendingButton: '[&_button]:md:w-[6em] [&_button]:w-[10em] md:mt-8 mb-4',
  tableContainer: 'mt-8 overflow-x-auto overflow-scroll',
};

export const dashboardFormStyles = tv({
  base: 'flex-col md:flex-row justify-center items-center gap-4 w-100 bg-slate-200 p-10',
  variants: {
    display: {
      block: 'flex',
      hidden: 'hidden',
    },
  },
  defaultVariants: {
    display: 'block',
  },
});
