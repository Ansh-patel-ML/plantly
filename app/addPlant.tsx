import PlantlyButton from "@/components/PlantlyButton";
import PlantlyImage from "@/components/PlantlyImage";
import { usePlantStore } from "@/store/plantStore";
import { theme } from "@/theme";
import { useState } from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";

const AddPlant = () => {
  const [cameraPermissionStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryPermissionStatus, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const { add } = usePlantStore();
  const [plantName, setPlantName] = useState<string | undefined>(undefined);
  const [wateringFrequency, setWateringFrequency] = useState<number>(1);
  const [image, setImage] = useState<string | null>(null);

  const validationAlert = () => {
    Alert.alert("Name and watering frequency is required");
  };

  const handleAddPlant = () => {
    if (plantName === undefined) {
      validationAlert();
    } else {
      add({
        name: plantName,
        wateringFrequency,
        image,
      });
    }
  };

  const requestForCameraPermission = () => {
    // Todo
    return requestCameraPermission();
  };

  const checkAndRequestForMediaLibraryPermission = async () => {
    const isPermissionGranted = mediaLibraryPermissionStatus?.granted;
    if (!isPermissionGranted) {
      const res = await requestMediaLibraryPermission();
      return res;
    }
    return mediaLibraryPermissionStatus;
  };

  const handleSelectImage = async () => {
    const permissionStatus = await checkAndRequestForMediaLibraryPermission();
    if (!permissionStatus.granted && !permissionStatus.canAskAgain) {
      Linking.openURL("app-settings:");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });
      if (!result?.canceled) {
        setImage(result?.assets[0]?.uri);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={style.container}
      contentContainerStyle={style.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={style.imageContainer}
        onPress={handleSelectImage}
      >
        <PlantlyImage uri={image} />
      </TouchableOpacity>
      <View>
        <Text style={style.textLabel}>Name</Text>
        <TextInput
          placeholder="Eg. Caspher the Cactus"
          style={style.textInput}
          value={plantName}
          onChangeText={(text) => setPlantName(text)}
        />
      </View>
      <View>
        <Text style={style.textLabel}>Watering Frequency (every x days)</Text>
        <TextInput
          placeholder="Eg. 6"
          keyboardType="number-pad"
          style={style.textInput}
          value={String(wateringFrequency)}
          onChangeText={(text) => setWateringFrequency(Number(text))}
        />
      </View>
      <PlantlyButton onPress={handleAddPlant} text="Add Plant" />
    </KeyboardAwareScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 2,
    borderColor: theme.colorGrey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
  textLabel: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default AddPlant;
