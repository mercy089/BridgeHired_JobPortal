import { getMyJobs } from "@/Api/ApiJobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobsCard from "./JobsCard";
import { useEffect } from "react";
import { useTheme } from "./theme-provider";

const CreatedJobs = () => {
    const { theme } = useTheme();
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fetchFunction: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loadingCreatedJobs ? (
        (
            <div>
              <p className="text-lg mb-4">Loading your Post jobs...</p>
              <BarLoader width={"100%"} color={theme === "dark" ? "#fff" : "#000"} />
            </div>
          )
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length ? (
            createdJobs.map((job) => {
              return (
                <JobsCard
                  key={job.id}
                  job={job}
                  savedInitial={job?.saved?.length > 0}
                  onJobSaved={fnCreatedJobs}
                  isMyJob
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;