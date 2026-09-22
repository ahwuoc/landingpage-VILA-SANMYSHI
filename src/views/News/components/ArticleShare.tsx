'use client';

import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { newsCopy, newsLanguage } from '../newsPresentation';
import styles from '../News.module.css';

export default function ArticleShare({ title, url }: { title: string; url: string }) {
  const t = useTranslations('NewsDetail');
  const copy = newsCopy[newsLanguage(useLocale())];
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
    } catch { setStatus('error'); }
  }

  return <div className={styles.share}><span>{copy.share}</span><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label={t('share_fb')}>f</a><a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`} aria-label={t('share_email')}><Mail size={17} aria-hidden="true" /></a><button type="button" onClick={copyLink} aria-label={status === 'copied' ? t('copied') : t('share_copy')}>{status === 'copied' ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}</button>{status !== 'idle' && <p role="status">{status === 'copied' ? t('copied') : copy.shareError}</p>}</div>;
}
