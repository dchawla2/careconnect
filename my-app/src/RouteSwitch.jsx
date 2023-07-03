import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./About";
import Home from "./Home";
import Illnesses from "./Illnesses";
import Drugs from "./Drugs.js";
import HealthcareProviders from "./HealthcareProviders";
import Illness from "./Illness";
import Drug from "./Drug";
import HealthcareProvider from "./HealthcareProvider";
import SearchOverall from "./component/SearchOverall";
import Visualizations from "./Visualizations";
import ProviderVisualizations from "./ProviderVisualizations";

const RouteSwitch = ({searchQuery}) => {

  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/illnesses" element={<Illnesses />} />
        <Route path="/illnesses/:id" element={<Illness />} />
        <Route path="/drugs" element={<Drugs />} />
        <Route path="/drugs/:id" element={<Drug />} />
        <Route path="/visualizations" element={<Visualizations />} />
        <Route path="/providerVisualizations" element={<ProviderVisualizations />} />
        <Route path="/hp" element={<HealthcareProviders />} />
        <Route path="/healthcare-providers/:id" element={<HealthcareProvider />} />
        <Route path="/search/:query" element={<SearchOverall query = {searchQuery} />} />
      </Routes>

  );
};

export default RouteSwitch;
