import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Calendar as BigCalendar } from "react-native-big-calendar";

import StyledButton from "../../components/StyledButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sampleEvents from "./events/sampleEvents.json";
import { MaterialIcons } from "@expo/vector-icons";
import colours from "../../colours";

const tabHeight = 40;

export default function Calendar() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const bigCalendarContainer = useRef(null);
  const [calendarHeight, setCalendarHeight] = useState(500);
  const main = useRef(null);
  const [mode, setMode] = useState("schedule");
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingLeft: 10 }}
        >
          <MaterialIcons name="arrow-back" size={32} color="#006e62" />
        </TouchableOpacity>
      ),
    });
  });

  const getEventsFromAsyncStorage = async () => {
    const storedEvents = await AsyncStorage.getItem("@events");
    if (!storedEvents) {
      setEvents(sampleEvents);
      await AsyncStorage.setItem("@events", JSON.stringify(sampleEvents));
    } else {
      const parsedEvents = JSON.parse(storedEvents).map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setEvents(parsedEvents);
    }
  };

  useEffect(() => {
    getEventsFromAsyncStorage();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getEventsFromAsyncStorage();

      return () => {
        console.log("This route is now unfocused.");
      };
    }, [])
  );

  useEffect(() => {
    setCalendarHeight(bigCalendarContainer.current.clientHeight);
  }, [date]);

  function ViewButton({ label, setmode }) {
    return (
      <Pressable
        style={[
          styles.buttonContainer,
          mode == setmode && styles.buttonContainerActive,
        ]}
        onPress={() => setMode(setmode)}
      >
        <Text
          style={[
            styles.buttonText,
            mode == setmode && styles.buttonTextActive,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    );
  }

  function renderControlButtons() {
    switch (mode) {
      case "day":
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 5,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#006D62",
                fontSize: 20,
                fontFamily: "Bold",
              }}
            >
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Pressable
                style={{ height: 30 }}
                onPress={() =>
                  setDate(
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() - 1
                    )
                  )
                }
              >
                <AntDesign name="caretleft" size={20} color="#006D62" />
              </Pressable>
              <Pressable
                style={{ height: 30 }}
                onPress={() =>
                  setDate(
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() + 1
                    )
                  )
                }
              >
                <AntDesign name="caretright" size={20} color="#006D62" />
              </Pressable>
            </View>
          </View>
        );
      case "week":
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 5,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#006D62",
                fontSize: 20,
                fontFamily: "Bold",
              }}
            >
              {new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() -
                  ((date.getDay() < 0 ? 7 : 0) + date.getDay() - 0)
              ).toLocaleString("default", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              {` - `}
              {new Date(
                date.getFullYear(),
                date.getMonth(),
                (date.getDay() < 0 ? -7 : 0) +
                  6 -
                  (date.getDay() - 0) +
                  date.getDate()
              ).toLocaleString("default", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Pressable
                style={{ height: 30 }}
                onPress={() =>
                  setDate(
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() - 7
                    )
                  )
                }
              >
                <AntDesign name="caretleft" size={20} color="#006D62" />
              </Pressable>
              <Pressable
                style={{ height: 30 }}
                onPress={() =>
                  setDate(
                    new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() + 7
                    )
                  )
                }
              >
                <AntDesign name="caretright" size={20} color="#006D62" />
              </Pressable>
            </View>
          </View>
        );
      case "month":
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 5,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#006D62",
                fontSize: 20,
                fontFamily: "Bold",
              }}
            >
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </Text>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Pressable
                style={{ height: 30 }}
                onPress={() =>
                  setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
                }
              >
                <AntDesign name="caretleft" size={20} color="#006D62" />
              </Pressable>
              <Pressable
                style={{ height: 30 }}
                onPress={() =>
                  setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
                }
              >
                <AntDesign name="caretright" size={20} color="#006D62" />
              </Pressable>
            </View>
          </View>
        );
      default:
        return null;
    }
  }

  const customEventRenderer = (event, touchableOpacityProps) => {
    const conditionalStyles = [];
    if (mode == "schedule") {
      conditionalStyles.push({ height: 100 });
    }
    return (
      <TouchableOpacity
        style={[
          conditionalStyles,
          ...touchableOpacityProps.style,
          {
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "white",
            borderBottomColor: event.color ? event.color : "#64CEC2",
            borderBottomWidth: 3,
            borderLeftColor: event.color ? event.color : "#64CEC2",
            borderLeftWidth: 1,
            borderRightColor: event.color ? event.color : "#64CEC2",
            borderRightWidth: 1,
            borderStyle: "solid",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            overflow: "overflow",
          },
        ]}
        onPress={() => onPressEvent(event)}
      >
        {}
        {mode == "month" ? (
          <>
            <Text
              style={{ fontSize: 10, color: "#006D62", fontFamily: "Regular" }}
              numberOfLines={1}
            >
              {event.eventName}
            </Text>
          </>
        ) : mode == "week" ? (
          <>
            {dayjs(event.end).diff(event.start, "minute") < 50 ? (
              <Text
                style={{ fontSize: 10, color: "#006D62", fontFamily: "Bold" }}
                numberOfLines={1}
              >
                {event.eventName}
              </Text>
            ) : (
              <Text
                style={{ fontSize: 10, color: "#006D62", fontFamily: "Bold" }}
              >
                {event.eventName}
              </Text>
            )}
          </>
        ) : mode == "day" ? (
          <>
            {dayjs(event.end).diff(event.start, "minute") < 50 ? (
              <Text
                style={{ fontSize: 10, color: "#006D62", fontFamily: "Bold" }}
                numberOfLines={1}
              >
                {event.eventName}
              </Text>
            ) : (
              <Text
                style={{ fontSize: 10, color: "#006D62", fontFamily: "Bold" }}
              >
                {event.eventName}
              </Text>
            )}
          </>
        ) : (
          <>
            <Text
              style={{ fontSize: 14, color: "#006D62", fontFamily: "Bold" }}
            >
              {event.eventName}
            </Text>
            <Text
              style={{ fontSize: 10, color: "#006D62", fontFamily: "Regular" }}
            >
              {event.start.getDate() === event.end.getDate()
                ? `${event.start.toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                  })} ${event.start.toLocaleTimeString()} - ${event.end.toLocaleTimeString()}`
                : `${event.start.toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })} - ${event.end.toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`}
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const onPressCell = React.useCallback((start) => {
    if (mode === "month") {
      setDate(new Date(start));
      setMode("day");
    }
  }, []);

  const onPressEvent = React.useCallback((event) => {
    if (mode == "month" || mode == "week") {
      setDate(new Date(event.start));
      setMode("day");
    } else {
      router.push({
        pathname: "events/event",
        params: event,
      });
    }
  });

  const onPressDateHeader = React.useCallback((start) => {
    if (mode == "day") {
      setDate(new Date());
    } else {
      setDate(new Date(start));
      setMode("day");
    }
  });

  const onPressMoreLabel = React.useCallback((moreEvents) => {
    alert(JSON.stringify(moreEvents));
    setDate(new Date(moreEvents[0].start));
    setMode("day");
  });

  return (
    <View
      ref={main}
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <View style={styles.buttonRow}>
        {[
          { label: "Schedule", setmode: "schedule" },
          { label: "Day", setmode: "day" },
          { label: "Week", setmode: "week" },
          { label: "Month", setmode: "month" },
        ].map((x, i) => (
          <ViewButton key={i} label={x.label} setmode={x.setmode} />
        ))}
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          gap: 10,
        }}
      >
        {renderControlButtons()}
      </View>
      <View ref={bigCalendarContainer} style={{ flexGrow: 1, width: "100%" }}>
        <BigCalendar
          style={{ flexGrow: 1 }}
          height={!calendarHeight ? 640 : calendarHeight}
          events={events}
          renderEvent={customEventRenderer}
          swipeEnabled={true}
          onPressCell={onPressCell}
          onPressEvent={onPressEvent}
          onPressDateHeader={onPressDateHeader}
          sortedMonthView={false}
          mode={mode}
          date={date}
          eventCellStyle={(event) => {
            if (event.color) {
              return { backgroundColor: event.color };
            }
          }}
          onPressMoreLabel={onPressMoreLabel}
          onSwipeEnd={(start) => setDate(start)}
          showAdjacentMonths={true}
          itemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          bodyContainerStyle={{ backgroundColor: "white" }}
          headerContainerStyle={{ backgroundColor: "white", height: 80 }}
          theme={{
            palette: {
              primary: {
                main: "#00B192",
                contrastText: "#fff",
                gray: {
                  100: "#fff",
                  200: "#fff",
                  300: "#fff",
                  500: "#fff",
                  800: "#fff",
                },
              },
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    color: "#006D62",
    backgroundColor: "#D6FFF9",
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderColor: colours.light.primaryGreen,
  },
  buttonText: {
    fontFamily: "Bold",
    color: "#006D62",
  },
  buttonTextActive: {
    fontFamily: "Bold",
    color: "#fff",
  },
  buttonContainerActive: {
    borderTopColor: "#006D62",
    backgroundColor: "#00B192",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,

    height: tabHeight,
  },
  headline: {
    fontSize: 16,
  },
  itemSeparator: {
    height: 5,
    marginBottom: 20,
  },
  dropdown: {
    flexGrow: 1,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
});
