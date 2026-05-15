import { AuthShell } from "@/components/auth/auth-shell";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthSide } from "@/components/auth/auth-side";

export default function Page() {
  return (
    <AuthShell
      title={"Make a safer space."}
      subtitle="Create your account in 30 seconds. We'll never sell your data."
      side={<AuthSide />}
    >
      <AuthForm mode="register" />
    </AuthShell>
  );
}
