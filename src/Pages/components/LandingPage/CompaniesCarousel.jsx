import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "@/data/companies.json";
import { useTheme } from "@/components/theme-provider";

const CompaniesCarousel = () => {
  const { theme } = useTheme();

  return (
    <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full overflow-hidden">
      <CarouselContent className="flex gap-5 sm:gap-10 items-center justify-start">
        {companies.map(({ name, id, path, darkPath }) => (
          <CarouselItem key={id} className="flex-shrink-0 flex items-center justify-center basis-1/3 lg:basis-1/6">
            <img
              src={theme === "dark" ? darkPath : path}
              alt={name}
              className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CompaniesCarousel;
