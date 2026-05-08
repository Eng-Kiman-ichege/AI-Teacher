import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { CourseShowcase } from "@/components/course-showcase";
import { Testimonials } from "@/components/testimonials";
import { PricingFAQ } from "@/components/pricing-faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <CourseShowcase />
        <Testimonials />
        <PricingFAQ />
      </main>
      <Footer />
    </div>
  );
}
