import { tv } from 'tailwind-variants';

export const headerStyles = tv({
  slots: {
    ribbonText:
      'inline-block absolute py-[7px] left-[-26px] top-[10px] w-[100px] text-center text-xs leading-4 bg-green-400 opacity-90 tracking-wider rotate-[-45deg] shadow-[0 2px 5px rgba(0, 0, 0, 0.2)] text-white',
    navContainer: 'bg-black border-gray-200 dark:bg-gray-900 text-white',
    navBaseStyle:
      'max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 text-white',
    headerTitle:
      'self-center text-2xl font-semibold whitespace-nowrap hover:text-green-400 dark:text-white text-white hover:text-green-400',
    hamburgerMenu:
      'inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600',
    menuUlStyle:
      'font-medium flex flex-col md:flex-row md:space-x-8 border-gray-100 md:p-0 mt-4 text-white',
    menuLiStyle: 'block py-2 px-3 md:p-0 hover:text-green-400',
    menuLink: 'block w-full h-full text-white hover:text-green-400',
  },
});

export const hamburgerContainer = tv({
  base: 'w-full md:block md:w-auto',
  variants: {
    hamburger: {
      hidden: 'hidden',
      open: 'block',
    },
  },
  defaultVariants: {
    hamburger: 'hidden',
  },
});
