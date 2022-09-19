import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Protected from "./components/Protected";
import ChatHandler from "./components/ChatHandler";

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='/register' element={<RegistrationForm />} />
      <Route path ='/chat' element={<ChatHandler />} />
      <Route path='/protected' element={<Protected />} />
    </Routes>
  );
}

export default App;
