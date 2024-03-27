import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppLayout } from "./layout/appLayout.component";
import { HomePage } from "./pages/homePage/home.page";
import { StatsPage } from "./pages/statsPage/stats.page";

import { ModalProvider } from "./context/modalContext";
import { WorkoutProvider } from "./context/workoutContext";
import { CalendarProvider } from "./context/calendarContex";

import "./globalStyles/global.styles.css";

export const App = () => {
  return (
    <CalendarProvider>
      <WorkoutProvider>
        <ModalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<HomePage />} />
              </Route>
            </Routes>
          </Router>
        </ModalProvider>
      </WorkoutProvider>
    </CalendarProvider>
  );
};

export default App;
