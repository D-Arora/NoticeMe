import { View, Text, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Events() {
  const router = useRouter();
  const params = useLocalSearchParams();
  return (
    <View>
      <Text>Single EVent page</Text>
      <Text>{`title: ${params.title}`}</Text>
      <Button title="Go to all events" onPress={() => router.push("/events")} />
    </View>
  );
}
