import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto py-5">
      <h1 className="text-4xl font-bold mb-4">About BrideHired</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300 ">
        Welcome to BrideHired, your go-to hiring portal! Our platform is
        designed to connect talented job seekers with forward-thinking
        employers. We understand that finding the right job or the perfect
        candidate can be challenging, and that&#39;s why we are here to simplify
        the hiring process for everyone involved.
      </p>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Our dedicated team comprises experts in recruitment and technology who
        are committed to providing a seamless experience for users. Whether
        you&#39;re a candidate aiming to find your dream job or a company
        looking to attract top talent, BrideHired is your partner in this
        journey towards success.
      </p>

      {/* Mission Statement Section */}
      <h2 className="text-3xl font-semibold mt-6">Our Mission</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        At BrideHired, our mission is to foster connections that facilitate
        career growth and talent acquisition. We strive to create an environment
        where candidates and employers can easily interact, making the hiring
        process not only efficient but also enjoyable.
      </p>

      {/* Our Values Section */}
      <h2 className="text-3xl font-semibold mt-6">Our Values</h2>
      <ul className="mt-2 list-disc list-inside">
        <li className="text-gray-600 dark:text-gray-300">
          <strong className="text-black dark:text-white">Integrity:</strong> We
          prioritize honesty and transparency, cultivating trust in our
          community.
        </li>
        <li className="text-gray-600 dark:text-gray-300">
          <strong className="text-black dark:text-white">Empowerment:</strong>{" "}
          We equip our users with the tools and insights needed for career
          advancement.
        </li>
        <li className="text-gray-600 dark:text-gray-300">
          <strong className="text-black dark:text-white">Innovation:</strong> We
          embrace new technologies to enhance our services and improve user
          experiences.
        </li>
        <li className="text-gray-600 dark:text-gray-300">
          <strong className="text-black dark:text-white">Collaboration:</strong>{" "}
          We believe that partnerships and teamwork lead to shared success.
        </li>
        <li className="text-gray-600 dark:text-gray-300">
          <strong className="text-black dark:text-white">Inclusivity:</strong>{" "}
          We are committed to creating an inclusive platform that values
          diversity and equal opportunity.
        </li>
      </ul>

      {/* Contact Section */}
      <h2 className="text-3xl font-semibold mt-6">Get in Touch</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        If you have questions or want to learn more about BrideHired, don’t
        hesitate to{" "}
        <a href="/contact" className="text-blue-400 hover:underline">
          contact us
        </a>
        . Our team is ready to assist you and provide all the information you
        need.
      </p>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Follow us on social media to stay updated with job opportunities, career
        tips, and the latest news from BrideHired!
      </p>
    </div>
  );
};

export default AboutPage;
