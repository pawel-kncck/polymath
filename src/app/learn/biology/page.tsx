import { requireAuth } from "@/lib/auth-utils";
import { getCurrentUserModuleAccess, isModuleAccessible } from "@/lib/access";
import { getUserResults } from "@/actions/results";
import { MISSIONS } from "@/features/biology/content";
import { BiologyExperience } from "@/features/biology/BiologyExperience";
import {
  recordAttempt,
  type ExpeditionProgress,
} from "@/features/biology/model";
import { AppShell } from "@/components/shell/AppShell";

export default async function BiologyPage({
  searchParams,
}: {
  searchParams: Promise<{ mission?: string; mode?: string }>;
}) {
  const session = await requireAuth();
  const access = await getCurrentUserModuleAccess();
  const allowed = MISSIONS.filter((m) => isModuleAccessible(access, m.id)).map(
    (m) => m.id,
  );
  const results = await getUserResults();
  const progress = results.reduce<ExpeditionProgress>((acc, r) => {
    const mission = MISSIONS.find((m) => m.id === r.moduleId);
    return mission ? recordAttempt(acc, mission.id, r.score) : acc;
  }, {});
  const params = await searchParams;
  return (
    <AppShell currentCategory="BIOLOGY">
      <BiologyExperience
        userId={session.user.id}
        allowed={allowed}
        initialProgress={progress}
        initialMission={params.mission}
        initialMode={params.mode}
      />
    </AppShell>
  );
}
