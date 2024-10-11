import { getSingleJob, updateHiringStatus } from "@/Api/ApiJobs";
import useFetch from "@/Hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { BarLoader } from "react-spinners";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplyJobsDrawer from "@/components/ApplyJobs";

const JobDetailsPage = () => {
  const { theme } = useTheme();
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    data: JobsDetails,
    error: errorJobsDetails,
    loading: loadingJobsDetails,
    fetchFunction: fetchJobsDetails,
  } = useFetch(getSingleJob, { job_id: id });

  const { loading: loadingHiringStatus, fetchFunction: fetchHiringStatus } =
    useFetch(updateHiringStatus, { job_id: id });

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fetchHiringStatus(isOpen).then(() => fetchJobsDetails());
  };
  console.log(JobsDetails);
  

  useEffect(() => {
    if (isLoaded) fetchJobsDetails();
  }, [isLoaded]);

  if (loadingJobsDetails) {
    return (
      <div>
        <p className="text-lg mb-4">Loading your job details...</p>
        <BarLoader width={"100%"} color={theme === "dark" ? "#fff" : "#000"} />
      </div>
    );
  }

  if (errorJobsDetails) {
    return (
      <p className="text-lg mb-4">
        Failed to load job details. Please try again.
      </p>
    );
  }

  // Helper function to split the text by newline characters
  const renderList = (text) =>
    text?.split("\n").map((item, index) => <li key={index}>{item}</li>);

  return (
    <div className="flex flex-col gap-8 mt-5 px-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="font-extrabold pb-3 text-4xl sm:text-6xl">
          {JobsDetails?.title}
        </h1>
        <img
          src={JobsDetails?.companies?.logo_url}
          alt={JobsDetails?.companies?.name}
          className="h-12"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {JobsDetails?.Location}
        </div>
        <div className="flex gap-2">
          <Briefcase />
          {JobsDetails?.applications?.length} Applications
        </div>
        <div className="flex gap-2">
          {JobsDetails?.isOpen ? (
            <>
              <DoorOpen />
              Open
            </>
          ) : (
            <>
              <DoorClosed />
              Closed
            </>
          )}
        </div>
      </div>
      {loadingHiringStatus && (
        <div>
          <p className="text-sm mb-2">Changing Hiring Status...</p>
          <BarLoader
            width={"100%"}
            color={theme === "dark" ? "#fff" : "#000"}
          />
        </div>
      )}
      {JobsDetails?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${
              JobsDetails?.isOpen ? "bg-green-950" : "bg-red-950"
            } rounded-lg text-white`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (JobsDetails?.isOpen ? "Open" : "Closed")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold mb-2">About the Job</h2>
      <p className="sm:text-lg">{JobsDetails?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
        What We&apos;re Looking For
      </h2>
      <ul className="sm:text-lg">{renderList(JobsDetails?.requirements)}</ul>

      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
        What you will do ?
      </h2>
      <ul className="sm:text-lg">{renderList(JobsDetails?.responsibility)}</ul>

      {
        JobsDetails?.recruiter_id !== user?.id && 
        <ApplyJobsDrawer
        job={JobsDetails}
        user={user}
        fetchJob={fetchJobsDetails}
        appliedJob={JobsDetails?.applications?.find((ap)=>ap.candidate_id === user?.id)}
        /> 
      }
      
    </div>
  );
};

export default JobDetailsPage;
