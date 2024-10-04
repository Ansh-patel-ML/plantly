import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserStateI {
  isOnBoardingCompleted: Boolean;
  toggleOnBoarding: () => void;
}

export const useUserStore = create(
  persist<UserStateI>(
    (set) => ({
      isOnBoardingCompleted: false,
      toggleOnBoarding: () =>
        set((state) => ({
          isOnBoardingCompleted: !state.isOnBoardingCompleted,
        })),
    }),
    {
      name: "plantly-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
