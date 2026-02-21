import { ScreenHeader } from "@/components/ui/screen-header";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MeetTheTeam() {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Meet the Team"
        showBack
        onBackPress={() => router.back()}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Team Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.teamText}>Team</Text>
          <View style={styles.sebenContainer}>
            <Text style={[styles.sebenLetter, { color: "#0EA5D8" }]}>S</Text>
            <Text style={[styles.sebenLetter, { color: "#27B1A8" }]}>E</Text>
            <Text style={[styles.sebenLetter, { color: "#F5A623" }]}>B</Text>
            <Text style={[styles.sebenLetter, { color: "#27B1A8" }]}>E</Text>
            <Text style={[styles.sebenLetter, { color: "#0EA5D8" }]}>N</Text>
          </View>
        </View>

        {/* Team Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/dev-characters/seben.webp")}
            style={styles.teamImage}
            resizeMode="contain"
          />
        </View>

        {/* Contact Us Section */}
        <View style={styles.contactSection}>
          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/dev-characters/joko.webp")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Joko Ymmanuel Comia</Text>
          </View>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/dev-characters/wincel.webp")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Wincel Crusit</Text>
          </View>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/dev-characters/freesia.webp")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Freesia Mae Masakayan</Text>
          </View>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/dev-characters/neil.webp")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Neil Patrick Pajadan</Text>
          </View>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/dev-characters/gio.webp")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Gio Andrew Briones</Text>
          </View>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/dev-characters/nathaniel.webp")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Nathaniel Segovia</Text>
          </View>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/dev-characters/joel.webp")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Patrick Joel Fernandez</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleContainer: {
    marginBottom: -60,
  },
  teamText: {
    fontSize: 100,
    fontFamily: "Poppins_700Bold",
    color: "#343235",
    textAlign: "center",
    lineHeight: 100,
  },
  sebenContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
    marginTop: -20,
  },
  sebenLetter: {
    fontSize: 100,
    fontFamily: "Poppins_700Bold",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  teamImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  contactSection: {
    marginTop: 20,
    width: "100%",
  },
  contactTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 20,
    textAlign: "center",
  },
  contactCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 280,
    alignSelf: "center",
    marginBottom: 24,
  },
  contactImage: {
    width: 250,
    height: 250,
    marginBottom: 16,
  },
  contactName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#1a1a1a",
    marginBottom: 16,
    textAlign: "center",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
});
