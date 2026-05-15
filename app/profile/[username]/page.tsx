import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { RightRail } from "@/components/feed/right-rail";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { users } from "@/lib/data";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = users.find((u) => u.username === username);
  if (!user) notFound();

  return (
    <AppShell right={<RightRail />}>
      <ProfileHeader user={user} />
      <ProfileTabs user={user} />
    </AppShell>
  );
}
