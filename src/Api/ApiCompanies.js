import supabaseClient, { supabaseUrl } from "@/utils/supabase";
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
//! adding new company  function for adding new company in supabase database using supabase client function
export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;

  const { error: storageError } = await supabase.storage
    .from("company_logo")
    .upload(fileName, companyData.logo);

  if (storageError) throw new Error("Error uploading Company Logo");

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company_logo/${fileName}`;

  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url: logo_url,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Companys");
  }

  return data;
}