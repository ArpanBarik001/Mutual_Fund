import './App.css';
import Register from './component/Register.js';
import Login from './component/Login.js';
import Landing from './component/Landing.js';
import Fund from './component/Fund.js';
import SavedFunds from './component/SavedFunds.js';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/landing" element={<Landing/>} />
        <Route path="/fund/:code" element={<Fund/>} />
        <Route path="/saved" element={<SavedFunds />} />
      </Routes>
     </BrowserRouter>
  );
}

export default App;