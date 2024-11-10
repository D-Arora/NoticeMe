import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Events() {
  const router = useRouter();

  return (
    <View>
      <Text>Events Page</Text>
      <Button
        title="Go to Single Event called EVENT TITLE IS PASSED THROUGH LOCAL PARAMS"
        onPress={() =>
          router.push({
            pathname: "events/event",
            params: {
              title: "EVENT TITLE IS PASSED THROUGH LOCAL PARAMS",
            },
          })
        }
      />
    </View>
  );
}
