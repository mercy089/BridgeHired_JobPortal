import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.jsx"; // Import your ThemeProvider
import AppLayout from "./Layouts/AppLayout.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import OnboardingPage from "./Pages/OnboardingPage.jsx";
import JobListingPage from "./Pages/JobListingPage.jsx";
import JobDetailsPage from "./Pages/JobDetailsPage.jsx";
import JobSavedPage from "./Pages/JobSavedPage.jsx";
import MyJobsPage from "./Pages/MyJobsPage.jsx";
import JobPostingPage from "./Pages/JobPostingPage.jsx";
import Error404Page from "./Pages/Error404Page.jsx";
import BlogPage from "./Pages/BlogPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <AppLayout />, // AppLayout wraps child components
    children: [
      {
        index: true, // Landing page at the root
        element: <LandingPage />,
      },
      {
        path: "onboarding", // /onboarding
        element: (
          <ProtectedRoutes>
            <OnboardingPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "post-job", // /post-job
        element: (
          <ProtectedRoutes>
            <JobPostingPage />
          </ProtectedRoutes>
        )
      },
      {
        path: "jobs", // /jobs
        element: (
          <ProtectedRoutes>
            <JobListingPage />
          </ProtectedRoutes>
        )
      },
      {
        path: "jobs/:id", // /jobs/:id - dynamic routing for job details
        element: (
          <ProtectedRoutes>
            <JobDetailsPage />
          </ProtectedRoutes>
        )
      },
      {
        path: "job-saved", // /job-saved
        element: (
          <ProtectedRoutes>
            <JobSavedPage />
          </ProtectedRoutes>
        )
      },
      {
        path: "my-jobs", // /my-jobs
        element: (
          <ProtectedRoutes>
            <MyJobsPage />
          </ProtectedRoutes>
        )
      },
      {
        path: "blogs", // /blogs
        element: <BlogPage />,
      },
      {
        path: "about", // /about
        element: <AboutPage />,
      },
      {
        path: "contact", // /contact
        element: <ContactPage />,
      },
      {
        path: "privacy", // /privacy
        element: <PrivacyPolicyPage />,
      },
    ],
  },
  {
    path: "*", // Wildcard route for 404 errors
    element: <Error404Page />,
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Wrap the entire app with ThemeProvider */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
