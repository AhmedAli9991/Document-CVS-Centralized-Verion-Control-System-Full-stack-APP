import {
  BrowserRouter as Router,
  Routes,
  Route,Navigate
} from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import Navigation from "./Navigation"
import Login from "./Login Signup/Login"
import Register from "./Login Signup/Register"
import Repositories from "./Repositories/Repositories"
import TextEditor from "./Documents/TextEditor"
import Main from "./Documents/Main"
import CollabRepos from "./Repositories/CollabRepos"
import { AuthProvider } from "./Context/AuthProvider";
import Home from './home'

function App() {

  return (
    <Router>
      <AuthProvider>
       <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route element={<ProtectedRoute />}>
        <Route  element={<Navigation />}>
          <Route path="/Dashboard" element={<Home/>}/>
          <Route path="/Repositories" element={<Repositories/>}/>
          <Route path="/Collaborations" element={<CollabRepos/>}/>
          <Route path="/:Title" element={<Main />}/>
          <Route path="/Edit/:Title" element={<TextEditor />}/>
        </Route>
        </Route>
        <Route path="*"element={<Navigate to="/" />}/>
       </Routes>
       </AuthProvider>
    </Router>
  )
}

export default App
