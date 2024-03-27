import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppLayout } from "./layout/appLayout.component";
import { HomePage } from "./pages/homePage/home.page";
import { StatsPage } from "./pages/statsPage/stats.page";

import { ModalProvider } from "./context/modalContext";
import { WorkoutProvider } from "./context/workoutContext";

import "./globalStyles/global.styles.css";

export const App = () => {
  return (
    <WorkoutProvider>
      <ModalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="stats" element={<StatsPage />} />
            </Route>
          </Routes>
        </Router>
      </ModalProvider>
    </WorkoutProvider>
  );
};

export default App;
