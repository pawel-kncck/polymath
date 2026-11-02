import { notFound } from "next/navigation";
import { GeographyExperience } from "@/features/geography/GeographyExperience";
import { MISSIONS } from "@/features/geography/content";

export default function GeographyPreviewPage() {
  // No authentication bypass is ever enabled in a production build.
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <GeographyExperience
      preview
      userId="local-preview"
      allowed={MISSIONS.map((m) => m.id)}
    />
  );
}
