'use client';
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

  return (
    <header role="banner">
      <nav className={headerStyles.slots.navContainer}>
        {process.env.NEXT_PUBLIC_ENV !== 'production' && (
          <span className={headerStyles.slots.ribbonText}>{process.env.NEXT_PUBLIC_ENV}</span>
        )}

        <div className={headerStyles.slots.navBaseStyle}>
          <span className={headerStyles.slots.headerTitle}>
            <Link href="/login">{headerText}</Link>
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className={headerStyles.slots.hamburgerMenu}
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
              <ul className={headerStyles.slots.menuUlStyle}>
                {Object.keys(links).map((link) => (
                  <li key={link} className={headerStyles.slots.menuLiStyle}>
                    <Link
                      className={headerStyles.slots.menuLink}
                      href={links[link as keyof typeof links]}
                      onClick={() => setIsOpen(false)}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
                <li className={headerStyles.slots.menuLiStyle}>
                  <Link href="#" className={headerStyles.slots.menuLink} onClick={onClick}>
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
