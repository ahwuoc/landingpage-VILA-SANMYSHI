"use client";

import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { COMPANY_INFO, SOCIAL_LINKS } from "@/constants/company";
import styles from "./FloatingContact.module.css";

export default function FloatingContact() {
  const t = useTranslations("FloatingContact");

  return (
    <div className={`floating-contact-container ${styles.contacts}`}>
      <a
        href={SOCIAL_LINKS.find((link) => link.name === "Zalo")?.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.zalo}
        aria-label={t("zalo")}
      >
        <span className={styles.wordmark} aria-hidden="true">Zalo</span>
        <span className={styles.tooltip}>{t("zalo")}</span>
      </a>
      <a href={`tel:${COMPANY_INFO.hotline}`} className={styles.phone} aria-label={t("call")}>
        <Phone size={21} aria-hidden="true" />
        <span className={styles.tooltip}>{t("call")}</span>
      </a>
    </div>
  );
}
