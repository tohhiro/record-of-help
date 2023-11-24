import { headerStyles } from "./index.styles";

export const headerText = "Record of help";

export const Header = () => {
  return (
    <header className={`${headerStyles.container}`} role="banner">
      {headerText}
    </header>
  );
};
