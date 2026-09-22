import PageHero from '@/components/PageHero';
import { useLocale, useTranslations } from 'next-intl';
import { newsCopy, newsLanguage } from '../newsPresentation';

export default function NewsHero() {
  const t = useTranslations('NewsPage');
  const copy = newsCopy[newsLanguage(useLocale())];
  return <PageHero image="/images/editorial/container-port.jpg" imageAlt={copy.image} breadcrumb={[{ label: t('page_title') }]} tag={copy.tag} title={<>{copy.title}<br /><em>{copy.accent}</em></>} description={copy.intro} />;
}
