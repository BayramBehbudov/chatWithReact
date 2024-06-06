import Login from "./components/LoginAccount.jsx";
import Create from "./components/CreateAccount.jsx";
import { useState } from "react";

const Index = () => {
  const [page, setPage] = useState("login");
  return (
    <div>
      {page === "login" ? (
        <Login navPage={setPage} />
      ) : (
        <Create navPage={setPage} />
      )}
    </div>
  );
};

export default Index;
