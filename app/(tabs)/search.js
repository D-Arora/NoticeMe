import {
  useNavigation,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { defaultEvents, EVENTS_STORE_KEY } from "./events";
import { defaultUsers } from "./profile";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import FloatingButton from "../../components/FloatingButton";
import sampleEvents from "./events/sampleEvents.json";
import { MaterialIcons } from "@expo/vector-icons";

const societies = [
  {
    name: "Philosophy Society",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNuw7THu9nrgpXMPttSnrESPDlo2-MI8wmfg&s",
  },
  {
    name: "SciSoc",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbCnPWYNEqVFCE3Obzi0Ldspkk1HXNymd60w&s",
  },
  {
    name: "KanyeWest Appreciation Society",
  },
  {
    name: "DigiSoc",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQScoEboj1AsujUnGMDQde6Zm4-iy8Ab-T6_A&s",
  },
  {
    name: "WanderSoc",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvR0kVD5KdpFU23P28nDl6o6DGy74lIApVNw&s",
  },
  {
    name: "Medical Science Society",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSraPpqjDYqxK-Vkv17RH3hZt8tGmnI7HKvRw&s",
  },
  {
    name: "Table Top Games Society",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrcYnLB8XNhe6qQDyifLMsksW36Ox6zUAoCw&s",
  },
  {
    name: "Design Society",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-VWN_sJFoeNQGYKln4qp086gw5zf-ghvrA&s",
  },
  {
    name: "Tetris Soc",
  },
];

export default function Search() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState(defaultUsers);
  const [searchInput, setSearchInput] = useState("");
  const [hideContraints, setHideContraints] = useState(true);

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

  const categories = {
    all: "All",
    events: "Events",
    accounts: "Accounts",
    societies: "Societies",
  };

  const [category, setCategory] = useState(categories.all);

  const [filterPredicates, setFilterPredicates] = useState({
    upcoming: {
      categories: [categories.events],
      isEnabled: false,
      predicateFn: (e) => new Date(e.end) > new Date(),
    },
    // hasWith_S_inTitle: {
    //   categories: [categories.events],
    //   isEnabled: false,
    //   predicateFn: (e) => !!e && e.title.toLowerCase().includes("s"),
    // },
    // EventsWithDefinedColour: {
    //   categories: [categories.events],
    //   isEnabled: false,
    //   predicateFn: (e) => !!e.color,
    // },
    hasImage: {
      categories: [
        categories.events,
        categories.accounts,
        categories.societies,
      ],
      isEnabled: false,
      predicateFn: (e) => !!e.imageSource,
    },
    // TODO otherpredicates that are actually useful
  });

  const [sortComparators, setSortComparators] = useState({
    sortByStartTime: {
      categories: [categories.events],
      isEnabled: false,
      comparatorFn: (a, b) =>
        a.start && b.start ? new Date(a.start) - new Date(b.start) : 0, // Sorts events by start time in ascending order
    },
    sortByTitle: {
      categories: [
        categories.events,
        categories.accounts,
        categories.societies,
      ],
      isEnabled: false,
      comparatorFn: (a, b) => {
        if (a.eventName && b.eventName) {
          return a.eventName.localeCompare(b.eventName, undefined, {
            sensitivity: "base",
          });
        }
        if (a.name && b.name) {
          return a.name.localeCompare(b.name, undefined, {
            sensitivity: "base",
          });
        }
      },
    },
    // Todo other comparators
  });

  const [filterdEvents, setFilteredEvents] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredSocieties, setFilteredSocieties] = useState([]);

  const getEventsFromAsyncStorage = async () => {
    // const storedEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY);
    // if (!storedEvents) {
    //   setEvents(defaultEvents);
    //   setFilteredEvents(defaultEvents);
    //   await AsyncStorage.setItem(
    //     EVENTS_STORE_KEY,
    //     JSON.stringify(defaultEvents)
    //   );
    // } else {
    //   setEvents(JSON.parse(storedEvents));
    //   setFilteredEvents(JSON.parse(storedEvents));
    // }

    setEvents(sampleEvents);
    setFilteredEvents(sampleEvents);
  };

  useEffect(() => {
    getEventsFromAsyncStorage();

    setUsers(defaultUsers);
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
    let updatedEvents = events.filter((event) =>
      Object.values(filterPredicates)
        .filter((x) => x.isEnabled)
        .filter((x) => x.categories.includes(categories.events))
        .every(({ predicateFn }) => predicateFn(event))
    );

    if (searchInput !== "") {
      updatedEvents = updatedEvents.filter((event) =>
        event.eventName.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    Object.values(sortComparators)
      .filter((x) => x.isEnabled)
      .forEach(({ comparatorFn }) => {
        updatedEvents.sort(comparatorFn);
      });

    setFilteredEvents(updatedEvents);
  }, [searchInput, filterPredicates, sortComparators]);

  useEffect(() => {
    let updatedUsers = users.filter((user) =>
      Object.values(filterPredicates)
        .filter((x) => x.isEnabled)
        .filter((x) => x.categories.includes(categories.accounts))
        .every(({ predicateFn }) => predicateFn(user))
    );

    if (searchInput !== "") {
      updatedUsers = updatedUsers.filter((user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    Object.values(sortComparators)
      .filter((x) => x.isEnabled)
      .filter((x) => x.categories.includes(categories.accounts))
      .forEach(({ comparatorFn }) => {
        updatedUsers.sort(comparatorFn);
      });

    setFilteredUsers(updatedUsers);
  }, [searchInput, filterPredicates, sortComparators]);

  useEffect(() => {
    let updatedSocieties = societies.filter((user) =>
      Object.values(filterPredicates)
        .filter((x) => x.isEnabled)
        .filter((x) => x.categories.includes(categories.societies))
        .every(({ predicateFn }) => predicateFn(user))
    );

    if (searchInput !== "") {
      updatedSocieties = updatedSocieties.filter((user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    Object.values(sortComparators)
      .filter((x) => x.isEnabled)
      .filter((x) => x.categories.includes(categories.societies))
      .forEach(({ comparatorFn }) => {
        updatedSocieties.sort(comparatorFn);
      });

    setFilteredSocieties(updatedSocieties);
  }, [searchInput, filterPredicates, sortComparators]);

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          gap: 10,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 6,
          // overflow: 'visible'
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#006D62",
            borderRadius: 999,
            paddingLeft: 14,
            flexGrow: 1,
            flexShrink: 1,
          }}
        >
          <FontAwesome name="search" size={24} color="white" />
          <TextInput
            style={{
              backgroundColor: "#006D62",
              color: "white",
              padding: 10,
              fontSize: 16,
              borderRadius: 999,
              flexGrow: 1,
              // flexShrink: 1
            }}
            placeholder="Search"
            placeholderTextColor="white"
            defaultValue={""}
            onChangeText={(x) => setSearchInput(x)}
          />
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            // gap: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#006D62",
            width: 40,
            height: 40,
            borderRadius: 20,
            padding: 10,
            // flexGrow: 1
            // flexShrink: 1
          }}
          onPress={() => setHideContraints(!hideContraints)}
        >
          <FontAwesome name="sliders" size={24} color="white" />
        </Pressable>
      </View>

      {/* Tabs for categories */}
      <View
        style={{
          paddingTop: 6,
          width: "100%",
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        {Object.values(categories).map((x, index) => (
          <Pressable
            key={index}
            style={{ flexGrow: 1 }}
            onPress={() => setCategory(x)}
          >
            <View
              style={{
                borderTopRightRadius: 28,
                borderTopLeftRadius: 28,
                alignItems: "center",
                padding: 10,
                shadowColor: "#64CEC2",
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 1,
                shadowRadius: 0,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderLeftColor: "#64CEC2",
                borderRightColor: "#64CEC2",
                backgroundColor: category == x ? "#B0F0CA" : "white",
              }}
            >
              <Text
                style={{
                  fontFamily: "Regular",
                  color: "#005A6D",
                  fontWeight: 700,
                }}
              >
                {x}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <FloatingButton
        IconComponent={FontAwesome}
        iconName="sliders"
        iconSize={40}
        iconColor="white"
        onPress={() => setHideContraints(!hideContraints)}
        shadowColor="white"
        buttonColor="#64CEC2"
      />

      {!hideContraints && (
        <View
          style={{
            // position: 'absolute',
            borderBottomEndRadius: 28,
            borderBottomStartRadius: 28,
            padding: 10,
            zIndex: 1,
            width: "100%",
            shadowColor: "#64CEC2",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 0,
            backgroundColor: "white",
          }}
        >
          {/* <Text>Categories</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              width: "100%",
              flexWrap: "wrap",
              padding: 10,
            }}
          >
            {Object.values(categories).map((x, index) => (
              <Pressable
                key={index}
                style={{
                  shadowColor: "#64CEC2",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 1,
                  shadowRadius: 0,
                  elevation: 6,
                  backgroundColor: x !== category ? "#F7F7F7" : "purple",
                  borderRadius: 28,
                  padding: 10,
                  justifyContent: "center",
                }}
                onPress={() => setCategory(x)}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text numberOfLines={1}>{x}</Text>
                </View>
              </Pressable>
            ))}
          </View> */}

          <Text>Filters</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              width: "100%",
              flexWrap: "wrap",
              padding: 10,
            }}
          >
            {Object.entries(filterPredicates)
              .filter(
                ([_, val]) =>
                  category == categories.all ||
                  val.categories.includes(category)
              )
              .map(([predicateKey, { isEnabled }], index) => (
                <Pressable
                  key={index}
                  style={{
                    shadowColor: "#64CEC2",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 1,
                    shadowRadius: 0,
                    elevation: 6,
                    backgroundColor: !isEnabled ? "#F7F7F7" : "#B0F0CA",
                    borderRadius: 28,
                    padding: 10,
                    justifyContent: "center",
                  }}
                  onPress={() =>
                    setFilterPredicates((prev) => ({
                      ...prev,
                      [predicateKey]: {
                        ...prev[predicateKey],
                        isEnabled: !filterPredicates[predicateKey].isEnabled,
                      },
                    }))
                  }
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text numberOfLines={1}>{predicateKey}</Text>
                  </View>
                </Pressable>
              ))}
          </View>

          <Text>Sort By</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              width: "100%",
              flexWrap: "wrap",
              padding: 10,
            }}
          >
            {Object.entries(sortComparators)
              .filter(
                ([_, val]) =>
                  category == categories.all ||
                  val.categories.includes(category)
              )
              .map(([comparatorKey, { isEnabled }], index) => (
                <Pressable
                  key={index}
                  style={{
                    shadowColor: "#64CEC2",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 1,
                    shadowRadius: 0,
                    elevation: 6,
                    backgroundColor: !isEnabled ? "#F7F7F7" : "#B0F0CA",
                    borderRadius: 28,
                    padding: 10,
                    justifyContent: "center",
                  }}
                  onPress={() =>
                    setSortComparators((prev) => {
                      const newComparators = Object.fromEntries(
                        Object.entries(prev).map(([key, value]) => [
                          key,
                          {
                            ...value,
                            isEnabled:
                              key === comparatorKey ? !value.isEnabled : false,
                          },
                        ])
                      );
                      return newComparators;
                    })
                  }
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text numberOfLines={1}>{comparatorKey}</Text>
                  </View>
                </Pressable>
              ))}
          </View>
        </View>
      )}

      {/* <Text>Results</Text> */}
      <View style={{ width: "100%", flexShrink: 1 }}>
        {(category == categories.all || category == categories.events) && (
          <View
            style={{
              width: "100%",
              paddingLeft: 20,
              paddingTop: 10,
              flexShrink: 1,
            }}
          >
            <Text
              style={{ fontFamily: "Bold", fontSize: 28, color: "#005A6D" }}
            >
              Events
            </Text>
            <ScrollView
              horizontal={false}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 50,
                padding: 10,
                width: "100%",
              }}
            >
              <View style={{ gap: 10, width: "100%" }}>
                {filterdEvents.map((params, index) => (
                  <Pressable
                    key={index}
                    onPress={() => navigation.navigate("events/event", params)}
                  >
                    <View
                      style={{
                        padding: 10,
                        borderRadius: 28,
                        backgroundColor: "white",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        // marginLeft: 10,
                        // marginRight: 10,
                        width: "100%",
                        gap: 10,
                        shadowColor: !params.colour ? "grey" : params.colour,
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 1,
                        shadowRadius: 0,
                        elevation: 6,
                        padding: 10,
                      }}
                    >
                      <Image
                        style={{ width: 100, height: 100, borderRadius: 20 }}
                        resizeMode="cover"
                        source={
                          !params.imageSource
                            ? require("../../assets/adaptive-icon.png")
                            : { uri: params.imageSource }
                        }
                      />
                      <View style={{ overflow: "scroll", flexShrink: 1 }}>
                        <Text
                          style={{
                            color: "#006D62",
                            fontFamily: "Bold",
                            fontSize: 30,
                          }}
                          numberOfLines={1}
                        >
                          {!params.eventName
                            ? "undefined title"
                            : params.eventName}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            alignItems: "center",
                          }}
                        >
                          <Ionicons name="time" size={24} color="#006D62" />
                          <Text style={{ color: "#006D62" }} numberOfLines={1}>
                            {!params.start ? "undefined start" : params.start}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            alignItems: "center",
                          }}
                        >
                          <Ionicons
                            name="location-sharp"
                            size={24}
                            color="#006D62"
                          />
                          <Text style={{ color: "#006D62" }} numberOfLines={3}>
                            {!params.location
                              ? "undefined location"
                              : params.location}
                            {`\n ${params.latitude + " , " + params.longitude}`}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {(category == categories.all || category == categories.accounts) && (
          <View
            style={{
              width: "100%",
              paddingLeft: 20,
              paddingTop: 10,
              // flexShrink: 1,
            }}
          >
            <Text
              style={{ fontFamily: "Bold", fontSize: 28, color: "#005A6D" }}
            >
              Accounts
            </Text>
            <ScrollView
              horizontal={true}
              style={{
                display: "flex",
                // flexDirection: "column",
                flexDirection:
                  category == categories.accounts ? "column" : "row",

                gap: 50,
                padding: 10,
                width: "100%",
                minHeight: 140,
              }}
            >
              <View
                style={{
                  gap: 10,
                  padding: 10,
                  width: "100%",
                  flexDirection: "row",
                  flexWrap: category == categories.accounts ? "wrap" : "nowrap",
                }}
              >
                {filteredUsers.map((params, index) => (
                  <Pressable
                    key={index}
                    onPress={() =>
                      navigation.navigate("profile", {
                        ...params,
                        faculties: JSON.stringify(params.faculties),
                        societies: JSON.stringify(params.societies),
                        comments: JSON.stringify(params.comments),
                      })
                    }
                  >
                    <View style={{ alignItems: "center", width: 120 }}>
                      <Image
                        style={{ width: 100, height: 100, borderRadius: 9999 }}
                        resizeMode="cover"
                        source={
                          !params.image
                            ? require("../../assets/adaptive-icon.png")
                            : { uri: params.image }
                        }
                      />
                      <Text numberOfLines={1}>{params.name}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {(category == categories.all || category == categories.societies) && (
          <View
            style={{
              width: "100%",
              paddingLeft: 20,
              paddingTop: 10,
              //
              // flexShrink: 1,
            }}
          >
            <Text
              style={{ fontFamily: "Bold", fontSize: 28, color: "#005A6D" }}
            >
              Societies
            </Text>
            <ScrollView
              horizontal={true}
              style={{
                display: "flex",
                flexDirection:
                  category == categories.societies ? "column" : "row",
                gap: 50,
                padding: 10,
                width: "100%",
                minHeight: 140,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  flexWrap:
                    category == categories.societies ? "wrap" : "nowrap",
                  width: "100%",
                }}
              >
                {filteredSocieties.map((params, index) => (
                  <View
                    key={index}
                    style={{ alignItems: "center", width: 120 }}
                  >
                    <Image
                      style={{ width: 100, height: 100, borderRadius: 9999 }}
                      resizeMode="cover"
                      source={
                        !params.image
                          ? require("../../assets/adaptive-icon.png")
                          : { uri: params.image }
                      }
                    />
                    <Text numberOfLines={1}>{params.name}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}
