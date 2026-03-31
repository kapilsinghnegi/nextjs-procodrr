"use server";

// export async function registerUser(previousData, formData) {
// export async function registerUser(formData) {
export async function registerUser(_, formData) {
  // console.log({previousData});
  console.log(formData);
  return { message: `${formData.email} registered` };
  // return { error: `${formData.email} not registered` };
}
