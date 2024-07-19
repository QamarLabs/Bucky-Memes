export default async function deleteMeme(id: string) {
  const response = await fetch(
      "/api/deleteMemes/" + id,
      {
        method: "DELETE"
      }
    );
    const json = await response.json();
  
    return json;
  }
  