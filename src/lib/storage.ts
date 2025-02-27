import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveData = async (index: string, data: any) => {
  try {
    if (Platform.OS === "web") {
      localStorage.setItem(index, JSON.stringify(data));
    } else {
      await AsyncStorage.setItem(index, JSON.stringify(data));
    }
  } catch (error) {
    console.error("Error saving form data:", error);

    throw new Error("Failed to save form data");
  }
};

const loadData = async (index: string) => {
  try {
    let savedFormData = null;

    if (Platform.OS === "web") {
      savedFormData = JSON.parse(localStorage.getItem(index) as any);
    } else {
      savedFormData = JSON.parse((await AsyncStorage.getItem(index)) as any);
    }

    return savedFormData;
  } catch (error) {
    console.error("Error loading form data:", error);

    throw new Error("Failed to load form data");
  }
};

const clearData = async (index: string) => {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem(index);
    } else {
      await AsyncStorage.removeItem(index);
    }
  } catch (error) {
    console.error("Error clearing form data:", error);

    throw new Error("Failed to clear form data");
  }
};

export { saveData, loadData, clearData };
