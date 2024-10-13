import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./ApplicationCard";
import { useEffect, useState } from "react";
import { getApplications } from "@/Api/ApiApplication";
import useFetch from "@/hooks/useFetch";
import { BarLoader } from "react-spinners";
import { useTheme } from "./theme-provider";
import { Pagination } from "@/components/ui/pagination"; // Assuming a Pagination component is available

const CreatedApplications = () => {
  const { theme } = useTheme();
  const { user } = useUser();

  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 4; // Number of applications per page

  const {
    loading: loadingApplications,
    data: applications,
    fetchFunction: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = applications?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loadingApplications) {
    return (
      <div>
        <p className="text-lg mb-4">Loading your applications...</p>
        <BarLoader width={"100%"} color={theme === "dark" ? "#fff" : "#000"} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {paginatedApplications?.length > 0 ? (
        <>
          {paginatedApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              isCandidate={true}
            />
          ))}

          {/* Pagination Component */}
          {applications.length > itemsPerPage && (
            <div className="mt-8">
              <Pagination
                totalItems={applications.length}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <p>No Applications Found 😢</p>
      )}
    </div>
  );
};

export default CreatedApplications;
