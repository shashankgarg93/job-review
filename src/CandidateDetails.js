import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useConstructor=(callBack = async() => {}) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
  }

const CandidateDetail = () => {

    const [userData, setData] = useState([]);
    const [status,setStatus] = useState('');
    

    const  { contact }  = useParams();

    useConstructor(async() => {

        await axios.get("http://127.0.0.1:8000/getCandidateDetail/",{params:{
            contact : contact
        }}).then(response => {
            setData(response.data.message);
            setStatus(response.data.message[0].status);
            
            console.log(userData);

            console.log(response.data.message);
        });

    })

    const doStatusUpdate = (event) => {
        setStatus(event.target.value);
    }

    const doSubmit = async () => {

        let data = {
            contact : contact,
            status : status
        }

        await axios.post("http://127.0.0.1:8000/updateStatus/",data).then((res) => {

        console.log(res);

        }).catch((err) => {
            console.log(err);
        })
    }

    // useEffect(() => {

    //     async function fetchData() {

    //         await axios.get("http://127.0.0.1:8000/getCandidateDetail/",{params : {
    //             contact : contact
    //         }}).then(res => {
    //             setData(res.data.message);
    //             setBusy(false);
    //             console.log(userData);
    //             console.log(res);
    //         })
    //     }

    //     fetchData();;
    // },[isbusy]);
  
    return (
        <div>
            {
              userData.length===0 ? (<p>Loading</p>) : 
              (
                <div>
                    Hello {userData[0].full_name} 
                    <br />
                    <select value={status} onChange={doStatusUpdate}>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Applied">Applied</option>
                    </select>

                    <div>
                        <h3>Work History</h3>
                        {userData[1].length === 0 ? 'No Work History' : (<table border={1}>
                            <thead>
                            <tr>
                                <th>School</th>
                                <th>Passing Year</th>
                                <th>CGPA</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>{userData[1].school}</td>
                                <td>{userData[1].passing_year}</td>
                                <td>{userData[1].cgpa}</td>
                            </tr>
                            </tbody>

                        </table>)
                    }
                        
                    </div>

                    <div>
                        <h3>Education History</h3>

                        {userData[2].length === 0 ? 'No Education History' : 
                        
                        (<table border={1}>
                            <thead>
                            <tr>
                                <th>School</th>
                                <th>Passing Year</th>
                                <th>CGPA</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                                {userData[2].map(education => (
                                    <tr key={education.id}>
                                        <td>{education.school}</td>
                                        <td>{education.passing_year}</td>
                                        <td>{education.cgpa}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>)}
                    </div>

                    <button onClick={doSubmit}>Submit</button>

                </div>
              )
              
              
            }       
        </div>
    );

}

export default CandidateDetail;