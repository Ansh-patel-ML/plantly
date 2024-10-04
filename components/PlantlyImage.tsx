import { Image, useWindowDimensions } from "react-native";

interface PlantlyImageI {
  size?: number;
  uri?: string | null;
}

const PlantlyImage: React.FC<PlantlyImageI> = ({ size, uri }) => {
  const { width } = useWindowDimensions();

  const imageSize = size ?? Math.min(width / 1.5, 400);

  return (
    <Image
      source={uri ? { uri: uri } : require("@/assets/plantly.png")}
      style={{
        width: imageSize,
        height: imageSize,
        borderRadius: 12,
      }}
    />
  );
};

export default PlantlyImage;
