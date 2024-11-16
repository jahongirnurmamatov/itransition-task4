import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import {Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App