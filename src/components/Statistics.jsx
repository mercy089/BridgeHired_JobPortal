import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after visibility
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center py-10 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 bg-gradient-to-r from-blue-100 to-purple-100 relative overflow-hidden"
    >
      <h2 className="text-3xl text-center font-bold mb-6 ">Our Impact</h2>
      <div className="flex flex-col sm:flex-row justify-around items-center gap-8">
        {/* Statistic Card 1 */}
        <div className="flex flex-col items-center bg-white dark:bg-slate-600 p-6 rounded-lg shadow-lg dark:shadow-lg hover:shadow-gray-600 dark:hover:shadow-slate-300 transition-transform transform hover:scale-105 hover:shadow-2xl z-10">
          <span className="text-5xl font-bold text-blue-500">
            {isVisible ? (
              <CountUp start={0} end={10000} duration={2.5} separator="," />
            ) : (
              '0'
            )}
            +
          </span>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Jobs Listed</p>
        </div>
        {/* Statistic Card 2 */}
        <div className="flex flex-col items-center bg-white dark:bg-slate-600 p-6 rounded-lg shadow-lg dark:shadow-lg hover:shadow-gray-600 dark:hover:shadow-slate-300 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <span className="text-5xl font-bold text-green-500">
            {isVisible ? (
              <CountUp start={0} end={5000} duration={2.5} separator="," />
            ) : (
              '0'
            )}
            +
          </span>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Active Users</p>
        </div>
        {/* Statistic Card 3 */}
        <div className="flex flex-col items-center bg-white dark:bg-slate-600 p-6 rounded-lg shadow-lg dark:shadow-lg hover:shadow-gray-600 dark:hover:shadow-slate-300 transition-transform transform hover:scale-105 hover:shadow-2xl z-10">
          <span className="text-5xl font-bold text-purple-500">
            {isVisible ? (
              <CountUp start={0} end={500} duration={2.5} separator="," />
            ) : (
              '0'
            )}
            +
          </span>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Companies Partnered</p>
        </div>
      </div>
      {/* Background Circles for Visual Interest */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-800 rounded-full opacity-20 -translate-x-1/3 -translate-y-1/3 "></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-800 rounded-full opacity-20 translate-x-1/3 translate-y-1/3 "></div>
    </section>
  );
};

export default Statistics;
