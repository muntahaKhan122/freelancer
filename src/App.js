import './App.css';
import './firebase/config';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProfileSetup from './pages/profileSetup';
import Projects from './pages/projects';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navbar';
import 'firebase/storage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        </Routes>
        
        <Navigation/>
        <Routes>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/profile-setup/:id" element={<ProfileSetup/>}/>
        <Route path="/projects/:id" element={<ProfileSetup/>}/>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
