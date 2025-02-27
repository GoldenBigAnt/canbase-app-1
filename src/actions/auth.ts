import { axiosPublicInstance } from "@/lib/axios";

const signIn = async (data: any) => {
  try {
    const result = await axiosPublicInstance
      .post("/auth/login", { ...data })
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

const signUp = async (data: any) => {
  try {
    const result = await axiosPublicInstance
      .post("/auth/register", data)
      .then((res) => res.data);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export { signIn, signUp };
