import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { Features } from "@/components/landing/features";
import { ModerationExplainer } from "@/components/landing/moderation-explainer";
import { CTA } from "@/components/landing/cta";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingFooter } from "@/components/landing/footer";

export default function Page() {
  return (
    <main className="relative">
      <LandingNav />
      <Hero />
      <Stats />
      <section id="features">
        <Features />
      </section>
      <section id="how">
        <ModerationExplainer />
      </section>
      <CTA />
      <LandingFooter />
    </main>
  );
}
