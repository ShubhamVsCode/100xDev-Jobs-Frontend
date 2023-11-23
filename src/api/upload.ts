import axios from "axios";
import { get, post } from "./index";

class UploadAPI {
  /**
   * Uploads a file to the server.
   *
   * @param {string} fileName - The name of the file to be uploaded.
   * @param {string} folder - The folder where the file will be stored.
   * @return {Promise<{ url: string; objectKey: string }>} A promise that resolves with the URL and object key of the uploaded file.
   */
  static async uploadFile(
    fileName: string,
    folder: string
  ): Promise<{ url: string; objectKey: string }> {
    return await post("/upload/file", { fileName, folder });
  }

  /**
   * Uploads a file to the specified S3 URL using the PUT method.
   *
   * @param {string} url - The URL of the S3 bucket where the file will be uploaded.
   * @param {File} file - The file to be uploaded.
   * @return {Promise<any>} - A promise that resolves to the response from the server.
   */
  static async uploadOnS3(url: string, file: File) {
    return await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  }
}

export default UploadAPI;
