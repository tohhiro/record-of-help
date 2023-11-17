export const headerText = "Record of help";

export const Header = () => {
  return (
    <header
      className="w-100 h-16 bg-green-600 text-white shadow-sm font-mono flex items-center justify-center"
      role="banner"
    >
      {headerText}
    </header>
  );
};
