import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid/non-secure";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as FileSystem from "expo-file-system";

export type PlantType = {
  id: string;
  name: string;
  wateringFrequency: number;
  image: string | null;
};

interface PlantStateI {
  data: PlantType[];
  add: ({ name, wateringFrequency }: Omit<PlantType, "id">) => void;
  remove: (id: string) => void;
}

export const usePlantStore = create(
  persist<PlantStateI>(
    (set) => ({
      data: [
        {
          id: nanoid(),
          name: "Cactus",
          wateringFrequency: 3,
          image: null,
        },
      ],
      add: async ({ name, wateringFrequency, image }) => {
        const imageURL = image?.split("/").slice(-1)[0];
        const savedImageURL =
          FileSystem.documentDirectory + `${new Date().getTime()}-${imageURL}`;
        if (image) {
          await FileSystem.copyAsync({
            from: image,
            to: savedImageURL,
          });
        }
        return set((state) => {
          const newPlant: PlantType = {
            id: nanoid(),
            name,
            wateringFrequency,
            image: image ? savedImageURL : null,
          };
          return {
            ...state,
            data: [...state.data, newPlant],
          };
        });
      },
      remove: (id: string) =>
        set((state) => {
          const removedPlants = state.data.filter((val) => {
            if (id !== val.id) {
              return val;
            }
          });
          return {
            ...state,
            data: removedPlants,
          };
        }),
    }),
    {
      name: "plantly-plant-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
