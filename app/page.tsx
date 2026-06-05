import { HeroHome } from "@/components/ui/hero-home";
import { AboutSection2 } from "@/components/ui/about-section-2";
import { StrengthsSection } from "@/components/ui/strengths-section";
import { ReviewsSection } from "@/components/ui/reviews-section";
import { ProductsSection } from "@/components/ui/products-section";
import { FaqSection } from "@/components/ui/faq-section";

export default function Page() {
  return (
    <>
      <HeroHome />
      <AboutSection2 locale="nl" />
      <StrengthsSection />
      <ReviewsSection />
      <ProductsSection />
      <FaqSection />
    </>
  );
}
