import React from "react";
import HeroSection from "./components/LandingPage/HeroSection.jsx";
import CallToActionButtons from "./components/LandingPage/CallToActionButtons.jsx";
import CompaniesCarousel from "./components/LandingPage/CompaniesCarousel.jsx";
import CompanyHighlightSection from "./components/LandingPage/CompanyHighlightSection.jsx";
import TestimonialsSection from "./components/LandingPage/TestimonialsSection.jsx";
import FAQSection from "./components/LandingPage/FAQSection.jsx";
import Statistics from "@/components/Statistics"; // Already existing

const LandingPage = () => {
  return (
    <main className="w-full flex-col flex justify-center gap-10 py-6">
      <HeroSection />
      <CallToActionButtons />
      <CompaniesCarousel />
      <CompanyHighlightSection />
      <Statistics />
      <TestimonialsSection />
      <FAQSection />
    </main>
  );
};

export default LandingPage;
