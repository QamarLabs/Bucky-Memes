import CryptoJS from "crypto-js";
export default async function validate(pwd: string) {
    const encryptedPwd = CryptoJS.AES.encrypt(pwd, process.env.NEXT_PUBLIC_ADD_SECRET_KEY!);
    const response = await fetch(
      `/api/validateKey`,
      {
        method: "POST",
        body: JSON.stringify({
          apiKey: encryptedPwd.toString()
        })
      }
    );
    const json = await response.json();
  
    return json;
  }
  