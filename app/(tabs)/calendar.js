import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import {
  Calendar as BigCalendar,
  ICalendarEventBase,
  Mode,
} from "react-native-big-calendar";

import { Dropdown } from "react-native-element-dropdown";

import StyledButton from "../../components/StyledButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultEvents, EVENTS_STORE_KEY } from "./events";

const tabHeight = 40;

export default function Calendar() {
  const router = useRouter();
  const bigCalendarConatiner = useRef(null);
  const [calendarHeight, setCalendarHeight] = useState(500);
  const main = useRef(null);
  const [mode, setMode] = useState("schedule");
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const getEventsFromAsyncStorage = async () => {
    const storedEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY);
    if (!storedEvents) {
      setEvents(defaultEvents);
      await AsyncStorage.setItem(
        EVENTS_STORE_KEY,
        JSON.stringify(defaultEvents)
      );
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
      // Invoked whenever the route is focused. (incase asyncstorage has changed)
      getEventsFromAsyncStorage();

      // Return function is invoked whenever the route gets out of focus.
      return () => {
        console.log("This route is now unfocused.");
      };
    }, [])
  );

  useEffect(() => {
    setCalendarHeight(bigCalendarConatiner.current.clientHeight);
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
      // case "day":
      //   const dates = [];
      //   for (let i = 5; i > 0; i--) {
      //     const prev = new Date(date.getTime() - 86400000 * i);
      //     dates.unshift({ label: prev.toDateString(), value: prev });
      //   }
      //   dates.push({ label: date.toDateString(), value: date }); // Current day
      //   for (let i = 1; i <= 5; i++) {
      //     const next = new Date(date.getTime() + 86400000 * i);
      //     dates.push({ label: next.toDateString(), value: next });
      //   }
      //   const today = new Date();
      //   dates.unshift({
      //     label: `Today ${today.toLocaleDateString()}`,
      //     value: today,
      //   });
      //   return (
      //     <>
      //       <Pressable
      //         style={{
      //           flexDirection: "row",
      //           alignItems: "center",
      //           borderRadius: 28,
      //           backgroundColor: "#F7F7F7",
      //           padding: 15,
      //           borderBottomWidth: 5,
      //           borderColor: "#00B192",
      //         }}
      //         onPress={() => setDate(new Date(date.getTime() - 86400000))}
      //       >
      //         <AntDesign name="caretleft" size={24} color="#006D62" />
      //         <Text style={{ color: "#006D62" }}>prev</Text>
      //       </Pressable>
      //       <Dropdown
      //         style={styles.dropdown}
      //         data={dates}
      //         search={false}
      //         maxHeight={400}
      //         labelField="label"
      //         valueField="value"
      //         // placeholder="Select item"
      //         // placeholder="your mother"
      //         placeholder={`${date.toDateString()}`}
      //         onChange={(item) => {
      //           setDate(item.value);
      //         }}
      //       />
      //       <Pressable
      //         style={{
      //           flexDirection: "row",
      //           alignItems: "center",
      //           borderRadius: 28,
      //           backgroundColor: "#F7F7F7",
      //           padding: 15,
      //           borderBottomWidth: 5,
      //           borderColor: "#00B192",
      //         }}
      //         onPress={() => setDate(new Date(date.getTime() + 86400000))}
      //       >
      //         <Text style={{ color: "#006D62" }}>next</Text>
      //         <AntDesign name="caretright" size={24} color="#006D62" />
      //       </Pressable>
      //     </>
      //   );
      case "day":
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#006D62",
                fontWeight: "bold",
                fontSize: 24,
                fontFamily: "Bold",
              }}
            >
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
                // day: 'numeric'
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
                <AntDesign name="caretleft" size={24} color="#006D62" />
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
                <AntDesign name="caretright" size={24} color="#006D62" />
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
              paddingLeft: 20,
              paddingRight: 20,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#006D62",
                fontWeight: "bold",
                fontSize: 24,
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
              {/* {`  `}
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })} */}
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
                <AntDesign name="caretleft" size={24} color="#006D62" />
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
                <AntDesign name="caretright" size={24} color="#006D62" />
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
              paddingLeft: 20,
              paddingRight: 20,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#006D62",
                fontWeight: "bold",
                fontSize: 24,
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
                <AntDesign name="caretleft" size={24} color="#006D62" />
              </Pressable>
              <Pressable
                style={{ height: 30 }}
                onPress={() =>
                  setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
                }
              >
                <AntDesign name="caretright" size={24} color="#006D62" />
              </Pressable>
            </View>
          </View>
        );
      default:
        return null;
      // return (
      //   <View
      //     style={{
      //       display: "flex",
      //       alignItems: "center",
      //       justifyContent: "center",
      //       width: "100%",
      //     }}
      //   >
      //     <Text
      //       style={{
      //         color: "#006D62",
      //         fontWeight: "bold",
      //         fontFamily: "Bold",
      //         fontSize: 24,
      //       }}
      //     >
      //       {date.toLocaleString("default", {
      //         month: "long",
      //         year: "numeric",
      //       })}
      //     </Text>
      //     <View></View>
      //   </View>
      // );
    }
  }

  const customEventRenderer = (event, touchableOpacityProps) => {
    const conditionalStyles = [];
    if (mode == "schedule") {
      conditionalStyles.push({ height: 100 });
    }
    return (
      <TouchableOpacity
        {...touchableOpacityProps}
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
            // height: 80,
          },
        ]}
        onPress={() => onPressEvent(event)}
      >
        {
          // dayjs(event.end).diff(event.start, 'minute') < 32 ? (
          //   <Text style={[{ color: 'black' }]}>
          //     {event.title},
          //     <Text style={[{ color: 'black' }]}>{dayjs(event.start).format('HH:mm')}</Text>
          //   </Text>
          // ) : (
          //   <>
          //     <Text style={[{ color: 'black' }]}>{event.title}</Text>
          //     <Text style={[{ color: 'black' }]}>
          //       {/* {formatStartEnd(event.start, event.end, 'HH:mm')} */}
          //       {event.start.toDateString()}
          //     </Text>
          //     {event.children && event.children}
          //   </>
          // )
        }
        {mode == "month" ? (
          <>
            <Text
              style={{ fontSize: 10, color: "#006D62", fontFamily: "Regular" }}
              numberOfLines={1}
            >
              {event.title}
            </Text>
          </>
        ) : mode == "week" ? (
          <>
            {dayjs(event.end).diff(event.start, "minute") < 50 ? (
              <Text
                style={{ fontSize: 10, color: "#006D62", fontFamily: "Bold" }}
                numberOfLines={1}
              >
                {event.title}
              </Text>
            ) : (
              <Text
                style={{ fontSize: 10, color: "#006D62", fontFamily: "Bold" }}
              >
                {event.title}
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
                {event.title}
              </Text>
            ) : (
              <Text
                style={{ fontSize: 10, color: "#006D62", fontFamily: "Bold" }}
              >
                {event.title}
              </Text>
            )}
          </>
        ) : (
          <>
            <Text
              style={{ fontSize: 14, color: "#006D62", fontFamily: "Bold" }}
            >
              {event.title}
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
    // console.log(e);
    if (mode == "month" || mode == "week") {
      setDate(new Date(event.start));
      setMode("day");
    } else {
      // TODO navigate to event page with the event information!
      router.push({
        pathname: "events/event",
        params: {
          title: event.title,
        },
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

  // if there is no space to display all events, go to the scedule view / or day view
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
        {/* <Text>{date.toDateString()}</Text>
        {`${date.getMonth()} ${date.getFullYear()}`} */}
      </View>
      <View ref={bigCalendarConatiner} style={{ flexGrow: 1, width: "100%" }}>
        <BigCalendar
          style={{ flexGrow: 1 }}
          height={!calendarHeight ? 500 : calendarHeight}
          events={events}
          renderEvent={customEventRenderer}
          swipeEnabled={true}
          // onLongPressCell={addLongEvent}
          onPressCell={onPressCell}
          onPressEvent={onPressEvent}
          onPressDateHeader={onPressDateHeader}
          // onChangeDate={([start, _]) => setDate(start)}
          sortedMonthView={false}
          mode={mode}
          date={date}
          eventCellStyle={(event) => {
            if (event.color) {
              return { backgroundColor: event.color };
            }
            // const backgroundColor = event.title.match(/Meeting/) ? 'red' : 'blue'
            // return { backgroundColor }
          }}
          // moreLabel="+{moreCount}"
          onPressMoreLabel={onPressMoreLabel}
          // onChangeDate={(e) => alert(`onChangeDate: ${e}`)}
          // defaultDate={date}
          // onNavigate={(e) => alert(`onNavigate: ${e}`)}
          onSwipeEnd={(start) => setDate(start)}
          showAdjacentMonths={true}
          itemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          // renderHeader={() => mode === 'day' && null}
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
    // height: tabHeight,
    backgroundColor: "#D6FFF9",
    // borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    // marginEnd: 15,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    // backgroundColor: "#00D262",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 3,
    borderTopColor: "#64CEC2",
  },
  buttonText: {
    fontWeight: 700,
    color: "#006D62",
  },
  buttonTextActive: {
    fontWeight: 700,
    color: "#fff",
  },
  buttonContainerActive: {
    borderTopColor: "#006D62",
    backgroundColor: "#00B192",
    // borderBottomColor: "#006D62",
    // borderBottomWidth: 3,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    gap: 1,
    // padding: 10,
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
    // width: 300,
    // margin: 16,
    flexGrow: 1,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
});
