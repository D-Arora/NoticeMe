import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import CommentCard from "../../components/CommentCard";
import PendingRequest from "../../components/PendingRequest";
import colours from "../../colours.js";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import ArrowRight from "../../assets/icons/arrow-right.svg";
import NotificationDot from "../../assets/icons/NotificationDot.svg";
import AlertCard from "../../components/AlertCard";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useNavigation,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";

export default function Activity() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
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
  const [showPendingRequests, setShowPendingRequests] = useState(false);

  const togglePendingRequests = () => {
    setShowPendingRequests((prev) => !prev);
  };

  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, name: "John Doe", members: "12 mutual friends" },
    { id: 2, name: "Jane Smith", members: "7 mutual friends" },
    { id: 3, name: "Sam Baker", members: "8 mutual friends" },
    { id: 4, name: "Jayden Reece", members: "10 mutual friends" },
  ]);

  // Remove request and show an alert
  const handleRemoveRequest = (id, action) => {
    const request = pendingRequests.find((request) => request.id === id);
    setPendingRequests((requests) =>
      requests.filter((request) => request.id !== id)
    );

    if (request) {
      showAlert(
        `${request.name}'s follow request has been ${action}.`,
        action === "accepted" ? "success" : "error"
      );
    }
  };

  // Alert state for handling messages and visibility
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  // Function to handle showing alerts
  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/BackgroundGradient.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.pendingRequests}>
          <NotificationDot
            width={15}
            style={{ position: "absolute", left: 158 }}
          />
          <Text style={{ fontSize: 16, color: colours.light.text, fontFamily: "Regular"}}>
            Pending Requests ({pendingRequests.length})
          </Text>
          <TouchableOpacity onPress={togglePendingRequests}>
            {showPendingRequests ? (
              <ArrowDown width={30} />
            ) : (
              <ArrowRight width={30} />
            )}
          </TouchableOpacity>
        </View>

        {showPendingRequests &&
          pendingRequests.map((request) => (
            <PendingRequest
              key={request.id}
              name={request.name}
              members={request.members}
              onAccept={() => handleRemoveRequest(request.id, "accepted")}
              onDecline={() => handleRemoveRequest(request.id, "declined")}
            />
          ))}

        <View style={styles.activity}>
          <Text style={styles.heading1}>Recent Activity</Text>
          <CommentCard
            name="PsychSoc Discussions on Duality"
            time="3 hours ago"
            comment="Alvin Yang replied to your comment:"
            description="this is such an amazing opportunity!"
          />
          <NotificationDot
            width={15}
            style={{ position: "absolute", right: 0, top: 43 }}
          />
          <CommentCard
            name="NeuroSoc x MedSciSoc BBQ"
            time="4 hours ago"
            comment="Vanessa Shang, Judith Ward and Mary Nguyen liked your comment:"
            description="did someone say free food??"
          />
        </View>
      </View>
      <AlertCard
        message={alertMessage}
        type={alertType}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        style={styles.alertContainer}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    padding: 20,
    flex: 1,
  },
  pendingRequests: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  requestsList: {
    marginBottom: 20,
  },
  heading1: {
    fontSize: 30,
    color: colours.light.text,
    marginBottom: 10,
    fontFamily: "Bold",
  },
  alertContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
});
