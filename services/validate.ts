import CryptoJS from "crypto-js";
export default async function validate(pwd: string) {
    const response = await fetch(
      `/api/validateKey`,
      {
        method: "POST",
        body: JSON.stringify({
          apiKey: pwd
        })
      }
    );
    const json = await response.json();
  
    return json;
  }
  