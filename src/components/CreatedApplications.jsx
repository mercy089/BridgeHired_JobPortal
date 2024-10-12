import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./ApplicationCard";
import { useEffect } from "react";
import { getApplications } from "@/Api/ApiApplication";
import useFetch from "@/hooks/useFetch";
import { BarLoader } from "react-spinners";
import { useTheme } from "./theme-provider";

const CreatedApplications = () => {
    const { theme } = useTheme();
  const { user } = useUser();

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
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate={true}
          />
        );
      })}
    </div>
  );
};

export default CreatedApplications;