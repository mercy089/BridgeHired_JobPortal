import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/Hooks/useFetch";
import { SavedJobs } from "@/Api/ApiJobs";
import { useUser } from "@clerk/clerk-react";

const JobsCard = ({
  job,
  isMyJobs = false,
  savedInitial = false,
  onJobSaved = () => {},
}) => {

  const [isSaved, setIsSaved] = useState(savedInitial);
  const {
    data: saved,
    error: errorSaved,
    loading: loadingSaved,
    fetchFunction: fetchSaved,
  } = useFetch(SavedJobs,{alreadySaved:isSaved});
  const { user } = useUser();

  const handleSaveJob=async()=>{
    await fetchSaved({
      user_id:user.id,
      job_id:job.id,
    });
    onJobSaved();
  }

  useEffect(()=>{
    if(saved!==undefined) setIsSaved(saved?.length>0)
  },[saved])
  return (
    <Card className="transition flex flex-col gap-1 duration-300 bg-gray-300 bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-40 border dark:border-gray-900 rounded-lg shadow-md">
      <CardHeader className="h-[20%]">
        <CardTitle className="flex text-xl justify-between font-bold">
          {job.title}
          {isMyJobs && (
            <Trash2Icon
              fill="red"
              size={20}
              className="cursor-pointer text-red-300"
            />
          )}
        </CardTitle>
      </CardHeader>
      {/* Card Content */}
      <CardContent className="h-[60%] flex flex-col gap-4">
        <div className="flex sm:items-center flex-col sm:flex-row justify-between items-start gap-2">
          {job.companies?.logo_url && (
            <img
              src={job.companies.logo_url}
              alt={job.companies.name}
              className="h-10 object-cover filter dark:brightness-90 brightness-75"
            />
          )}

          <div className="flex items-center text-gray-950 dark:text-gray-400">
            <MapPinIcon size={18} className="mr-1" />
            <span>{job.Location}</span>
          </div>
        </div>

        {job.companies && (
          <div className="font-semibold text-md text-gray-900 dark:text-gray-300">
            {job.companies.name}
          </div>
        )}

        <hr className="dark:border-gray-200 border-gray-900 my-2" />

        {job.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {job.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="h-[20%] flex items-center justify-between gap-2.5">
        <Link to={`/jobs/${job.id}`} className="flex-1 ">
          <Button className="w-full" variant="secondary">
            More Details
          </Button>
        </Link>
        {!isMyJobs && (
          <Button
            variant="outline"
            className="w-14 flex justify-center items-center"
            onClick={handleSaveJob}
            disabled={loadingSaved}
          >
            {isSaved ? (
              <Heart size={25} stroke="red" fill="red" />
            ) : (
              <Heart size={25} fill="none" />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobsCard;
