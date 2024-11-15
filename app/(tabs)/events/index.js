import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import dayjs from "dayjs";
import StyledButton from "../../../components/StyledButton";

export default function Events() {
  const router = useRouter();
  const [events, setEvents] = useState([
    {
      title: "Meeting",
      image:
        "https://pbs.twimg.com/media/Gatqoa5aoAA1tqA?format=jpg&name=medium",
      start: dayjs().set("hour", 10).set("minute", 0).toDate(),
      end: dayjs().set("hour", 10).set("minute", 30).toDate(),
      color: "#008033",
      latitude: -33.85652154,
      longitude: 151.215339612,
      location: "Sydney Opera House, Sydney",
    },
    {
      title: "UNSW Library Study Session",
      image:
        "https://pbs.twimg.com/media/GYNX098akAEL6_g?format=jpg&name=medium",
      start: dayjs().set("hour", 10).set("minute", 0).toDate(),
      end: dayjs().set("hour", 10).set("minute", 30).toDate(),
      color: "red",
      latitude: -33.91725324897,
      longitude: 151.23343108372,
      location: "UNSW Library",
    },
    {
      title: "Coffee Break",
      start: dayjs().set("hour", 14).set("minute", 30).toDate(),
      end: dayjs().set("hour", 15).set("minute", 0).toDate(),
      latitude: -33.8731,
      longitude: 151.2065,
      location: "The Grounds of the City, Sydney",
    },
    {
      title: "Lunch with Client",
      start: dayjs().set("hour", 12).set("minute", 0).toDate(),
      end: dayjs().set("hour", 13).set("minute", 30).toDate(),
      latitude: -33.8728,
      longitude: 151.2051,
      location: "Queen Victoria Building, Sydney",
    },
    {
      title: "Team Meeting",
      start: dayjs().set("hour", 16).set("minute", 0).toDate(),
      end: dayjs().set("hour", 16).set("minute", 45).toDate(),
      color: "#ffe9ab",
      latitude: -33.8683,
      longitude: 151.2195,
      location: "Barangaroo Reserve, Sydney",
    },
    {
      title: "Dinner with Friends",
      start: dayjs().set("hour", 19).set("minute", 0).toDate(),
      end: dayjs().set("hour", 21).set("minute", 0).toDate(),
      latitude: -33.8748,
      longitude: 151.2003,
      location: "Darling Harbour, Sydney",
    },
    {
      title: "Morning Run",
      start: dayjs().add(1, "day").set("hour", 6).set("minute", 0).toDate(),
      end: dayjs().add(1, "day").set("hour", 7).set("minute", 0).toDate(),
      latitude: -33.8707,
      longitude: 151.2094,
      location: "Hyde Park, Sydney",
    },
    {
      title: "Client Presentation",
      start: dayjs().add(1, "day").set("hour", 10).set("minute", 30).toDate(),
      end: dayjs().add(1, "day").set("hour", 11).set("minute", 30).toDate(),
      color: "#e9b5f7",
      latitude: -33.8611,
      longitude: 151.2106,
      location: "Museum of Contemporary Art, Sydney",
    },
    {
      title: "Visit Art Gallery",
      start: dayjs().add(2, "day").set("hour", 14).set("minute", 0).toDate(),
      end: dayjs().add(2, "day").set("hour", 15).set("minute", 30).toDate(),
      latitude: -33.8682,
      longitude: 151.2173,
      location: "Art Gallery of New South Wales, Sydney",
    },
    {
      title: "Yoga Class",
      start: dayjs().add(2, "day").set("hour", 18).set("minute", 0).toDate(),
      end: dayjs().add(2, "day").set("hour", 19).set("minute", 0).toDate(),
      latitude: -33.8572,
      longitude: 151.2153,
      location: "Royal Botanic Garden, Sydney",
    },
    {
      title: "Weekend Market Visit",
      start: dayjs().add(3, "day").set("hour", 9).set("minute", 0).toDate(),
      end: dayjs().add(3, "day").set("hour", 11).set("minute", 0).toDate(),
      latitude: -33.8792,
      longitude: 151.2057,
      location: "Paddy's Markets, Haymarket, Sydney",
    },
  ]);

  return (
    <View>
      <Text>Events Page</Text>
      <View style={{ gap: 10 }}>
        {/* {events.map((x, index) => (
          <Button
            color={x.color}
            key={index}
            title={x.title}
            onPress={() =>
              router.push({
                pathname: "events/event",
                params: {
                  title: x.title,
                  start: x.start,
                  end: x.end,
                  color: x.color,
                },
              })
            } */}
        {events.map((x, index) => (
          <StyledButton
            key={index}
            title={x.title}
            colour={x.color}
            shadowColour={["black", "green", "red", "blue"][index % 4]}
            onPress={() =>
              router.push({
                pathname: "events/event",
                params: {
                  title: x.title,
                  image: x.image,
                  start: x.start,
                  end: x.end,
                  color: x.color,
                  latitude: x.latitude,
                  longitude: x.longitude,
                  location: x.location,
                },
              })
            }
          />
        ))}
      </View>
    </View>
  );
}
