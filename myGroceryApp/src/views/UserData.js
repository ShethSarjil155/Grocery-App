// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// const UserData = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Text style={styles.backText}>⬅ Back</Text>
//       </TouchableOpacity>

//       <Text style={styles.title}>User Data</Text>

//       <View style={styles.userCard}>
//         <Text>User 1: John Doe</Text>
//       </View>
//       <View style={styles.userCard}>
//         <Text>User 2: Alice</Text>
//       </View>
//       <View style={styles.userCard}>
//         <Text>User 3: Bob</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 20,
//   },
//   backButton: {
//     position: "absolute",
//     top: 40,
//     left: 20,
//   },
//   backText: {
//     fontSize: 16,
//     color: "#007BFF",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#333",
//   },
//   userCard: {
//     backgroundColor: "#fff",
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });

// export default UserData;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const UserData = ({ navigation }) => {
  const [users, setUsers] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Runs once on mount

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>User Data</Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {users.length === 0 ? (
            <Text style={styles.noDataText}>No users found</Text>
          ) : (
            users.map((user, index) => (
              <View key={index} style={styles.userCard}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Softer gray background
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1, // Ensure it stays on top
  },
  backText: {
    fontSize: 18,
    color: "#007BFF",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 80, // Space for back button
    marginBottom: 20,
    textAlign: "center",
    color: "#1a1a1a", // Darker text for contrast
  },
  scrollContainer: {
    paddingBottom: 20, // Extra padding at the bottom of ScrollView
  },
  userCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 15, // Smoother corners
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8, // Slightly higher elevation for depth
    borderLeftWidth: 4, // Color accent on the left
    borderLeftColor: "#007BFF", // Blue accent
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5, // Space between name and email
  },
  userEmail: {
    fontSize: 14,
    color: "#666", // Lighter gray for email
    fontStyle: "italic", // Subtle distinction
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default UserData;
