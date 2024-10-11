import React from "react";
import testimonials from "@/data/testimonials.json";

const TestimonialsSection = () => (
  <section className="px-5 w-full">
    <h2 className="text-3xl text-center font-bold mb-8 text-gray-800 dark:text-gray-100">
      What Our Users Say
    </h2>
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {testimonials.map(({ id, name, position, company, feedback, avatar }) => (
        <div key={id} className="flex items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-gray-600 transition-transform hover:scale-105">
          <img src={avatar} alt={name} className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-blue-500 dark:border-blue-400" />
          <div>
            <p className="text-gray-700 dark:text-gray-300 italic text-lg">
              {feedback}
            </p>
            <p className="mt-2 font-semibold text-gray-900 dark:text-gray-100">
              {name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {position} at {company}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
