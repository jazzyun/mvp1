import { useTranslations } from "next-intl";
import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  const t = useTranslations("settings");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">{t("title")}</h1>
        <div className="rounded-lg bg-white p-6 shadow">
          <SettingsForm />
        </div>
      </div>
    </div>
  );
}
