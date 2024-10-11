import React, { useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const OnboardingPage = () => {
  const { theme } = useTheme();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.error("Error updating user role", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  });

  if (!isLoaded) {
    return (
      <div>
        <p className="text-lg mb-4">Loading your profile...</p>
        <BarLoader width={"100%"} color={theme === "dark" ? "#fff" : "#000"} />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full h-[calc(100vh-11rem)] items-center justify-center px-10 sm:px-0">
      {/* Personalized Greeting */}
      <h2 className="lobster-two-regular text-4xl sm:text-5xl md:text-7xl font-semibold tracking-wider text-center flex flex-col gap-4">
        Welcome,{" "}
        <span className="lobster-regular tracking-widest">
          {user.firstName}
          {user.lastName}!
        </span>{" "}
        <span>Who are you?</span>
      </h2>

      {/* Role Selection Buttons */}
      <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full md:w-2/3 lg:w-1/2 px-4 sm:px-0">
        {/* Candidate Button */}
        <div className="text-center">
          <Button
            variant="blue"
            className="h-28 w-64 sm:w-full sm:h-36 text-xl sm:text-3xl"
            onClick={() => handleRoleSelection("candidate")}
          >
            Candidate
          </Button>
          <p className="mt-4 text-base text-gray-600">
            Browse jobs and find your next career opportunity.
          </p>
        </div>

        {/* Recruiter Button */}
        <div className="text-center">
          <Button
            variant="destructive"
            className="h-28 w-64 sm:w-full sm:h-36 text-xl sm:text-3xl"
            onClick={() => handleRoleSelection("recruiter")}
          >
            Recruiter
          </Button>
          <p className="mt-4 text-base text-gray-600">
            Post job listings and discover top talent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
