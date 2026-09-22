import type { ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import styles from "./Status.module.css";

const languageNames = { vi: "Tiếng Việt", en: "English", th: "ภาษาไทย" };

type StatusShellProps = {
  children: ReactNode;
  locale: string;
  route?: "/maintenance" | "/coming-soon";
  image: string;
  imageAlt: string;
  caption: string;
  captionDetail: string;
};

export default function StatusShell({ children, locale, route, image, imageAlt, caption, captionDetail }: StatusShellProps) {
  return (
    <div className={`${styles.page} ${route ? styles.standalone : styles.embedded}`}>
      {route && (
        <header className={styles.header}>
          <Link href="/" className={styles.brand}>
            <Image src="/images/logo.jpg" alt="" width={64} height={46} />
            <span>VILA SANMYSHI</span>
          </Link>
          <nav className={styles.languages} aria-label={locale === "th" ? "ภาษา" : locale === "en" ? "Language" : "Ngôn ngữ"}>
            {Object.entries(languageNames).map(([code, name]) => (
              <Link key={code} href={route} locale={code} lang={code} aria-label={name} aria-current={locale === code ? "page" : undefined}>
                {code.toUpperCase()}
              </Link>
            ))}
          </nav>
        </header>
      )}
      <div className={styles.layout}>
        <div className={styles.content}>{children}</div>
        <div className={styles.visual}>
          <div className={styles.photo}>
            <Image src={image} alt={imageAlt} fill sizes="(max-width: 800px) 100vw, 44vw" className={styles.image} preload />
          </div>
          <div className={styles.caption}>
            <span className={styles.captionMark} aria-hidden="true">V.</span>
            <div><p>{caption}</p><span>{captionDetail}</span></div>
          </div>
        </div>
      </div>
      {route && <footer className={styles.footer}>VILA SANMYSHI <span>© {new Date().getFullYear()}</span></footer>}
    </div>
  );
}
