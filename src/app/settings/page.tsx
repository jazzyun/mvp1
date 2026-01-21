import { useTranslations } from "next-intl";
import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  const t = useTranslations("settings");

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="mb-8 text-2xl font-bold text-[#222222]">{t("title")}</h1>
        <div className="rounded-xl bg-[#F7F7F7] p-6">
          <SettingsForm />
        </div>
      </div>
    </div>
  );
}
