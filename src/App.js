import React from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Header from "./components/Header";
import PoseList from "./components/PoseList";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<PoseList />} />
            <Route path="/:catID" element={<PoseListWrapper />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

// Component to extract catID from route params and pass it to PoseList
const PoseListWrapper = () => {
  const { catID } = useParams();
  return <PoseList catID={catID || "0"} />;
};

export default App;
