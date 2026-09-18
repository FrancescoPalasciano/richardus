import Image from "next/image";
import type { ReactNode } from "react";
import homePhoto from "@/app/images/home.webp";
import styles from "./PageHero.module.css";

type PageHeroProps = {
  title: string;
  eyebrow: string;
  description?: string;
  fullHeight?: boolean;
  children?: ReactNode;
};

export default function PageHero({
  title,
  eyebrow,
  description,
  fullHeight = false,
  children,
}: PageHeroProps) {
  return (
    <section
      className={styles.hero}
      data-full-height={fullHeight}
      aria-labelledby="page-title"
    >
      <Image
        src={homePhoto}
        alt=""
        fill
        preload
        sizes="100vw"
        className={styles.photo}
      />
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 id="page-title" className={styles.title}>
          {title}
        </h1>
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
    </section>
  );
}
