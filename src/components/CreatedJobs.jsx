import { getMyJobs } from "@/Api/ApiJobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobsCard from "./JobsCard";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Pagination } from "@/components/ui/pagination"; // Assuming you have a Pagination component

const CreatedJobs = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  const itemsPerPage = 4; // Number of jobs per page
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = createdJobs?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loadingCreatedJobs ? (
        <div>
          <p className="text-lg mb-4">Loading your posted jobs...</p>
          <BarLoader width={"100%"} color={theme === "dark" ? "#fff" : "#000"} />
        </div>
      ) : (
        <div>
          {createdJobs?.length ? (
            <div>
              {/* Jobs List */}
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {paginatedJobs.map((job) => {
                  return (
                    <JobsCard
                      key={job.id}
                      job={job}
                      savedInitial={job?.saved?.length > 0}
                      onJobSaved={fnCreatedJobs}
                      isMyJobs
                    />
                  );
                })}
              </div>

              {/* Pagination Component */}
              {createdJobs.length > itemsPerPage && (
                <div className="mt-8">
                  <Pagination
                    totalItems={createdJobs.length}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
