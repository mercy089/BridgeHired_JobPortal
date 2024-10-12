import supabaseClient from "@/utils/supabase";
//! fetching jobs from supabase database using supabase client function
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase.from("jobs").select(`
        *,
        companies(
          name,
          logo_url
        ),
        saved: saved_jobs(id)
      `);

  // Add filtering based on provided parameters
  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`); // Example for searching job titles
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error while fetching jobs", error);
    return null;
  }
  return data;
}

//! Saved jobs function for user profile page to display saved jobs data from supabase database using supabase client function

export async function SavedJobs(token, { alreadySaved }, saveJobs) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: errorDelete } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveJobs.job_id);

    if (errorDelete) {
      console.error("Error while deleting saved jobs", errorDelete);
      return null;
    }
    return data;
  } else {
    const { data, error: errorInsert } = await supabase
      .from("saved_jobs")
      .insert([saveJobs])
      .select();
    if (errorInsert) {
      console.error("Error while saving jobs", errorInsert);
      return null;
    }
    return data;
  }
}
//! fetching single job from supabase database using supabase client function
export async function getSingleJob(token,{job_id}) {
const supabase = await supabaseClient(token);

const {data,error}=await supabase
.from("jobs")
.select(`*,companies(name,logo_url),applications:applications(*)`)
.eq("id",job_id)
.single();

if(error){
  console.error("Error while fetching SingleJobs", error);
  return null;
}
return data
}

//! update hiring status function for user profile page to update hiring status from supabase database using supabase client function
export async function updateHiringStatus(token,{job_id},isOpen){
  const supabase = await supabaseClient(token);
  const {data,error}=await supabase
  .from("jobs")
  .update({isOpen})
  .eq("id",job_id)
  .select();
  if(error){
    console.error("Error while updating hiring status", error);
    return null;
  }
  return data
}

//! get my jobs function for user profile page to display my jobs data from supabase database using supabase client function
export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select(`*, companies: companies(name,logo_url)`)
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

//! delete job function for user profile page to delete job from supabase database using supabase client function
export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error: deleteError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (deleteError) {
    console.error("Error deleting job:", deleteError);
    return data;
  }

  return data;
}

//! adding new job function for adding new job in supabase database using supabase client function
export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Job");
  }

  return data;
}
//! get saved jobs function for user profile page to display saved jobs data from supabase database using supabase client function
export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select(`*, job: jobs(*, companies: companies(name,logo_url))`);

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
}