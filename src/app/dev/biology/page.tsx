import { notFound } from "next/navigation";
import { BiologyExperience } from "@/features/biology/BiologyExperience";
import { MISSIONS } from "@/features/biology/content";

export default function BiologyPreviewPage() {
  // No authentication bypass is ever enabled in a production build.
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <BiologyExperience
      preview
      userId="local-preview"
      allowed={MISSIONS.map((m) => m.id)}
    />
  );
}
