import axios from "axios";
import React, { useEffect, useState } from "react";
import  UserList  from "./UserList";
import {
  BrowserRouter as Router,
  Routes,
  Route
 
} from "react-router-dom";
import CandidateDetail from "./CandidateDetails";
import Register from "./Register";
const App = () => {
  const [users, setUsers] = useState([])

  const fetchData = () => {
    axios.get("http://127.0.0.1:8000/getCandidates/").then(response => {
      setUsers(response.data.message);
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="" element={<UserList users={users} />} >
       
        </Route>
      
        <Route path="/CandidateDetails/:contact" element={<CandidateDetail />}></Route>
        <Route path="/Register" element={<Register />}></Route>
      </Routes>
    
    </Router>
  )
}

export default App;
// {<div>
     
//   {/* <CandidateDetail /> */}
// // </div>}
// {users.length > 0 &&
//   <UserList users={users} />}