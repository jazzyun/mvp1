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
          // Redirect to home with new locale applied
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
        <h2 className="text-lg font-medium text-gray-900">
          {t("language.title")}
        </h2>
        <p className="mt-1 text-sm text-gray-500">{t("language.description")}</p>
        <div className="mt-4">
          <select
            value={selectedLocale}
            onChange={(e) => setSelectedLocale(e.target.value as Locale)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        <p className="text-sm text-green-600">{message}</p>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending || selectedLocale === currentLocale}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? tCommon("loading") : tCommon("save")}
        </button>
      </div>
    </div>
  );
}
