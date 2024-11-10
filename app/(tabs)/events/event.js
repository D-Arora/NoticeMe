import { View, Text, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Event() {
  const router = useRouter();
  const params = useLocalSearchParams();
  return (
    <View
      style={{
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text>Single EVent page</Text>
      <Text>{`title: ${params.title}`}</Text>
      <Text>{`event time: ${params.start} - ${params.end}`}</Text>

      <View
        style={{
          height: 50,
          width: 300,
          backgroundColor: !params.color ? "white" : params.color,
        }}
      >
        <Text>{`this box uses this colour ${params.color} or maybe a default color of white`}</Text>
        <Button title="Go to this event map" onPress={() => router.push({
          pathname: "/events/map",
          params
        })} />
      </View>
      <Button title="Go to all events" onPress={() => router.push("/events")} />
    </View>
  );
}
