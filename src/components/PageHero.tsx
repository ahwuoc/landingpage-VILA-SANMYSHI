"use client";

import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import styles from "./PageHero.module.css";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  image: string;
  imageAlt: string;
  overlay?: string;
  imageOpacity?: string;
  align?: "left" | "center";
  customOverlay?: React.ReactNode;
  breadcrumb: BreadcrumbItem[];
  tag?: string;
  title: React.ReactNode;
  description?: string;
}

export default function PageHero({
  image,
  imageAlt,
  breadcrumb,
  tag,
  title,
  description,
}: PageHeroProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.container}>
        <Breadcrumb items={breadcrumb} />
        <div className={styles.grid}>
          <div className={styles.copy}>
            {tag && <p className={styles.tag}><span />{tag}</p>}
            <h1 className={styles.title}>{title}</h1>
            {description && <p className={styles.description}>{description}</p>}
            <div className={styles.signature}><span />VILA SANMYSHI · EST. 2018</div>
          </div>
          <div className={styles.visual}>
            <div className={styles.orbit} aria-hidden="true" />
            <div className={styles.photo}>
              <Image src={image} alt={imageAlt} fill className={styles.image} preload sizes="(max-width: 760px) 100vw, 46vw" />
              <span className={styles.photoLabel}>VILA SANMYSHI</span>
            </div>
            <span className={styles.seal} aria-hidden="true">V<span>↗</span></span>
          </div>
        </div>
      </div>
    </header>
  );
}
