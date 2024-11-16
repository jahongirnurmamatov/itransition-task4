import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import {Routes,Route} from 'react-router-dom'
import { useAuthStore } from "./store/authStore"

const App = () => {
  const {user} = useAuthStore();
  return (
    <div >
      <Routes>
        <Route path="/" element={!user? <LoginPage /> : <HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App