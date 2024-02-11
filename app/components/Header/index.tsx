'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import '../../styles/globals.css';
import { headerStyles } from './index.styles';

export const headerText = 'Record of help';

export type NavType = {
  Form: string;
  Dashboard: string;
};

export const Header = ({ links }: { links: NavType }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header role="banner">
      <nav className={headerStyles.navContainer}>
        {process.env.NEXT_PUBLIC_ENV !== 'production' && (
          <span className={headerStyles.ribbonText}>{process.env.NEXT_PUBLIC_ENV}</span>
        )}

        <div className={headerStyles.navBaseStyle}>
          <Link href="/login">
            <span className={headerStyles.headerTitle}>{headerText}</span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className={headerStyles.hamburgerMenu}
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => setMenuOpen((prev) => !prev)}
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
            className={`${!menuOpen ? 'hidden' : 'block'} ${headerStyles.hamburgerContainer}`}
            id="navbar-default"
          >
            <ul className={headerStyles.menuUlStyle}>
              {Object.keys(links).map((link) => (
                <li key={link} className={headerStyles.menuLiStyle}>
                  <Link
                    href={links[link as keyof typeof links]}
                    onClick={() => setMenuOpen(false)}
                    className={headerStyles.menuLinkStyle}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
