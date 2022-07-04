import { useState } from "react";
import { AuthContext } from "./nicknameStore";

const AuthStore = ({ children }) => {
  const [userData, setUserData] = useState({ name: null, token: null, color: null});

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthStore;
