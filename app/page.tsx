import { HomeCategories } from "@/components/marketing/home-categories";
import { HomeEmployerBenefits } from "@/components/marketing/home-employer-benefits";
import { HomeFeaturedProfiles } from "@/components/marketing/home-featured-profiles";
import { HomeFooter } from "@/components/marketing/home-footer";
import { HomeHeader } from "@/components/marketing/home-header";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomeHowItWorks } from "@/components/marketing/home-how-it-works";
import { HomePricing } from "@/components/marketing/home-pricing";
import { HomePrivacy } from "@/components/marketing/home-privacy";
import { HomeTestimonials } from "@/components/marketing/home-testimonials";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <HomeHeader />
      <HomeHero />
      <HomeHowItWorks />
      <HomeCategories />
      <HomePrivacy />
      <HomeFeaturedProfiles />
      <HomeEmployerBenefits />
      <HomeTestimonials />
      <HomePricing />
      <HomeFooter />
    </main>
  );
}
