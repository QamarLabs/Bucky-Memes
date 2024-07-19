export default async function deleteFeature(id: string) {
    const response = await fetch(
        "/api/deleteFeatures/" + id,
        {
          method: "DELETE"
        }
      );
      const json = await response.json();
    
      return json;
    }
    