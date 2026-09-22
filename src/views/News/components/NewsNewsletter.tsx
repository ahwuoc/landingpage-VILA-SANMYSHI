'use client';

import { useId, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLocale, useTranslations } from 'next-intl';
import { newsCopy, newsLanguage } from '../newsPresentation';
import styles from '../News.module.css';

export default function NewsNewsletter() {
  const t = useTranslations('NewsPage.newsletter');
  const copy = newsCopy[newsLanguage(useLocale())];
  const id = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || status === 'loading') return;
    setStatus('loading');
    setMessage('');
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert([{ email: email.trim().toLowerCase(), source: 'News Page' }]);
      if (error) {
        setStatus('error');
        setMessage(t(error.code === '23505' ? 'already_subscribed' : 'error_msg'));
      } else {
        setStatus('success');
        setMessage(t('success_msg'));
        setEmail('');
      }
    } catch {
      setStatus('error');
      setMessage(t('error_msg'));
    }
  }

  return (
    <section className={styles.newsletter} aria-labelledby={`${id}-title`}>
      <div className={`${styles.container} ${styles.newsletterInner}`}>
        <div><p className={styles.eyebrow}>{copy.newsletterLabel}</p><h2 id={`${id}-title`}>{copy.newsletterTitle}<br /><em>{copy.newsletterAccent}</em></h2></div>
        <div><p className={styles.newsletterDescription}>{copy.newsletterBody}</p>{status === 'success' ? <div className={styles.status} role="status"><CheckCircle2 size={27} aria-hidden="true" /><p>{message}</p></div> : <><form onSubmit={handleSubscribe} className={styles.subscribeForm} aria-busy={status === 'loading'}><label htmlFor={`${id}-email`} className="sr-only">{t('placeholder')}</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t('placeholder')} disabled={status === 'loading'} aria-invalid={status === 'error'} aria-describedby={status === 'error' ? `${id}-error` : undefined} /><button type="submit" disabled={status === 'loading'}>{t(status === 'loading' ? 'btn_loading' : 'btn_submit')}<ArrowUpRight size={17} aria-hidden="true" /></button></form>{status === 'error' && <p id={`${id}-error`} className={styles.error} role="alert">{message}</p>}</>}<p className={styles.privacy}>{copy.newsletterPrivacy}</p></div>
      </div>
    </section>
  );
}
