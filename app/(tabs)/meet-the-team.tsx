import { ScreenHeader } from "@/components/ui/screen-header";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MeetTheTeam() {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Meet the Team" showBack onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Team Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.teamText}>Team</Text>
          <View style={styles.sebenContainer}>
            <Text style={[styles.sebenLetter, { color: "#0EA5D8" }]}>S</Text>
            <Text style={[styles.sebenLetter, { color: "#0EA5D8" }]}>E</Text>
            <Text style={[styles.sebenLetter, { color: "#F5A623" }]}>B</Text>
            <Text style={[styles.sebenLetter, { color: "#0EA5D8" }]}>E</Text>
            <Text style={[styles.sebenLetter, { color: "#0EA5D8" }]}>N</Text>
          </View>
        </View>

        {/* Team Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/seben.png")}
            style={styles.teamImage}
            resizeMode="contain"
          />
        </View>

        {/* Contact Us Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contact Us</Text>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/joko.png")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Joko Ymmanuel Comia</Text>

            <View style={styles.socialIcons}>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-instagram" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-facebook" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-github" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-linkedin" size={20} color="#1a1a1a" />
              </Pressable>
            </View>
          </View>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/wincel.png")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Wincel Crusit</Text>

            <View style={styles.socialIcons}>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-instagram" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-facebook" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-github" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-linkedin" size={20} color="#1a1a1a" />
              </Pressable>
            </View>
          </View>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/freesia.png")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Freesia Mae Masakayan</Text>

            <View style={styles.socialIcons}>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-instagram" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-facebook" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-github" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-linkedin" size={20} color="#1a1a1a" />
              </Pressable>
            </View>
          </View>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/neil.png")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Neil Patrick Pajadan</Text>

            <View style={styles.socialIcons}>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-instagram" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-facebook" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-github" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-linkedin" size={20} color="#1a1a1a" />
              </Pressable>
            </View>
          </View>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/gio.png")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Gio Andrew Briones</Text>

            <View style={styles.socialIcons}>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-instagram" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-facebook" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-github" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-linkedin" size={20} color="#1a1a1a" />
              </Pressable>
            </View>
          </View>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/nathaniel.png")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Nathaniel Segovia</Text>

            <View style={styles.socialIcons}>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-instagram" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-facebook" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-github" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-linkedin" size={20} color="#1a1a1a" />
              </Pressable>
            </View>
          </View>

          <View style={styles.contactCard}>
            <Image
              source={require("@/assets/images/joel.png")}
              style={styles.contactImage}
              resizeMode="contain"
            />
            <Text style={styles.contactName}>Patrick Joel Fernandez</Text>

            <View style={styles.socialIcons}>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-instagram" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-facebook" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-github" size={20} color="#1a1a1a" />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <Ionicons name="logo-linkedin" size={20} color="#1a1a1a" />
              </Pressable>
            </View>
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  titleContainer: {
    marginBottom: 30,
  },
  teamText: {
    fontSize: 130,
    fontWeight: "900",
    color: "#1a1a1a",
    textAlign: "center",
  },
  sebenContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    marginTop: -40,
  },
  sebenLetter: {
    fontSize: 110,
    fontWeight: "900",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  teamImage: {
    width: 350,
    height: 350,
    borderRadius: 20,
  },
  contactSection: {
    marginTop: 60,
    width: "100%",
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: "600",
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
    fontWeight: "600",
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
