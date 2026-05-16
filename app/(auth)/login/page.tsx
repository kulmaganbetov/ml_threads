import { AuthShell } from "@/components/auth/auth-shell";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthSide } from "@/components/auth/auth-side";

export default function Page() {
  return (
    <AuthShell
      title={"Welcome back."}
      subtitle="Pick up exactly where you left off — your feed, safer than ever."
      side={<AuthSide />}
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
