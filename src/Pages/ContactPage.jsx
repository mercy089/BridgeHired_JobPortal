import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

// Zod schema for form validation
const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // Handle form submission logic here (e.g., send data to an API)
  };

  return (
    <div className="container mx-auto py-5 flex flex-col lg:flex-row gap-10 dark:text-white">
      {/* Left Side: Contact Information */}
      <Card className="flex-1 shadow-lg dark:bg-gray-800 dark:bg-opacity-60 bg-white bg-opacity-60">
        <CardHeader>
          <h1 className="text-5xl font-bold mb-4">Get in Touch with BridgeHired</h1>
          <p className="mt-2">
            We&apos;re here to simplify your hiring process! Whether you have questions, feedback, or need support, please reach out to us.
          </p>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl font-semibold mt-4">Contact Channels</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <span className="font-bold">Email:</span>
              <a href="mailto:support@bridgeHired.com" className="text-blue-500 hover:underline"> support@bridgeHired.com</a>
            </li>
            <li>
              <span className="font-bold">Phone:</span>
              <a href="tel:+1234567890" className="text-blue-500 hover:underline"> +1 (234) 567-890</a>
            </li>
            <li>
              <span className="font-bold">Office Hours:</span> Mon-Fri, 9 AM - 6 PM
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mt-4">Follow Us</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="https://facebook.com" className="text-blue-500 hover:underline">Facebook</a>
            </li>
            <li>
              <a href="https://twitter.com" className="text-blue-500 hover:underline">Twitter</a>
            </li>
            <li>
              <a href="https://linkedin.com" className="text-blue-500 hover:underline">LinkedIn</a>
            </li>
            <li>
              <a href="https://instagram.com" className="text-blue-500 hover:underline">Instagram</a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Right Side: Contact Form */}
      <Card className="flex-1 shadow-lg dark:bg-gray-800 dark:bg-opacity-60 bg-white bg-opacity-60">
        <CardHeader>
          <h2 className="text-3xl font-semibold mb-4">Send Us a Message</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            If you prefer, you can fill out the form below, and we will get back to you as soon as possible.
          </p>
        </CardHeader>
        <CardContent>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label className="block text-gray-600 dark:text-gray-300" htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                className={`mt-1 block w-full border dark:text-black ${errors.name ? "border-red-500" : "border-gray-600 dark:bg-gray-800 dark:bg-opacity-60"}`}
                placeholder="Your Name"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <Label className="block text-gray-600 dark:text-gray-300" htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                {...register("email")}
                className={`mt-1 block w-full border dark:text-black ${errors.email ? "border-red-500" : "border-gray-600 dark:bg-gray-800 dark:bg-opacity-60"}`}
                placeholder="Your Email"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <Label className="block text-gray-600 dark:text-gray-300" htmlFor="message">Message</Label>
              <Textarea
                id="message"
                {...register("message")}
                rows="4"
                className={`mt-1 block w-full border dark:text-black ${errors.message ? "border-red-500" : "border-gray-600 dark:bg-gray-800 dark:bg-opacity-60"}`}
                placeholder="Your Message"
              />
              {errors.message && <p className="text-red-500">{errors.message.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md shadow-md hover:bg-green-700 transition duration-300">
              Send Message
            </Button>
          </form>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            We value your input and strive to respond to all inquiries within 24-48 hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
