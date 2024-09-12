import React, { createContext, useState, useContext } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [doneTask, setDoneTask] = useState(null);
  const [undoneTask, setUndoneTask] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userName,
        setUserName,
        doneTask,
        undoneTask,
        setDoneTask,
        setUndoneTask,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
