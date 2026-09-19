"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Phone, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogTitle,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/disclosure";
import { restaurant } from "@/lib/restaurant";
import styles from "./Header.module.css";
import Brand from "./Brand";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/#contatti", label: "Dove siamo" },
];
const subscribeScroll = (callback: () => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [bookingVisible, setBookingVisible] = useState(true);
  const toggle = useRef<HTMLButtonElement>(null);
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 32,
    () => false,
  );
  const dockEligible = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 480,
    () => false,
  );
  useEffect(() => {
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        entry.isIntersecting
          ? visible.add(entry.target)
          : visible.delete(entry.target),
      );
      setBookingVisible(visible.size > 0);
    });
    document
      .querySelectorAll("[data-booking-visibility]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);
  return (
    <>
      <header className={styles.header} data-scrolled={scrolled}>
        <Link href="/" aria-label="Richardus, homepage">
          <Brand />
        </Link>
        <nav className={styles.desktopNav} aria-label="Navigazione principale">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <Button asChild className={styles.desktopBooking}>
            <a
              href={restaurant.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prenota un tavolo su WhatsApp"
            >
              Prenota <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                ref={toggle}
                variant="secondary"
                size="icon"
                className={styles.mobileToggle}
                aria-label="Apri navigazione"
              >
                <Menu size={21} aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent className={styles.mobileSheet}>
              <DialogTitle>
                <Brand full />
              </DialogTitle>
              <DialogDescription>
                Trattoria storica a Francavilla Fontana.
              </DialogDescription>
              <nav
                aria-label="Navigazione mobile"
                className={styles.mobileLinks}
              >
                {[...links, { href: "/#prenota", label: "Contatti" }].map(
                  (link) => (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.href}
                        aria-current={
                          pathname === link.href ? "page" : undefined
                        }
                      >
                        {link.label}
                        <ArrowUpRight size={21} aria-hidden="true" />
                      </Link>
                    </SheetClose>
                  ),
                )}
              </nav>
              <div className={styles.mobileDetails}>
                <p>
                  Via San Giovanni 15
                  <br />
                  Francavilla Fontana · BR
                </p>
                <a href={`tel:${restaurant.phone}`}>
                  <Phone size={17} aria-hidden="true" />
                  {restaurant.phoneLabel}
                </a>
              </div>
              <SheetClose asChild>
                <Button asChild>
                  <a
                    href={restaurant.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Prenota un tavolo{" "}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <nav
        className={`${styles.dock} mobile-dock`}
        aria-label="Azioni rapide"
        hidden={!dockEligible || bookingVisible || open}
      >
        <Button asChild variant="ghost">
          <Link href="/menu">
            <Utensils size={17} aria-hidden="true" /> Menu
          </Link>
        </Button>
        <Button asChild>
          <a
            href={restaurant.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Prenota su WhatsApp"
          >
            Prenota <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </Button>
      </nav>
    </>
  );
}
