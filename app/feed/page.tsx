import { AppShell } from "@/components/layout/app-shell";
import { Feed } from "@/components/feed/feed";
import { RightRail } from "@/components/feed/right-rail";

export default function Page() {
  return (
    <AppShell right={<RightRail />}>
      <Feed />
    </AppShell>
  );
}
