// import axios from "axios"
import {Link} from "react-router-dom"
const UserList = (props) => {

    
    const userData = props.users.map(user => {
       
        return (
            <tr key={user.contact}>
                <Link to={{pathname:"/CandidateDetails/"+user.contact}} >
                <td>{user.full_name}</td>
                </Link>
                <td>{user.contact}</td>
                <td>{user.status}</td>
                
            </tr>
        )
    })

    return (
        <div>
        <table border={1}>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Contact</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {userData}
            </tbody>
        </table>
        <Link to={{pathname:"/Register"}}>Apply</Link>
        </div>

    );
    
}

export default UserList;



// onClick={()=>{

//     axios.get("http://127.0.0.1:8000/getCandidateDetail/",{params:{
//         contact : user.contact
//     }}).then(res => {
//         console.log(res.data.message);
//     })

// }}