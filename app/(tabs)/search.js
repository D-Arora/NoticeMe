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
import { defaultUsers } from "./profile";
import {
  Ionicons,
  FontAwesome,
  Feather,
  FontAwesome6,
} from "@expo/vector-icons";
import FloatingButton from "../../components/FloatingButton";
import sampleEvents from "./events/sampleEvents.json";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import colours from "../../colours";

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
  const [hideConstraints, setHideConstraints] = useState(true);

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

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredSocieties, setFilteredSocieties] = useState([]);

  const getEventsFromAsyncStorage = async () => {
    const storedEvents = await AsyncStorage.getItem("@events");
    if (!storedEvents) {
      setEvents(sampleEvents);
      setFilteredEvents(sampleEvents);
      await AsyncStorage.setItem("@events", JSON.stringify(sampleEvents));
    } else {
      setEvents(JSON.parse(storedEvents));
      setFilteredEvents(JSON.parse(storedEvents));
    }
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
        // console.log("This route is now unfocused.");
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

  const formatEventTime = (start) => {
    const startDate = dayjs(start);
    return `${startDate.format("HH:mm")} | ${startDate.format("ddd, MMM Do")}`;
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      {/* Search Bar */}
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
          paddingVertical: 10,
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
          onPress={() => setHideConstraints(!hideConstraints)}
        >
          <FontAwesome6 name="sliders" size={20} color="white" />
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
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                alignItems: "center",
                padding: 10,
                borderWidth: 2,
                borderColor: "#64CEC2",
                backgroundColor: category == x ? "#B0F0CA" : "white",
              }}
            >
              <Text
                style={{
                  fontFamily: "Bold",
                  color: colours.light.text,
                  fontSize: 18,
                }}
              >
                {x}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Filter Button */}
      <FloatingButton
        IconComponent={FontAwesome6}
        iconName="sliders"
        iconSize={32}
        iconColor="white"
        onPress={() => setHideConstraints(!hideConstraints)}
        shadowColor={colours.light.highlightGreen}
        buttonColor="#64CEC2"
        padding={12}
      />
      {!hideConstraints && (
        <View
          style={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderWidth: 2,
            borderColor: colours.light.primaryGreen,
            padding: 10,
            zIndex: 1,
            width: "100%",
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
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

      {/* Results */}
      <View
        style={{
          width: "100%",
          flexShrink: 1,
          backgroundColor: "white",
          // borderTopColor: colours.light.primaryGreen,
          // borderTopWidth: 2,
        }}
      >
        {(category == categories.all || category == categories.events) && (
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexShrink: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: 24,
                color: "#005A6D",
                marginBottom: 10,
              }}
            >
              Events
            </Text>
            <ScrollView
              horizontal={false}
              style={{
                display: "flex",
                flexDirection: "column",
                paddingVertical: 10,
                width: "100%",
              }}
            >
              <View style={{ gap: 10, width: "100%" }}>
                {filteredEvents.map((params, index) => (
                  <Pressable
                    key={index}
                    onPress={() => navigation.navigate("events/event", params)}
                  >
                    <View
                      style={{
                        padding: 10,
                        borderRadius: 28,
                        backgroundColor: params.colour || colours.light.text,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        gap: 10,
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
                      <View
                        style={{
                          gap: 10,
                          overflow: "scroll",
                          flexShrink: 1,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Bold",
                            fontSize: 20,
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
                          <Ionicons name="time" size={24} color="white" />
                          <Text style={{ color: "white" }} numberOfLines={1}>
                            {!params.start
                              ? "undefined start"
                              : formatEventTime(params.start)}
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
                            color="white"
                          />
                          <Text style={{ color: "white" }} numberOfLines={3}>
                            {!params.location
                              ? "undefined location"
                              : params.location}
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
              style={{
                fontFamily: "Bold",
                fontSize: 24,
                color: "#005A6D",
                marginBottom: 10,
              }}
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

                padding: 10,
                width: "100%",
                minHeight: 140,
              }}
            >
              <View
                style={{
                  gap: 10,
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
                      <Text
                        style={{
                          fontFamily: "Bold",
                          lineHeight: 16,
                          fontSize: 16,
                          color: colours.light.text,
                          marginTop: 10,
                        }}
                        numberOfLines={1}
                      >
                        {params.name}
                      </Text>
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
              style={{
                fontFamily: "Bold",
                fontSize: 24,
                color: "#005A6D",
                marginBottom: 10,
              }}
            >
              Societies
            </Text>
            <ScrollView
              horizontal={true}
              style={{
                display: "flex",
                flexDirection:
                  category == categories.societies ? "column" : "row",
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
                    <Text
                      style={{
                        fontFamily: "Bold",
                        lineHeight: 16,
                        fontSize: 16,
                        color: colours.light.text,
                        marginTop: 10,
                      }}
                      numberOfLines={1}
                    >
                      {params.name}
                    </Text>
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
