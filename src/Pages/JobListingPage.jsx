// Import necessary dependencies
import { getJobs } from "@/Api/ApiJobs";
import useFetch from "@/Hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { useTheme } from "@/components/theme-provider";
import JobsCard from "@/components/JobsCard.jsx";
import { Pagination } from "@/components/ui/pagination"; // Import custom Pagination
import { getCompanies } from "@/Api/ApiCompanies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JobListingPage = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 4; // Number of jobs per page
  const { isLoaded } = useUser();

  const { data: jobs, error: errorJobs, loading: loadingJobs, fetchFunction: fetchJobs } = useFetch(getJobs, { location, company_id, searchQuery });
  const { data: companies, fetchFunction: fetchCompanies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fetchJobs();
    if (isLoaded) fetchCompanies();
  }, [isLoaded]);

  useEffect(() => {
    // Refetch jobs when location, company_id, or searchQuery changes
    if (isLoaded) fetchJobs();
  }, [location, company_id, searchQuery]);

  // Extract unique locations
  const uniqueLocations = jobs ? [...new Set(jobs.map((job) => job.Location))] : [];

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = jobs?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    const searchQuery = formData.get("searchQuery");
    if (searchQuery) setSearchQuery(searchQuery);
  };

  const clearFilters = () => {
    setLocation("");
    setCompanyId("");
    setSearchQuery("");
  };

  if (!isLoaded) {
    return (
      <div>
        <p className="text-lg mb-4">Loading your jobs listing...</p>
        <BarLoader width={"100%"} color={theme === "dark" ? "#fff" : "#000"} />
      </div>
    );
  }

  return (
    <div className="px-10 py-5">
      <h1 className="text-6xl sm:text-7xl lg:text-8xl pb-5 text-center tracking-wider lobster-regular">
        Available Job Opportunities
      </h1>

      {/* Search Component */}
      <form onSubmit={handleSearch} className="h-12 flex items-center justify-center gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search Jobs by Title..."
          name="searchQuery"
          className="h-full flex-1 px-4 text-base"
        />
        <Button type="submit" className="h-full sm:w-24" variant="blue">
          Search
        </Button>
      </form>

      {/* Filter Component */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Filter by Location */}
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {uniqueLocations.length > 0 ? (
                uniqueLocations.map((loc, index) => (
                  <SelectItem key={index} value={loc}>
                    {loc}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No Locations Available</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Filter by Company */}
        <Select value={company_id} onValueChange={(value) => setCompanyId(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies && companies.length > 0 ? (
                companies.map((company, id) => (
                  <SelectItem key={id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No Companies Available</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="h-full sm:w-1/2" onClick={clearFilters} variant="destructive">
          Clear Filters
        </Button>
      </div>

      {/* Loading Spinner for Jobs */}
      {loadingJobs && (
        <div className="mt-4">
          <p className="text-3xl mb-4">Loading your jobs...</p>
          <BarLoader width={"100%"} color={theme === "dark" ? "#fff" : "#000"} />
        </div>
      )}

      {/* Jobs List */}
      {!loadingJobs && paginatedJobs?.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {paginatedJobs.map((job) => (
            <JobsCard key={job.id} job={job} savedInitial={job?.saved?.length > 0} />
          ))}
        </div>
      )}

      {/* No Jobs Found */}
      {!loadingJobs && jobs?.length === 0 && (
        <div>
          <p className="text-3xl mb-4">No Jobs found. Please check back later or adjust your search criteria.</p>
        </div>
      )}

      {/* Pagination Component */}
      {!loadingJobs && jobs?.length > itemsPerPage && (
        <div className="mt-8">
          <Pagination
            totalItems={jobs.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Error Handling */}
      {errorJobs && (
        <div className="mt-4 text-red-600">
          <p>Error fetching jobs: {errorJobs.message}</p>
        </div>
      )}
    </div>
  );
};

export default JobListingPage;
