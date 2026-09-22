import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, FileCheck2, Globe2, MapPin, PackageCheck, Phone, Search, ShieldCheck, Truck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { NewsItem, ServiceItem } from "@/lib/data";
import { COMPANY_INFO } from "@/constants/company";
import { copy, fallbackImages } from "./content";
import { editorialCopy } from "./editorialCopy";
import HomeMotion from "./HomeMotion";
import KnowledgeHub from "./KnowledgeHub";
import ShipmentTools from "./ShipmentTools";
import { shippingFaqs } from "./resources";
import RouteIllustration from "./RouteIllustration";
import styles from "./Home.module.css";

const supportedRemoteHosts = ["images.unsplash.com", "lh3.googleusercontent.com", "i.pravatar.cc", "xhtkvralkhnvohxjrmgq.supabase.co"];
const processIcons = [FileCheck2, ShieldCheck, Truck, PackageCheck];

function safeImage(src: string | undefined, fallback: string) {
  if (!src) return fallback;
  if (src.startsWith("/") && !src.startsWith("//")) return src;
  try {
    return supportedRemoteHosts.includes(new URL(src).hostname) ? src : fallback;
  } catch {
    return fallback;
  }
}

function plainText(value: string | undefined) {
  return value?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || "";
}

export default function HomeView({ services = [], newsList = [] }: { services?: ServiceItem[]; newsList?: NewsItem[] }) {
  const locale = useLocale();
  const current = copy[locale as keyof typeof copy] || copy.vi;
  const design = editorialCopy[locale as keyof typeof editorialCopy] || editorialCopy.vi;
  const servicesT = useTranslations("Home.services");
  const landingServices = services.length
    ? services.slice(0, 6).map((service, index) => {
        const fallback = current.fallbackServices[index];
        return {
          id: service.id,
          category: service.service_categories?.name?.[locale] || service.service_categories?.name?.vi || fallback.category,
          title: service.title?.[locale] || service.title?.vi || fallback.title,
          description: plainText(service.content?.[locale] || service.content?.vi).slice(0, 150) || servicesT("item_default_desc"),
          image: safeImage(service.image, fallbackImages[index]),
          href: `/services/${service.service_categories?.slug || "all"}/${service.id}`,
        };
      })
    : current.fallbackServices.map((service, index) => ({ id: `fallback-${index}`, ...service, image: fallbackImages[index], href: "/services" }));
  const landingNews = newsList;
  const lang = locale === "en" || locale === "th" ? locale : "vi";
  const faqs = [...current.faqs, ...shippingFaqs.map((faq) => ({ question: faq.question[lang], answer: faq.answer[lang], source: faq.source, url: faq.url }))];

  return (
    <div id="top" className={styles.home}>
      <HomeMotion />
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.dot} />{design.eyebrow}</p>
            <h1 id="home-title" className={styles.heroTitle}>
              <span>{design.headline}</span>
              <span>{design.headlineMiddle}</span>
              <em>{design.headlineAccent}</em>
            </h1>
            <p className={styles.heroDescription}>{design.intro}</p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.primaryButton}>{current.primaryCta}<ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a href="#services" className={styles.textLink}>{design.explore}<ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <div className={styles.heroTrust}>
              <span className={styles.trustIcon}><ShieldCheck size={22} strokeWidth={1.5} aria-hidden="true" /></span>
              <div><strong>{design.assurance}</strong><p>{design.assuranceDetail}</p></div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.orbit} aria-hidden="true" />
            <div className={styles.heroPhoto}>
              <Image src="/images/services/cross-border-premium.png" alt={design.imageAlt} fill preload sizes="(max-width: 760px) 94vw, (max-width: 1100px) 48vw, 620px" className={styles.coverImage} />
              <div className={styles.photoShade} />
              <span className={styles.photoLabel}><Globe2 size={14} aria-hidden="true" />{design.imageCaption}</span>
              <span className={styles.photoNumber} aria-hidden="true">VN · LA · TH</span>
            </div>
            <div className={styles.experienceSeal}>
              <Globe2 size={25} strokeWidth={1.2} aria-hidden="true" />
              <strong>EWEC</strong>
              <span>CONNECTED<br />WITH CARE</span>
            </div>
            <div className={styles.gateCard}>
              <div className={styles.gateImage}><Image src="/images/hero/hero-1.png" alt={design.gateAlt} fill sizes="220px" className={styles.coverImage} /></div>
              <p><MapPin size={13} aria-hidden="true" />Lao Bao, Vietnam<ArrowUpRight size={13} aria-hidden="true" /></p>
            </div>
            <div className={styles.imageNote}><span />{design.since}</div>
          </div>
        </div>
        <div className={`${styles.container} ${styles.heroBaseline}`}>
          <span>LOCAL EXPERTISE. REGIONAL CONNECTIONS.</span>
          <a href="#our-story">{design.scroll}<ArrowDown size={14} aria-hidden="true" /></a>
        </div>
      </section>

      <section className={styles.trackingStrip} aria-labelledby="tracking-heading">
        <div className={`${styles.container} ${styles.trackingInner}`}>
          <div className={styles.trackingIntro}><span className={styles.trackingIcon}><PackageCheck size={24} strokeWidth={1.5} aria-hidden="true" /></span><div><h2 id="tracking-heading">{design.trackingTitle}</h2><p>{design.trackingHint}</p></div></div>
          <form action={`/${locale}/tracking`} method="get" className={styles.trackingForm}>
            <Search size={18} aria-hidden="true" />
            <label htmlFor="home-tracking" className="sr-only">{design.trackingLabel}</label>
            <input id="home-tracking" name="code" placeholder={design.trackingPlaceholder} required maxLength={80} autoComplete="off" />
            <button type="submit">{design.trackingButton}<ArrowUpRight size={18} aria-hidden="true" /></button>
          </form>
        </div>
      </section>

      <section id="our-story" className={`${styles.container} ${styles.story}`}>
        <div className="home-reveal">
          <p className={styles.eyebrow}><span className={styles.sectionNumber}>01 /</span>{design.storyEyebrow}</p>
          <h2 className={styles.sectionTitle}>{design.storyTitle}<br /><em>{design.storyAccent}</em></h2>
          <Link href="/about" className={styles.textLink}>{design.about}<ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className={`${styles.storyContent} home-reveal`}>
          <p>{design.storyBody}</p>
          <div className={styles.stats}>{current.stats.slice(0, 3).map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
        </div>
      </section>

      <section id="services" className={styles.services}>
        <div className={styles.container}>
          <div className={`${styles.sectionHeading} home-reveal`}>
            <div><p className={styles.eyebrow}><span className={styles.sectionNumber}>02 /</span>{current.servicesEyebrow}</p><h2 className={styles.sectionTitle}>{design.servicesTitle}<br /><em>{design.servicesAccent}</em></h2></div>
            <div className={styles.headingAside}><p>{design.servicesBody}</p><Link href="/services" className={styles.textLink}>{current.allServices}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          </div>
          <div className={`${styles.serviceGrid} home-stagger`}>
            {landingServices.map((service, index) => (
              <Link href={service.href} key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceImage}><Image src={service.image} alt={service.title} fill sizes="(max-width: 760px) 94vw, 33vw" className={styles.coverImage} /><span className={styles.serviceNumber}>0{index + 1}</span><span className={styles.imageArrow}><ArrowUpRight size={21} aria-hidden="true" /></span></div>
                <div className={styles.serviceContent}><p className={styles.eyebrow}>{service.category}</p><h3>{service.title}</h3><p className={styles.serviceDescription}>{service.description}</p><span className={styles.serviceLink}>{design.detail}<ArrowRight size={16} aria-hidden="true" /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ShipmentTools locale={locale} />

      <section className={styles.network}>
        <div className={`${styles.container} ${styles.networkInner}`}>
          <div className={`${styles.networkCopy} home-reveal`}>
            <p className={styles.eyebrow}><span className={styles.sectionNumber}>03 /</span>{current.routesEyebrow}</p>
            <h2 className={styles.sectionTitle}>{design.networkTitle}<br /><em>{design.networkAccent}</em></h2>
            <p className={styles.networkDescription}>{design.networkBody}</p>
            <div className={styles.countryList}>{design.countries.map((country, index) => <span key={country}><span className={styles.dot} />{country}{index < 2 && <i />}</span>)}</div>
            <Link href="/branches" className={styles.lightButton}>{design.networkCta}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className={`${styles.routeVisual} home-reveal`}><RouteIllustration locale={locale} /></div>
        </div>
        <div className={`${styles.container} ${styles.networkBaseline}`}><span>{design.networkTag}</span><span>16°37′ N · 106°35′ E</span></div>
      </section>

      <section className={`${styles.container} ${styles.process}`}>
        <div className={`${styles.sectionHeading} home-reveal`}><div><p className={styles.eyebrow}><span className={styles.sectionNumber}>04 /</span>{current.processEyebrow}</p><h2 className={styles.sectionTitle}>{design.processTitle}<br /><em>{design.processAccent}</em></h2></div><p className={styles.headingAside}>{current.processBody}</p></div>
        <ol className={`${styles.processGrid} home-stagger`}>{current.processSteps.map((step, index) => { const Icon = processIcons[index]; return <li key={step.title}><div className={styles.processTop}><span>0{index + 1}</span><Icon size={26} strokeWidth={1.3} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.description}</p></li>; })}</ol>
        <details className={styles.documentDetails}><summary><FileCheck2 size={18} aria-hidden="true" />{design.documents}<span aria-hidden="true">+</span></summary><div className={styles.documents}>{current.documents.map((document) => <div key={document.title}><Check size={16} aria-hidden="true" /><p><strong>{document.title}</strong><span>{document.meta}</span></p></div>)}</div><p className={styles.documentNote}>{current.documentsBody}</p></details>
      </section>

      {landingNews.length > 0 && <section className={styles.news}>
        <div className={styles.container}>
          <div className={`${styles.sectionHeading} home-reveal`}><div><p className={styles.eyebrow}><span className={styles.sectionNumber}>05 /</span>{current.newsEyebrow}</p><h2 className={styles.sectionTitle}>{design.newsTitle} <em>{design.newsAccent}</em></h2></div><Link href="/news" className={styles.textLink}>{design.allNews}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          <div className={`${styles.newsGrid} home-stagger`}>{landingNews.slice(0, 3).map((news) => { const title = news.title?.[locale] || news.title?.vi; const category = news.news_categories?.name?.[locale] || news.news_categories?.name?.vi || "VILA News"; return <Link href={`/news/${news.slug || news.id}`} key={news.id} className={styles.newsCard}><div className={styles.newsImage}><Image src={safeImage(news.image, "/images/news/regulation.png")} alt={title} fill sizes="(max-width: 760px) 94vw, 33vw" className={styles.coverImage} /><span className={styles.imageArrow}><ArrowUpRight size={20} aria-hidden="true" /></span></div><div className={styles.newsMeta}><span>{category}</span><span>{new Date(news.date || news.created_at).toLocaleDateString(locale === "vi" ? "vi-VN" : locale === "th" ? "th-TH" : "en-GB", {day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC"})}</span></div><h3>{title}</h3><span className={styles.serviceLink}>{current.readMore}<ArrowRight size={16} aria-hidden="true" /></span></Link>; })}</div>
        </div>
      </section>}

      <KnowledgeHub locale={locale} />

      <section className={`${styles.container} ${styles.faq}`}>
        <div className="home-reveal"><p className={styles.eyebrow}>{current.faqEyebrow}</p><h2 className={styles.sectionTitle}>{current.faqTitle}</h2><p className={styles.faqIntro}>{current.ctaBody}</p><Link href="/contact" className={styles.textLink}>{current.ctaButton}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        <div className={styles.faqList}>{faqs.map((faq, index) => <details key={faq.question}><summary><span className={styles.faqNumber}>0{index + 1}</span><span>{faq.question}</span><span className={styles.faqPlus} aria-hidden="true">+</span></summary><p>{faq.answer}{"url" in faq && faq.url && <a href={faq.url} target="_blank" rel="noopener noreferrer" className={styles.faqSource}>{faq.source}<ArrowUpRight size={12} aria-hidden="true" /></a>}</p></details>)}</div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContour} aria-hidden="true" />
        <div className={`${styles.container} ${styles.ctaInner} home-reveal`}><p className={styles.eyebrow}>{design.ctaEyebrow}</p><h2>{design.ctaTitle}<br /><em>{design.ctaAccent}</em></h2><p className={styles.ctaBody}>{design.ctaBody}</p><div className={styles.ctaActions}><Link href="/contact" className={styles.primaryButton}>{current.primaryCta}<ArrowUpRight size={18} aria-hidden="true" /></Link><a href={`tel:${COMPANY_INFO.hotline}`} className={styles.phoneLink}><Phone size={17} aria-hidden="true" />{COMPANY_INFO.hotline.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}</a></div></div>
      </section>
    </div>
  );
}
