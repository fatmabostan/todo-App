import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../src/firebase/UserProvider";
import {
  addTask,
  getUndone,
  getUserNameByEmail,
  updateTaskStatus,
} from "../../src/firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/colors";
import FormField from "../../src/components/FormField";
import CustomButton from "../../src/components/CustomButton";
import Checkbox from "expo-checkbox";
import Greet from "../../src/components/Greet";
import Empty from "../../src/components/Empty";
import SkeletonLoader from "../../src/components/Skeleton";


const Undone = () => {
  const { user, setUserName, userName } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [undoneList, setUndoneList] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const name = await getUserNameByEmail(user.email);
          setUserName(name);
          const toDo = await getUndone(user.email);
          setUndoneList(toDo);
          while(!setUndoneList){ }
          console.log("Güncellenmiş toDoList:", undoneList);
        } catch (error) {
          console.error("Veri alma sırasında hata:", error);
        } finally {
          setLoading(false)
        }
      }
    };
    fetchData();
  }, []);

  async function submit() {
    if (!taskDescription.trim()) {
      alert('Please enter a task description');
      return;
    }
    else{
      const todo = await addTask(user.email, taskDescription);
      setTaskDescription("");
      setUndoneList(todo);
    }
  }

  const handleCheckboxChange = (item, newValue) => {
    const newData = undoneList.map((newItem) => {
      if (newItem.id == item.id) {
        return {
          ...newItem,
          selected: newValue,
        };
      }
      return newItem;
    });
    updateTaskStatus(user.email, item.id, newValue);
    setUndoneList(newData);
  };

 const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.itemContainer}>
          <Checkbox
            value={item.selected}
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
         <View style={{flex: 1, padding: 10}}>
         <SkeletonLoader width={200} height={100} />
         <SkeletonLoader width={300} height={120} position="center"/>
         <SkeletonLoader width={100} height={50} position="center"/>
         <FlatList
           data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
           renderItem={() => <SkeletonLoader width="100%" height={40} />}
           keyExtractor={(item, index) => index.toString()}
         />
       </View> 
      ) : (
        <View style={styles.container}>
          <View style={styles.firstContainer}>
            <Greet userName={userName} />
            <View style={styles.formContainer}>
              <FormField height={88} placeholder="write a task"
                value={taskDescription}
                onChangeText={setTaskDescription}
                multiline={true}
              />
              <CustomButton width="30%" 
              text="Submit" 
              handlePress={submit} />
            </View>
          </View>
          <FlatList
            data={undoneList}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
            <Empty />
            }
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Undone;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.borderColor,
  },
  container: {
    flex: 1,
  },
  firstContainer: {
    borderBottomWidth: 2,
    marginBottom: 5,
  },
  listContent: {
    paddingBottom: 100,
  },
  formContainer: {
    marginBottom: 11,
    gap: 5,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
});
