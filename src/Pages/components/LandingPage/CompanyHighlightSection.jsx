import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaBook, FaBriefcase, FaHandshake, FaUserGraduate } from "react-icons/fa";
import companyHighlightData from "@/data/companyHighlightData.json"; // Assuming this path is where the JSON file is located.

const iconMapping = {
  FaUserGraduate: FaUserGraduate,
  FaBriefcase: FaBriefcase,
  FaHandshake: FaHandshake,
  FaBook: FaBook,
};

const CompanyHighlightSection = () => (
  <section className="px-5 w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {companyHighlightData.map((item) => {
        const IconComponent = iconMapping[item.icon];
        return (
          <Card
            key={item.id}
            className={`hover:scale-105 ${item.bgColor} ${item.darkBgColor} shadow-md hover:shadow-gray-600 dark:hover:shadow-slate-300 flex flex-col items-center justify-center transition duration-300`}
          >
            <CardHeader className="flex flex-col items-center justify-center">
              <IconComponent className={`text-4xl ${item.iconColor} ${item.darkIconColor} mb-4 `} />
              <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-gray-100">
                {item.title}
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </section>
);

export default CompanyHighlightSection;
