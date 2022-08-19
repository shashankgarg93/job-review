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
    const [statusChange,setStatusChange] = useState(false);
    

    const  { contact }  = useParams();

    useConstructor(async() => {

        await axios.get("http://127.0.0.1:8000/getCandidateDetail/",{params:{
            contact : contact
        }}).then(response => {
            setData(response.data.message);
            setStatus(response.data.message[0].status);

            console.log(response.data.message);

        });

    })

    const doStatusUpdate = (event) => {
        let userStatus = userData[0].status;
        let currentStatus = event.target.value;

        setStatus(currentStatus);
        setStatusChange(currentStatus !== userStatus);
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

        window.location.reload();
    }

    const doDownload = () => {
       let file = "http://127.0.0.1:8000" + userData[0].resume;
        console.log(file);
             /*const blob = new Blob([file], {type: 'application/pdf'});
             const link = document.createElement('a');
             link.href = file;//window.URL.createObjectURL(blob);
             link.download = 'resume.pdf';
             //console.log(blob);
             console.log(link);
             document.body.appendChild(link);
             link.click();

             setTimeout(function() {
               document.body.removeChild(link);
           }, 100);
            */
           window.open(file);

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
        <div className="container">
            {
              userData.length===0 ? (<p>Loading</p>) : 
              (
                <div>
                    
                    <h1> Candidate details</h1>
                    <hr></hr>
                
                    <div className="row">

                        <div className="col-md-4">
                            <h3>Candidate Name: {userData[0].full_name}</h3>
                        </div>

                        <div className="col-md-3 offset-md-2 form-group">

                        <select value={status} onChange={doStatusUpdate} className="mt-2" style={{width:'250px',}}>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Applied">Applied</option>
                        </select>
                        </div>
                        
                        {statusChange && (<div className="col-md-1" >
                        <button className="btn btn-outline-primary" onClick={doSubmit}>Submit</button>
                        </div>)}

                    </div>

                    <div className="row">
                        <div className="col-md-3">
                        <button className="btn btn-outline-dark" onClick={doDownload}>Download Resume</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <br /><br />
                        <h3>Work History</h3>
                        {userData[1].length === 0 ? 'No Work History' : (<table border={1} className="table table-striped">
                            <thead>
                            <tr>
                                <th>Company</th>
                                <th>Designation</th>
                                <th>Start Year</th>
                                <th>End Year</th>
                                <th>Work Experience</th>
                            </tr>
                            </thead>

                            <tbody>
                                {userData[1].map(work => (
                                    <tr key={work.id}>
                                        <td>{work.company}</td>
                                        <td>{work.designation}</td>
                                        <td>{work.startYear}</td>
                                        <td>{work.endYear}</td>
                                        <td>{work.work_exp}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>)
                    }
                        </div>
                        
                        
                    </div>

                    <div className="row">
                        <div className="col">
                            <br /><br />
                        <h3>Education History</h3>

                        {userData[2].length === 0 ? 'No Education History' : 
                        
                        (<table border={1} className="table table-striped"> 
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
                        
                    </div>

                </div>
                
              )
              
              
            }       
        </div>
    );

}

export default CandidateDetail;