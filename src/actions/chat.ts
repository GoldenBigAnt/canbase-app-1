import { axiosPrivateInstance } from "@/lib/axios";

const getAllChannels = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/chat/getAllChannels")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const getChatData = async (param: string) => {
  try {
    const result = await axiosPrivateInstance
      .get("/chat/getChatData/" + param)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export { getAllChannels, getChatData };
