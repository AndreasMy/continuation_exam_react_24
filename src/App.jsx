import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppLayout } from "./layout/appLayout.component";
import { HomePage } from "./pages/homePage/home.page";
import { WorkoutPage } from "./pages/workoutPage/workout.page";
import { StatsPage } from "./pages/statsPage/stats.page";

import { ModalProvider } from "./context/modalContext";
import { WorkoutProvider } from "./context/workoutContext";

import "./globalStyles/global.styles.css";

export const App = () => {
  return (
    <WorkoutProvider>
      <Router>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="workouts" element={<WorkoutPage />} />
              <Route path="stats" element={<StatsPage />} />
            </Route>
          </Routes>
        </ModalProvider>
      </Router>
    </WorkoutProvider>
  );
};

export default App;
