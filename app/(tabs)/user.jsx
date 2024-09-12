import { StyleSheet, Text, View, Alert, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { signOutSession } from "../../src/firebase/auth";
import { router } from "expo-router";
import { useUserContext } from "../../src/firebase/UserProvider";
import Greet from "../../src/components/Greet";
import colors from "../../assets/colors";
import CustomButton from "../../src/components/CustomButton";
import { PieChart } from "react-native-gifted-charts";
import { getDone, getUndone } from "../../src/firebase/database";
import SkeletonLoader from "../../src/components/Skeleton";

const User = () => {
  const { user, setUser, userName } = useUserContext();
  const [done, setDone] = useState();
  const [undone, setUndone] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const done = await getDone(user.email);
          const undone = await getUndone(user.email);
          setDone(done?.length);
          setUndone(undone?.length);
        } catch (error) {
          console.error("Veri alma sırasında hata:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  const renderLegend = (text, color) => {
    return (
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <View
          style={{
            height: 45,
            width: 45,
            marginRight: 5,
            borderRadius: 4,
            backgroundColor: color,
          }}
        />
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.chartInfo}>{text}</Text>
        </View>
      </View>
    );
  };

  const handleLogout = async () => {
    try {
      await signOutSession();
      setUser(null);
      router.replace("/");
    } catch (errorMessage) {
      Alert.alert(errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      {loading ? (
        <View style={{ flex: 1, padding: 10, gap: 35 }}>
          <SkeletonLoader width={150} height={120} />
          <SkeletonLoader width={300} height={350} position="center" />
          <SkeletonLoader width={150} height={80} position="center" />
        </View>
      ) : (
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <View>
            <Greet userName={userName} />
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartText}>Task Status</Text>
            <PieChart
              strokeColor="black"
              strokeWidth={5}
              donut
              data={[
                { value: done, color: "#A3D9A5" }, // Pastel Yeşil
                { value: undone, color: "#F6B6B6" }, // Pastel Pembe
              ]}
              innerCircleColor="#414141" // İç çemberin rengi
              showValuesAsLabels={true}
              showText
              textSize={20}
              showTextBackground={true}
              centerLabelComponent={() => {
                return (
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 32,
                        fontWeight: "bold",
                      }}
                    >
                      {done + undone}
                    </Text>
                    <Text style={{ color: "white", fontSize: 15 }}>Tasks</Text>
                  </View>
                );
              }}
            />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 18,
              }}
            >
              {renderLegend("Done", "#A3D9A5")}
              {renderLegend("Undone", "#F6B6B6")}
            </View>
          </View>
          <View style={styles.signOutContainer}>
            <CustomButton
              text="Çıkış Yap"
              width="60%"
              handlePress={handleLogout}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: colors.borderColor,
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  chartText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 25,
    marginBottom: 8,
    color: colors.titleColor,
  },
  signOutContainer: {
    marginBottom: 80,
  },
  chartInfo: {
    fontFamily: "Poppins-Medium",
    color: "black",
    fontSize: 15,
  },
});
