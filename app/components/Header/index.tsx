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
        <div className={headerStyles.navBaseStyle}>
          <span className={headerStyles.headerTitle}>{headerText}</span>
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
                <li key={link}>
                  <Link
                    href={links[link as keyof typeof links]}
                    className={headerStyles.menuLiStyle}
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
