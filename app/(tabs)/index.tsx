import { usePlantStore } from "@/store/plantStore";
import { theme } from "@/theme";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PlantType } from "@/store/plantStore";
import PlantlyImage from "@/components/PlantlyImage";
import PlantlyButton from "@/components/PlantlyButton";
import { router } from "expo-router";

const Plant = () => {
  const { data } = usePlantStore();

  const RenderPlant = ({ name, wateringFrequency, image }: PlantType) => {
    return (
      <View style={styles.plantCard}>
        <View
          style={[
            styles.imageContainer,
            {
              paddingVertical: image ? 12 : 0,
              paddingHorizontal: image ? 10 : 0,
            },
          ]}
        >
          <PlantlyImage size={image ? 78 : 100} uri={image} />
        </View>
        <View style={styles.plantCardInnerContainer}>
          <Text style={styles.plantName}>{name}</Text>
          <Text style={styles.plantWaterFrequency}>
            Water every {wateringFrequency} days
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Plant</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <RenderPlant
            id={item.id}
            name={item.name}
            wateringFrequency={item.wateringFrequency}
            image={item.image}
          />
        )}
        ListEmptyComponent={
          <PlantlyButton
            onPress={() => {
              router.navigate("/addPlant");
            }}
            text="Add your first plant"
          />
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: theme.colorWhite,
    padding: 12,
    paddingBottom: 0,
    gap: 12,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  plantCard: {
    flex: 1,
    flexDirection: "row",
    gap: 18,
    shadowColor: theme.colorBlack,
    backgroundColor: theme.colorWhite,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colorGrey,
    marginBottom: 10,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  plantCardInnerContainer: {
    flexDirection: "column",
    gap: 4,
  },
  plantName: {
    fontSize: 16,
    color: theme.colorBlack,
  },
  plantWaterFrequency: {
    fontSize: 14,
    color: theme.colorLightGrey,
  },
});

export default Plant;
