import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto py-5">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and disclose your personal information when you use our
        services. We are committed to protecting your privacy and ensuring your
        personal information is handled responsibly.
      </p>

      <h2 className="text-2xl font-semibold mt-4">Information We Collect</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        We may collect the following types of information:
      </p>
      <ul className="mt-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
        <li>
          <strong>Personal Information:</strong> Information that you provide
          directly to us, such as your name, email address, phone number, and
          any other information you provide when creating an account or applying
          for jobs.
        </li>
        <li>
          <strong>Usage Data:</strong> Information about how you access and use
          our services, including your IP address, browser type, pages visited,
          and time spent on those pages.
        </li>
        <li>
          <strong>Cookies and Tracking Technologies:</strong> We use cookies and
          similar technologies to enhance your experience on our site and
          analyze usage patterns.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">
        How We Use Your Information
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        We use the information we collect to:
      </p>
      <ul className="mt-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
        <li>Provide and maintain our services</li>
        <li>Improve, personalize, and expand our services</li>
        <li>Communicate with you regarding your account and our services</li>
        <li>Process your transactions and send you confirmations</li>
        <li>
          Understand and analyze how you use our services to enhance user
          experience
        </li>
        <li>
          Send you newsletters, marketing or promotional materials, and other
          information that may be of interest to you, unless you have opted out
          of receiving such information.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Your Rights</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        You have the right to:
      </p>
      <ul className="mt-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
        <li>Access your personal information and request a copy of it.</li>
        <li>Correct any inaccuracies in your personal information.</li>
        <li>Request deletion of your personal information.</li>
        <li>
          Object to the processing of your personal information under certain
          circumstances.
        </li>
        <li>
          Request the restriction of processing your personal information.
        </li>
      </ul>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        For any questions about your rights or to exercise them, please contact
        us at{" "}
        <a href="mailto:support@example.com" className="text-blue-600">
          support@example.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-4">Data Security</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        We take reasonable steps to protect your personal information from
        unauthorized access, use, or disclosure. However, no method of
        transmission over the Internet or method of electronic storage is 100%
        secure. While we strive to use commercially acceptable means to protect
        your personal information, we cannot guarantee its absolute security.
      </p>

      <h2 className="text-2xl font-semibold mt-4">
        Changes to This Privacy Policy
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page and
        updating the &quot;effective date&quot; at the top. You are advised to
        review this Privacy Policy periodically for any changes.
      </p>

      <h2 className="text-2xl font-semibold mt-4">Contact Us</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        If you have any questions or concerns about this Privacy Policy or our
        privacy practices, please contact us at{" "}
        <a href="mailto:support@example.com" className="text-blue-600">
          support@example.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
