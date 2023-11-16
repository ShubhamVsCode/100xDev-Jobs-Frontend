import axios from "axios";
import { get, post } from "./index";

class UploadAPI {
  static async uploadFile(
    fileName: string,
    folder: string
  ): Promise<{ url: string; objectKey: string }> {
    return await post("/upload/file", { fileName, folder });
  }

  static async uploadOnS3(url: string, file: File) {
    return await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  }
}

export default UploadAPI;
