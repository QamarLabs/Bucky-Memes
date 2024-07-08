import CryptoJS from "crypto-js";
import { MemeBody } from "../pages/api/addMemes";
export default async function createMeme(data: MemeBody, pwd: string) {
    const encryptedPwd = CryptoJS.AES.encrypt(pwd, process.env.NEXT_PUBLIC_ADD_SECRET_KEY!);
    const response = await fetch(
      "/api/addMemes",
      {
        method: "POST",
        headers: {
            'x-api-key': encryptedPwd.toString()
        },
        body: JSON.stringify(data)
      }
    );
    const json = await response.json();
  
    return json;
  }
  