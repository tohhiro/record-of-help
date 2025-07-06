import '@/app/styles/globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { hamburgerContainer, headerStyles } from './index.styles';

export const headerText = 'Record of help';

export type NavAdminType = {
  Form: string;
  Dashboard: string;
};

export type NavMemberType = {
  Dashboard: string;
};

export const Header = ({
  links,
  loginUser,
  onClick,
}: {
  links: NavAdminType | NavMemberType;
  onClick: () => void;
  loginUser?: string | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    navContainer,
    ribbonText,
    navBaseStyle,
    headerTitle,
    hamburgerMenu,
    menuUlStyle,
    menuLiStyle,
    menuLink,
  } = headerStyles();

  return (
    <header role="banner">
      <nav className={navContainer()}>
        {process.env.NEXT_PUBLIC_ENV !== 'production' && (
          <span className={ribbonText()}>{process.env.NEXT_PUBLIC_ENV}</span>
        )}

        <div className={navBaseStyle()}>
          <span className={headerTitle()}>
            <Link href="/login">{headerText}</Link>
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className={hamburgerMenu()}
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={hamburgerContainer({ hamburger: isOpen ? 'open' : 'hidden' })}
            id="navbar-default"
          >
            {loginUser && (
              <ul className={menuUlStyle()}>
                {Object.keys(links).map((link) => (
                  <li key={link} className={menuLiStyle()}>
                    <Link
                      className={menuLink()}
                      href={links[link as keyof typeof links]}
                      onClick={() => setIsOpen(false)}
                    >
                      {link}
                    </Link>
                  </li>
                ))}

                <li className={menuLiStyle()}>
                  <Link href="#" className={menuLink()} onClick={onClick}>
                    {loginUser}
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
