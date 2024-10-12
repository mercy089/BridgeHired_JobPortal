import { getSavedJobs } from "@/Api/ApiJobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { useTheme } from "@/components/theme-provider";
import JobsCard from "@/components/JobsCard";
import { Pagination } from "@/components/ui/pagination"; // Import custom Pagination

const JobSavedPage = () => {
  const { theme } = useTheme();
  const { isLoaded } = useUser();
  const itemsPerPage = 4; // Number of jobs per page
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fetchFunction: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = savedJobs?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!isLoaded || loadingSavedJobs) {
    return (
      <div>
        <p className="text-lg mb-4">Loading your saved jobs...</p>
        <BarLoader width={"100%"} color={theme === "dark" ? "#fff" : "#000"} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      {loadingSavedJobs === false && (
        <div className="mt-8 grid sm:grid-cols-2 px-5 gap-4">
          {paginatedJobs?.length ? (
            paginatedJobs.map((saved) => {
              return (
                <JobsCard
                  key={saved.id}
                  job={saved?.job}
                  onJobSaved={fnSavedJobs}
                  savedInitial={true}
                />
              );
            })
          ) : (
            <div>No Saved Jobs 👀</div>
          )}
        </div>
      )}

      {/* Pagination Component */}
      {!loadingSavedJobs && savedJobs?.length > itemsPerPage && (
        <div className="mt-8">
          <Pagination
            totalItems={savedJobs.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default JobSavedPage;
