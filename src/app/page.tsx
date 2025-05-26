"use client"
import { useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Handle anchor links smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.hash && target.hash.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Update URL without page reload
          history.pushState(null, "", target.hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <PageLayout containerClass="w-full px-0">
      <Hero onDemoClick={scrollToDemo} />
      
      <div ref={demoRef}>
        <HowItWorks />
      </div>
      
      <BenefitsSection />
      
      <UseCases />
      
      <ContactForm />
    </PageLayout>
  );
};

export default Index;
