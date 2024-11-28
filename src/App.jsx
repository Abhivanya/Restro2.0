import React, { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Orders from "./components/Orders";
const App = () => {
  const [added, setAdded] = useState(false);
  const updated = () => {
    setAdded(!added);
  };
  return (
    <div className="app">
      <Header />
      <Form updated={updated} />
      <Orders added={added} updated={updated} />
    </div>
  );
};

export default App;
