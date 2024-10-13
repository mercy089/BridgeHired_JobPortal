import React from "react";

const HeroSection = () => (
  <section className="w-full  text-center px-10">
    <h1 className="lobster-regular flex flex-col items-center justify-center gradient-title text-4xl sm:text-6xl lg:text-8xl tracking-wider py-4">
      Bridge the Gap Between Talent{" "}
      <span className="flex items-end gap-2">
        and{" "}
        <span className=" first-letter:tracking-tighter first-letter:text-[2.625rem] first-letter:sm:text-[4.125rem] first-letter:lg:text-[7rem] ">
          Opportunity
        </span>
      </span>
    </h1>
    <p className="font-serif sm:mt-4 text-base sm:text-xl flex-col flex gap-1 text-center">
      At BridgeHired, we simplify and accelerate the hiring process by
      connecting top talent with the right employers.{" "}
      <span>
        Whether you&apos;re looking to land your dream job or seeking the best
        candidates for your company, our platform helps you navigate the job
        market with ease.
      </span>
    </p>
  </section>
);

export default HeroSection;
