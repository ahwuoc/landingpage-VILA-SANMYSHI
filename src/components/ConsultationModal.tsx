"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, CheckCircle2, FileCheck2, Route, ShieldCheck, X } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./ConsultationModal.module.css";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export default function ConsultationModal({ isOpen, onClose, serviceName }: ConsultationModalProps) {
  // A fresh dialog also clears the form and submission state on every opening.
  return isOpen ? <ConsultationDialog key={serviceName} onClose={onClose} serviceName={serviceName} /> : null;
}

function ConsultationDialog({ onClose, serviceName }: Omit<ConsultationModalProps, "isOpen">) {
  const t = useTranslations("ConsultationModal");
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const requestRef = useRef<AbortController | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectedService = serviceName || t("campaign_service");

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    dialog?.showModal();
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      requestRef.current?.abort();
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (requestRef.current) return;

    setError(null);
    setIsLoading(true);
    const controller = new AbortController();
    requestRef.current = controller;
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: "",
          service: selectedService,
          message: form.get("message"),
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || t("error_msg"));
      }

      if (controller.signal.aborted) return;
      setIsSubmitted(true);
      closeButtonRef.current?.focus();
      closeTimerRef.current = setTimeout(() => onCloseRef.current(), 3000);
    } catch (submitError) {
      if (!controller.signal.aborted) {
        setError(submitError instanceof Error ? submitError.message : t("error_msg"));
      }
    } finally {
      if (!controller.signal.aborted) {
        requestRef.current = null;
        setIsLoading(false);
      }
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.content}>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className={styles.close}
          aria-label={t("close_label")}
        >
          <X size={19} aria-hidden="true" />
        </button>

        {isSubmitted ? (
          <div className={styles.success} role="status">
            <span className={styles.successIcon}><CheckCircle2 size={34} aria-hidden="true" /></span>
            <p className={styles.eyebrow}>VILA SANMYSHI</p>
            <h2 id={titleId}>{t("success_title")}</h2>
            <p>{t("success_msg")}</p>
          </div>
        ) : (
          <div className={styles.layout}>
            <section className={styles.story}>
              <div className={styles.badge}>
                <FileCheck2 size={16} aria-hidden="true" />
                {t("campaign_badge")}
              </div>
              <h2 id={titleId}>{t("campaign_title")}</h2>
              <p className={styles.description}>{t("campaign_desc")}</p>

              <ul className={styles.benefits}>
                {Array.from({ length: 3 }, (_, index) => (
                  <li key={index}>
                    <Check size={16} aria-hidden="true" />
                    <span>{t(`campaign_benefits.${index}`)}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.route}>
                <div>
                  <span>LAO BẢO</span>
                  <Route size={15} aria-hidden="true" />
                  <span>SAVANNAKHET</span>
                  <Route size={15} aria-hidden="true" />
                  <span>MUKDAHAN</span>
                </div>
                <div className={styles.routeLine} aria-hidden="true"><i /><i /><i /></div>
              </div>

              <p className={styles.note}>
                <ShieldCheck size={17} aria-hidden="true" />
                <span>{t("campaign_note")}</span>
              </p>
            </section>

            <section className={styles.formPanel}>
              <p className={styles.eyebrow}>{t("form_label")}</p>
              <h3>{t("form_title")}</h3>
              <p className={styles.intro}>{t("form_intro")}</p>
              <div className={styles.service}>
                <FileCheck2 size={15} aria-hidden="true" />
                <span>{t("service_label")}: {selectedService}</span>
              </div>

              <form className={styles.form} onSubmit={handleSubmit} aria-busy={isLoading}>
                <div className={styles.fields}>
                  <label>
                    <span>{t("name_label")}</span>
                    <input required type="text" name="name" autoComplete="name" placeholder={t("name_placeholder")} />
                  </label>
                  <label>
                    <span>{t("phone_label")}</span>
                    <input required type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder={t("phone_placeholder")} />
                  </label>
                </div>
                <label>
                  <span>{t("message_label")}</span>
                  <textarea
                    rows={3}
                    name="message"
                    defaultValue={t("default_message", { service: selectedService })}
                    placeholder={t("message_placeholder")}
                  />
                </label>
                {error && <p className={styles.error} role="alert">{error}</p>}
                <button type="submit" disabled={isLoading} className={styles.submit}>
                  {isLoading ? t("btn_loading") : t("btn_submit")}
                  {!isLoading && <ArrowRight size={18} aria-hidden="true" />}
                </button>
                <p className={styles.privacy}>{t("privacy_note")}</p>
              </form>
            </section>
          </div>
        )}
      </div>
    </dialog>
  );
}
