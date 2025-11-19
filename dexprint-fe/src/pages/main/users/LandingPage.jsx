import { ClientSection } from "../../../components/main/landingpage/Client";
import { ContactSection } from "../../../components/main/landingpage/Contact";
import { CTASection } from "../../../components/main/landingpage/CTA";
import { FAQSection } from "../../../components/main/landingpage/FAQ";
import { HeroSection } from "../../../components/main/landingpage/hero";
import { PortfolioPage } from "../../../components/main/landingpage/Portofolio";
import { ProductSection } from "../../../components/main/landingpage/Products";
import { ProfileSection } from "../../../components/main/landingpage/Profile";
import { ServiceSection } from "../../../components/main/landingpage/Services";
import { TestimonialSection } from "../../../components/main/landingpage/Testimonial";

export function LandingPage() {
  return (
    <>
      <section id="home" className="scroll-mt-20">
        <HeroSection />
      </section>

      <section id="layanan" className="scroll-mt-20 ">
        <ServiceSection />
      </section>

      <section id="profile" className="scroll-mt-20">
        <ProfileSection />
      </section>

      <section id="CTA" className="scroll-mt-20">
        <ClientSection />
      </section>

      <section id="produk" className="scroll-mt-20">
        <ProductSection />
      </section>

      <section id="portofolio" className="scroll-mt-20">
        <PortfolioPage />
      </section>

      <section id="CTA" className="scroll-mt-20">
        <CTASection />
      </section>
      <section id="testimonial" className="scroll-mt-20">
        <TestimonialSection />
      </section>
      <section id="faq" className="scroll-mt-20">
        <FAQSection />
      </section>
      <section id="kontak" className="scroll-mt-20">
        <ContactSection />
      </section>
    </>
  );
}
