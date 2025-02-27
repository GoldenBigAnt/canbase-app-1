import { axiosPrivateInstance } from "@/lib/axios";

const getStrains = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/strain/getStrains")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const getStrain = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/strain/getStrain", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export { getStrains, getStrain };
