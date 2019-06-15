import React from "react";
// import "./App.css";
import Layout from "./Layout/Layout";
import Cart from "./containers/Cart/Cart";

const App: React.FC = () => {
  // return <div className="App" />;
  return (
    <Layout>
      <Cart />
    </Layout>
  );
};

export default App;
