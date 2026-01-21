"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { locales, languageNames, type Locale } from "@/i18n/config";

export function SettingsForm() {
  const t = useTranslations("settings");
  const tCommon = useTranslations("common");
  const currentLocale = useLocale() as Locale;
  const [selectedLocale, setSelectedLocale] = useState<Locale>(currentLocale);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = async () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/user/language", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ language: selectedLocale }),
        });

        if (response.ok) {
          window.location.href = "/";
        } else {
          setMessage(tCommon("error"));
        }
      } catch {
        setMessage(tCommon("error"));
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#222222]">
          {t("language.title")}
        </h2>
        <p className="mt-1 text-sm text-[#717171]">{t("language.description")}</p>
        <div className="mt-4">
          <select
            value={selectedLocale}
            onChange={(e) => setSelectedLocale(e.target.value as Locale)}
            className="block w-full rounded-lg border border-[#DDDDDD] bg-white px-4 py-3 text-[#222222] shadow-sm focus:border-[#222222] focus:outline-none focus:ring-1 focus:ring-[#222222]"
            disabled={isPending}
          >
            {locales.map((locale) => (
              <option key={locale} value={locale}>
                {languageNames[locale]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <p className="text-sm text-[#008A05]">{message}</p>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending || selectedLocale === currentLocale}
          className="rounded-lg bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] px-6 py-3 text-sm font-semibold text-white hover:from-[#D70466] hover:via-[#BD1E59] hover:to-[#BD1E59] focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? tCommon("loading") : tCommon("save")}
        </button>
      </div>
    </div>
  );
}
