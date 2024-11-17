import { ScrollView, View, Text, Button, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";

export default function Event() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("events/index")}
          style={{ paddingLeft: 10 }}
        >
          <MaterialIcons name="arrow-back" size={32} color="#006e62" />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <ScrollView>
      <View
        style={{
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: 10,
        }}
      >
        <Text>Single event page</Text>
        <Text>{`title: ${params.title}`}</Text>
        <Text>{`event time: ${params.start} - ${params.end}`}</Text>
        <Text>{`loation: ${params.location}`}</Text>
        <Text>{`longitude: ${params.longitude}`}</Text>
        <Text>{`latitude: ${params.latitude}`}</Text>
        <Image
          style={{ width: 300, height: 300, borderRadius: 20 }}
          resizeMode="contain"
          source={
            !params.image
              ? require("../../../assets/adaptive-icon.png")
              : { uri: params.image }
          }
        />

        <View
          style={{
            height: 50,
            width: 300,
            backgroundColor: !params.color ? "white" : params.color,
          }}
        >
          <Text>{`this box uses this colour ${params.color} or maybe a default color of white`}</Text>
          <Button
            title="Go to this event map"
            onPress={() =>
              router.push({
                pathname: "/events/map",
                params,
              })
            }
          />
        </View>
        <Button
          title="Go to all events"
          onPress={() => router.push("/events")}
        />
      </View>
    </ScrollView>
  );
}
