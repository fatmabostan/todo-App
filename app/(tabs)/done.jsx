import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../src/firebase/UserProvider";
import { getDone, updateTaskStatus } from "../../src/firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import Greet from "../../src/components/Greet";
import colors from "../../assets/colors";
import Empty from "../../src/components/Empty";
import SkeletonLoader from "../../src/components/Skeleton";

const Done = () => {
  const { user, userName } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [doneList, setDoneList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const toDo = await getDone(user.email);
          console.log(user);
          setDoneList(toDo);
          while (!setDoneList) {}
          console.log("Güncellenmiş toDoList:", doneList);
        } catch (error) {
          console.error("Veri alma sırasında hata:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (item, newValue) => {
    const newData = doneList.map((newItem) => {
      if (newItem.id == item.id) {
        return {
          ...newItem,
          selected: newValue,
        };
      }
      return newItem;
    });
    updateTaskStatus(user.email, item.id, newValue);
    setDoneList(newData);
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.itemContainer}>
          <Checkbox
            value={item.selected === undefined ? true : item.selected}
            style={styles.itemCheckbox}
            disabled={false}
            onValueChange={(newValue) => handleCheckboxChange(item, newValue)}
          />
          <Text style={styles.itemText}>{item.data.Description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.page}>
      {loading ? (
        <View style={{ flex: 1, padding: 10 }}>
          <SkeletonLoader width={150} height={120} />
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            renderItem={() => <SkeletonLoader width="100%" height={40} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Greet userName={userName} />
          <Text style={styles.pageTitle}>You finished this tasks.</Text>
          <FlatList
            data={doneList}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={<Empty />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Done;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.borderColor,
  },
  pageTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    color: colors.buttonText,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
    marginBottom: 10,
    padding: 12,
    backgroundColor: colors.accentColor,
    borderRadius: 18,
    borderColor: colors.borderColor,
  },
  itemText: {
    fontFamily: "Poppins-Regular",
    display: "flex",
    flexWrap: "wrap",
    width: "85%",
    fontSize: 15,
  },
  itemCheckbox: {
    marginLeft: 5,
    width: 30,
    height: 30,
  },
  listContent: {
    paddingBottom: 100,
  },
});
