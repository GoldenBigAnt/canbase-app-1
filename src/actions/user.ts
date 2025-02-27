import * as FileSystem from "expo-file-system";
import { axiosPrivateInstance } from "@/lib/axios";
import { loadData } from "@/lib/storage";
import { API_URI, UPLOAD_URI } from "@/config/env";

const getData = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/user/getData")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (data: any) => {
  try {
    if (data.avatar.includes(UPLOAD_URI)) {
      const result = await axiosPrivateInstance
        .post("/user/update", data.form)
        .then((res) => res.data);

      return result;
    } else {
      const token = await loadData("token");

      const result = await FileSystem.uploadAsync(
        `${API_URI}` + "/user/update",
        data.avatar,
        {
          httpMethod: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          fieldName: "avatar",
          parameters: { ...data.form },
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        }
      ).then((res) => JSON.parse(res.body));

      return result;
    }
  } catch (error) {
    console.error(error);
  }
};

const acceptRequest = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/user/accept", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const cancelRequest = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/user/cancel", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export { getData, updateUser, acceptRequest, cancelRequest };
