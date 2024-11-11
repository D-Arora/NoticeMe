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
      start: dayjs().set("hour", 10).set("minute", 0).toDate(),
      end: dayjs().set("hour", 10).set("minute", 30).toDate(),
      color: "#008033",
    },
    {
      title: "Coffee break",
      start: dayjs().set("hour", 14).set("minute", 30).toDate(),
      end: dayjs().set("hour", 15).set("minute", 30).toDate(),
    },
    {
      title: "Meeting again",
      start: dayjs().set("hour", 16).set("minute", 30).toDate(),
      end: dayjs().set("hour", 17).set("minute", 30).toDate(),
    },
    {
      title: "Dinner at the Plaza",
      start: dayjs().set("hour", 18).set("minute", 30).toDate(),
      end: dayjs().set("hour", 19).set("minute", 30).toDate(),
      color: "#ffe9ab",
    },
    {
      title: "Go home",
      start: dayjs().set("hour", 21).set("minute", 30).toDate(),
      end: dayjs().set("hour", 22).set("minute", 30).toDate(),
    },
    {
      title: "Read a book",
      start: dayjs().set("hour", 22).set("minute", 30).toDate(),
      end: dayjs().set("hour", 23).set("minute", 30).toDate(),
    },
    {
      title: "Exercise",
      start: dayjs().add(1, "day").set("hour", 5).set("minute", 0).toDate(),
      end: dayjs().add(1, "day").set("hour", 5).set("minute", 30).toDate(),
    },
    {
      title: "Repair my car",
      start: dayjs().add(1, "day").set("hour", 7).set("minute", 45).toDate(),
      end: dayjs().add(1, "day").set("hour", 13).set("minute", 30).toDate(),
    },
    {
      title: "Gardening",
      start: dayjs().add(2, "day").set("hour", 10).set("minute", 0).toDate(),
      end: dayjs().add(2, "day").set("hour", 10).set("minute", 30).toDate(),
      color: "#ffe9ab",
    },
    {
      title: "Mowing",
      start: dayjs().add(2, "day").set("hour", 11).set("minute", 0).toDate(),
      end: dayjs().add(2, "day").set("hour", 11).set("minute", 30).toDate(),
    },
    {
      title: "Go to beach",
      start: dayjs().add(3, "day").set("hour", 8).set("minute", 0).toDate(),
      end: dayjs().add(3, "day").set("hour", 8).set("minute", 30).toDate(),
      color: "#e9b5f7",
    },
    {
      title: "Meeting 2",
      start: dayjs().add(7, "day").set("hour", 10).set("minute", 0).toDate(),
      end: dayjs().add(7, "day").set("hour", 10).set("minute", 30).toDate(),
    },
    {
      title: "Coffee break",
      start: dayjs().add(7, "day").set("hour", 14).set("minute", 30).toDate(),
      end: dayjs().add(7, "day").set("hour", 15).set("minute", 30).toDate(),
    },
    {
      title: "Month Away",
      start: dayjs().add(31, "day").set("hour", 14).set("minute", 30).toDate(),
      end: dayjs().add(31, "day").set("hour", 15).set("minute", 30).toDate(),
    },
    {
      title: "Month Away",
      start: dayjs().add(31, "day").set("hour", 15).set("minute", 30).toDate(),
      end: dayjs().add(31, "day").set("hour", 16).set("minute", 30).toDate(),
    },
    {
      title: "New Year Celebration",
      start: new Date(2025, 0, 1),
      end: new Date(2025, 0, 2),
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
                  start: x.start,
                  end: x.end,
                  color: x.color,
                },
              })
            }
          />
        ))}
      </View>
    </View>
  );
}
