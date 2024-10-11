import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import faqs from "@/data/faq.json";

const FAQSection = () => (
  <section className="px-10 sm:px-24 w-full">
    <h2 className="text-3xl text-center font-bold mb-6">
      Frequently Asked Questions
    </h2>
    <Accordion type="single" collapsible>
      {faqs.map(({ id, question, answer }) => (
        <AccordionItem key={id} value={`item-${id + 1}`}>
          <AccordionTrigger className="text-lg text-start lobster-two-regular-italic tracking-[0.07rem]">
            {question}
          </AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
          <hr className="border-gray-600 dark:border-gray-300"/>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default FAQSection;
