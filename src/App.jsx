import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layout/appLayout.component';

import { HomePage } from './pages/homePage/home.page';
import { WorkoutPage } from './pages/workoutPage/workout.page';
import { StatsPage } from './pages/statsPage/stats.page';

export const App = () => {

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/workouts' element={<WorkoutPage />} />
          <Route path='/stats' element={<StatsPage />} />
        </Routes>
      </AppLayout>
    </Router>
  )

}

export default App;
