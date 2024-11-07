import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
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

const events = [
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
];

const tabHeight = 40;

export default function Calendar() {
  const [calendarHeight, setCalendarHeight] = useState(500);
  const main = useRef(null);
  const [mode, setMode] = useState("schedule");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setCalendarHeight(main.current.clientHeight - tabHeight);
  }, []);

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
        const dates = [];
        for (let i = 5; i > 0; i--) {
          const prev = new Date(date.getTime() - 86400000 * i);
          dates.unshift({ label: prev.toDateString(), value: prev });
        }
        dates.push({ label: date.toDateString(), value: date }); // Current day
        for (let i = 1; i <= 5; i++) {
          const next = new Date(date.getTime() + 86400000 * i);
          dates.push({ label: next.toDateString(), value: next });
        }
        const today = new Date()
        dates.unshift({label: `Today ${today.toLocaleDateString()}`, value: today})
        return (
          <>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 28,
                backgroundColor: "#F7F7F7",
                padding: 15,
                borderBottomWidth: 5,
                borderColor: "#00B192",
              }}
              onPress={() => setDate(new Date(date.getTime() - 86400000))}
            >
              <AntDesign name="caretleft" size={24} color="#006D62" />
              <Text style={{ color: "#006D62" }}>Yesterday</Text>
            </Pressable>
            <Dropdown
              style={styles.dropdown}
              data={dates}
              search={false}
              maxHeight={400}
              labelField="label"
              valueField="value"
              // placeholder="Select item"
              // placeholder="your mother"
              placeholder={`place holder ${date.toDateString()}`}
              onChange={(item) => {
                setDate(item.value);
              }}
            />
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 28,
                backgroundColor: "#F7F7F7",
                padding: 15,
                borderBottomWidth: 5,
                borderColor: "#00B192",
              }}
              onPress={() => setDate(new Date(date.getTime() + 86400000))}
            >
              <Text style={{ color: "#006D62" }}>Tomorrow</Text>
              <AntDesign name="caretright" size={24} color="#006D62" />
            </Pressable>
          </>
        );
      case "week":
        return (
          <>
            <Pressable
              onPress={() => setDate(new Date(date.getTime() - 86400000))}
            >
              <AntDesign name="caretleft" size={24} color="black" />
            </Pressable>
            <StyledButton
              title={`${date.toDateString()}`}
              onPress={() => setDate(new Date())}
            />
            <Pressable
              onPress={() => setDate(new Date(date.getTime() + 86400000))}
            >
              <AntDesign name="caretright" size={24} color="black" />
            </Pressable>
          </>
        );
      default:
        return null;
    }
  }

  const onPressCell = React.useCallback((start) => {
    if (mode === "month") {
      setDate(new Date(start));
      setMode("day");
    }
  }, []);

  const onPressEvent = React.useCallback((e) => {
    console.log(e);
  });

  const onPressDateHeader = React.useCallback((start) => {
    if (mode == 'day') {
      setDate(new Date())
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
        backgroundColor: 'white'
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
        {/* {renderControlButtons()} */}
      </View>
      <View style={{ flexGrow: 1, width: "100%" }}>
        <BigCalendar
          height={650}
          events={events}
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
          showAdjacentMonths={true}
          itemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          // renderHeader={() => mode === 'day' && null}
          bodyContainerStyle={{ backgroundColor: 'white' }}
          headerContainerStyle={{ backgroundColor: 'white' }}
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
