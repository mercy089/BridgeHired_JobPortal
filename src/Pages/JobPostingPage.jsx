import { getCompanies } from "@/Api/ApiCompanies";
import { addNewJob } from "@/Api/ApiJobs";
import AddCompanyDrawer from "@/components/AddCompanyDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/Hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";
import { useTheme } from "@/components/theme-provider";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  Location: z.string().min(1, { message: "Select a Location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
  responsibility: z.string().min(1, { message: "Responsibilities are required" }),
});
const JobPostingPage = () => {
  const { theme } = useTheme();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Location: "",
      company_id: "",
      requirements: "",
      responsibility: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fetchFunction: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0) navigate("/jobs");
  }, [loadingCreateJob]);

  const {
    loading: loadingCompanies,
    data: companies,
    fetchFunction: fnCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingCompanies) {
    return (
      <div>
        <p className="text-lg mb-4">Loading...</p>
        <BarLoader width={"100%"} color={theme === "dark" ? "#fff" : "#000"} />
      </div>
    );
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div>
      <h1 className="lobster-regular font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post a Job
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 pb-0"
      >
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex gap-4 items-center">
          <Controller
            name="Location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Company">
                    {field.value
                      ? companies?.find((com) => com.id === Number(field.value))
                          ?.name
                      : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies?.map(({ name, id }) => (
                      <SelectItem key={name} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>
        {errors.Location && (
          <p className="text-red-500">{errors.Location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500">{errors.company_id.message}</p>
        )}
        <h1 className="font-bold text-lg">For Requirements</h1>
        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor
              value={field.value}
              onChange={field.onChange}
              className={`${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black"
              }`} // Optional theme prop or detection logic
            />
          )}
        />
        <h1 className="font-bold text-lg">For Responsibilities</h1>
        <Controller
          name="responsibility"
          control={control}
          render={({ field }) => (
            <MDEditor
              value={field.value}
              onChange={field.onChange}
              className={`${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black"
              }`} // Optional theme prop or detection logic
            />
          )}
        />
        {errors.responsibility && (
          <p className="text-red-500">{errors.responsibility.message}</p>
        )}

        {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}
        {errors.errorCreateJob && (
          <p className="text-red-500">{errors?.errorCreateJob?.message}</p>
        )}
        {errorCreateJob?.message && (
          <p className="text-red-500">{errorCreateJob?.message}</p>
        )}
        {loadingCreateJob && (
          <div>
            <p className="text-lg ">Posting job...</p>
            <BarLoader
              width={"100%"}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          </div>
        )}
        <Button type="submit" variant="blue" size="lg" className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default JobPostingPage;
