// import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setOnboardFlag = async () => {
  try {
    await AsyncStorage.setItem("@onBoarding", "DONE");
  } catch (error) {
    console.log(error);
  }
};

export const getOnboardFlag = async () => {
  try {
    const value = await AsyncStorage.getItem("@onBoarding");
    return value;
  } catch (error) {
    console.log(error);
  }
};
