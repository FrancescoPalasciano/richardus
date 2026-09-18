"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { restaurant } from "@/lib/restaurant";

type HeaderProps = {
  categorie: { id: string; nome: string }[];
};

export default function Header({ categorie }: HeaderProps) {
  const pathname = usePathname();
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  function closeNavigation() {
    setNavigationOpen(false);
    setCategoriesOpen(false);
  }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setNavigationOpen(false);
        setCategoriesOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (categoriesOpen) {
        event.preventDefault();
        setCategoriesOpen(false);
        menuRef.current?.focus();
      } else if (navigationOpen) {
        event.preventDefault();
        setNavigationOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [categoriesOpen, navigationOpen]);

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 768px)");
    function handleBreakpointChange() {
      // Avoid leaving keyboard focus in navigation hidden by the new layout.
      const activeElement = document.activeElement;
      if (
        !breakpoint.matches &&
        activeElement instanceof Element &&
        activeElement.closest("#site-navigation")
      ) {
        toggleRef.current?.focus();
      } else if (breakpoint.matches && activeElement === toggleRef.current) {
        headerRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      }
      setNavigationOpen(false);
      setCategoriesOpen(false);
    }
    breakpoint.addEventListener("change", handleBreakpointChange);
    return () =>
      breakpoint.removeEventListener("change", handleBreakpointChange);
  }, []);

  return (
    <header
      ref={headerRef}
      className={styles.header}
      onBlur={(event) => {
        if (
          event.relatedTarget instanceof Node &&
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          closeNavigation();
        }
      }}
    >
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Richardus, homepage"
          onClick={closeNavigation}
        >
          <Image
            src="/logo-richardus.webp"
            alt="Richardus"
            width={256}
            height={300}
            preload
            sizes="68px"
          />
        </Link>

        <nav
          id="site-navigation"
          aria-label="Navigazione principale"
          className={styles.navigation}
          data-open={navigationOpen}
        >
          <ul className={styles.links}>
            <li>
              <Link
                href="/"
                className={styles.link}
                aria-current={pathname === "/" ? "page" : undefined}
                onClick={closeNavigation}
              >
                Home
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/menu" className={styles.link} aria-current={pathname === "/menu" ? "page" : undefined} onClick={closeNavigation}>
                Menu
              </Link>
              <button
                ref={menuRef}
                type="button"
                className={styles.categoryToggle}
                aria-label="Categorie del menu"
                data-active={pathname === "/menu"}
                aria-expanded={categoriesOpen}
                aria-controls="menu-categories"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                <svg
                  className={styles.chevron}
                  data-open={categoriesOpen}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <ul
                id="menu-categories"
                className={styles.categories}
                hidden={!categoriesOpen}
              >
                <li className={styles.overview}>
                  <Link href="/menu" onClick={closeNavigation}>
                    Tutto il menu
                  </Link>
                </li>
                {categorie.map((categoria) => (
                  <li key={categoria.id}>
                    <Link
                      href={`/menu#${categoria.id}`}
                      onClick={closeNavigation}
                    >
                      {categoria.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                href="/chi-siamo"
                className={styles.link}
                aria-current={pathname === "/chi-siamo" ? "page" : undefined}
                onClick={closeNavigation}
              >
                Chi siamo
              </Link>
            </li>
          </ul>
        </nav>

        <a className={styles.booking} href={restaurant.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Prenota un tavolo su WhatsApp">
          Prenota
        </a>
        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-label={
            navigationOpen ? "Chiudi navigazione" : "Apri navigazione"
          }
          aria-expanded={navigationOpen}
          aria-controls="site-navigation"
          onClick={() => {
            setNavigationOpen(!navigationOpen);
            setCategoriesOpen(false);
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path className={styles.toggleTop} d="M3 6h18" />
            <path className={styles.toggleMiddle} d="M3 12h18" />
            <path className={styles.toggleBottom} d="M3 18h18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
