import React from "react";
import Mynav from "./component/Mynav";
import RouterSwitch from "./RouteSwitch";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <BrowserRouter>
        <Mynav onSearch={handleSearch} />
        <RouterSwitch searchQuery={searchQuery} />
      </BrowserRouter>
    </div>
  );
};

export default App;
