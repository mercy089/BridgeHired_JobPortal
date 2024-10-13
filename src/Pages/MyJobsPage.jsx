import CreatedApplications from "@/components/CreatedApplications";
import CreatedJobs from "@/components/CreatedJobs";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { useTheme } from "@/components/theme-provider";
const MyJobsPage = () => {
  const { theme } = useTheme();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div>
        <p className="text-lg mb-4">Loading your jobs...</p>
        <BarLoader width={"100%"} color={theme === "dark" ? "#fff" : "#000"} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-5">
      <h1 className="lobster-regular font-extrabold text-5xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};


export default MyJobsPage
