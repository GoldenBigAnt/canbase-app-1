import { axiosPrivateInstance } from "@/lib/axios";

const getAllClubs = async () => {
  try {
    const result = await axiosPrivateInstance
      .get("/club/all")
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const createClub = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/club/create", { ...data })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const joinClub = async (data: any) => {
  try {
    const result = await axiosPrivateInstance
      .post("/club/join", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export { getAllClubs, createClub, joinClub };
