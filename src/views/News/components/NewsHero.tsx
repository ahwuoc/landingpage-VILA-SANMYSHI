import PageHero from "@/components/PageHero";
import { useTranslations } from "next-intl";

export default function NewsHero() {
  const t = useTranslations("NewsPage");
  return (
    <PageHero
      image="/images/news/hero.png"
      imageAlt={t('page_title')}
      overlay="bg-black/20"
      breadcrumb={[{ label: t('page_title') }]}
      tag={t('hero_tag')}
      title={<span dangerouslySetInnerHTML={{ __html: t.raw('hero_title') }} />}
      description={t('hero_desc')}
    />
  );
}
