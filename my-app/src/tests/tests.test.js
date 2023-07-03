// import all components to be tested

import renderer from "react-test-renderer";

import DrugsCard from "../component/Cards/DrugsCard";
import HealthProviderCard from "../component/Cards/HealthProviderCard";
import IllnessCard from "../component/Cards/IllnessCard";
import App from "../App";
import RouteSwitch from "../RouteSwitch";
import About from "../About";
import ListOfApiCards from "../component/Cards/ListOfApiCards";
import TeamInfoCard from "../component/Cards/TeamInfoCard";
import HealthcareProvider from "../HealthcareProvider";
import FilterDropdown from "../component/FilterDropdown";
import SearchOverall from "../component/SearchOverall";

test("DrugsCard renders correctly", () => {
  const tree = renderer.create(<DrugsCard />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("HealthProviderCard renders correctly", () => {
  const tree = renderer.create(<HealthProviderCard />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("IllnessCard renders correctly", () => {
  const tree = renderer.create(<IllnessCard />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("App renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

// test("RouteSwitch renders correctly", () => {
//   const tree = renderer.create(<RouteSwitch />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

test("About renders correctly", () => {
  const tree = renderer.create(<About />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("ListOfApiCards renders correctly", () => {
  const tree = renderer.create(<ListOfApiCards />).toJSON();
  expect(tree).toMatchSnapshot();
});

// test("DrugInfo renders correctly", () => {
//   const tree = renderer.create(<DrugInfo />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

test("getTotalCommits renders correctly", () => {
  const tree = renderer.create(<getTotalCommits />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("TeamInfoCard renders correctly", () => {
  const tree = renderer.create(<TeamInfoCard />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Site search page renders correctly", () => {
  const tree = renderer.create(<SearchOverall query = {"fin"} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Filter Dropdown renders correctly", () => {
  const tree = renderer.create(<FilterDropdown/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Filter Dropdown Initialized Sort renders correctly", () => {
  const handleSort = (value) => {
    setSort(value)
  }

  const items = [
      "Sort",
      "Drug Name",
      "Company Name"
  ]

  const props = {
    title: "Sort",
    items: items,
    onChange: handleSort,
  };

  const tree = renderer.create(<FilterDropdown props = {props}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Filter Dropdown Initialized Filter renders correctly", () => {
  const handleMarketingStatusFilter = (value) => {
    setMarketingStatus(value)
  }

  const items = [
      "Marketing Status",
      "Prescription",
      "Discontinued"
  ]

  const props = {
    title: "Marketing Status",
    items: items,
    onChange: handleMarketingStatusFilter,
  };

  const tree = renderer.create(<FilterDropdown props = {props}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
