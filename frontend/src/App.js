import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import UserForm from "./components/user-form";
import UserList from "./components/user-list";

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleShowList = () => {
    setShowForm(false);
  };

  return (
    <div className="content">
      <div className="header">
        <h1 className="logo">CMS</h1>
        <h3 onClick={handleShowList}>User List</h3>
        <button id="new-user-btn" onClick={handleShowForm}>
          Add new user
        </button>
      </div>
      <div className="component-container">
        {showForm ? <UserForm /> : <UserList />}
      </div>
    </div>
  );
}

export default App;
