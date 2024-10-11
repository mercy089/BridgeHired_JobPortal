import supabaseClient from "@/utils/supabase";
//! fetching companies from supabase database using supabase client function
export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
  .from("companies")
  .select(`*`);
  if (error) {
    console.error("Error while fetching companies", error);
    return null;
  }
  return data;
}
