export default async function addImageToCloudinary(formData: FormData) {
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/aa1997/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  const json = await response.json();
  
  return { cloudinaryId: `v${json.version}`, cloudinaryUrl: json.secure_url };
}
