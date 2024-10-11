import supabaseClient, { supabaseUrl } from "@/utils/supabase";

//! apply to job function for user profile page to apply to a job from supabase database using supabase client function
export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token); // Initialize Supabase client with the provided token

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: errorUpload } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (errorUpload) {
    console.error("Error while uploading resume", errorUpload);
    return null;
  }
  // https://xsntudkjficyqswuiezo.supabase.co/storage/v1/object/public/company_logo/atlassian.svg?t=2024-10-11T19%3A00%3A36.757Z

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();
  if (error) {
    console.error("Error while submitting application", error);
    return null;
  }

  return data;
}

// - Edit Application Status ( recruiter )
// export async function updateApplicationStatus(token, { job_id }, status) {
//   const supabase = await supabaseClient(token); // Initialize Supabase client with the provided token

//   // Update the application status for the specified job ID in the "applications" table
//   const { data, error } = await supabase
//     .from("applications")
//     .update({ status }) // Update the status (e.g., "accepted", "rejected", etc.)
//     .eq("job_id", job_id) // Match applications by job ID
//     .select(); // Use `.select()` to return the updated data

//   // If there's an error or no data is returned, log the error and return null
//   if (error || data.length === 0) {
//     console.error("Error Updating Application Status:", error);
//     return null;
//   }

//   // Return the updated application data
//   return data;
// }

// // - Get list of applications for a candidate
// export async function getApplications(token, { user_id }) {
//   const supabase = await supabaseClient(token); // Initialize Supabase client with the provided token

//   // Select all applications by the candidate (user_id) and join the job and company data for context
//   const { data, error } = await supabase
//     .from("applications")
//     .select("*, job:jobs(title, company:companies(name))") // Fetch job title and company name with each application
//     .eq("candidate_id", user_id); // Filter applications by candidate ID

//   // If there's an error fetching the applications, log it and return null
//   if (error) {
//     console.error("Error fetching Applications:", error);
//     return null;
//   }

//   // Return the fetched applications data
//   return data;
// }
