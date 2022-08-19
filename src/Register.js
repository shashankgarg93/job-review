import { useState } from "react";
import axios from 'axios';

const Register = ()=> {

    const [details,setDetails] = useState({full_name:"",contact:""});
    const [resume,setResume] = useState(null);
    const [edu,setEdu] = useState([{passing_year:"",school:"",degree:"",cgpa:""}]);
    const [work,setWork] = useState([{startYear:"",endYear:"",company:"",work_exp:"",designation:""}]);


    
    const handleChange = (event) => {

        const {name , value} = event.target;

        setDetails((prev) => ({
            ...prev,
            [name] : value
        }));
    }

    const handleEduRemove=(index)=>{
        const list=[...edu];
        list.splice(index,1);
        setEdu(list);
      }

    const handleWorkRemove=(index)=>{
        const list=[...work];
        list.splice(index,1);
        setWork(list);
      }

      const handleAddEdu=()=>{
        setEdu([...edu,{passing_year:"",school:"",degree:"",cgpa:""}]);
      }

      const handleAddWork=()=>{
        setWork([...work,{startYear:"",endYear:"",company:"",work_exp:"",designation:""}]);
      }

      const handleSubmit = () => {

        const fd = new FormData();

        fd.append('full_name',details.full_name);
        fd.append('contact',details.contact);
        fd.append('resume',resume);
        fd.append('edhistory',JSON.stringify(edu));
        fd.append('whistory',JSON.stringify(work));

        axios.post("http://127.0.0.1:8000/addCandidate/",fd,
        {headers: {
            "Content-Type": "multipart/form-data"
        }}).then((response) => {
            console.log(response);
        })

      }

    return (
        <div className="container">
            <h1>Registeration Form</h1>
            <form>
                <div>
                    <label>Full Name   </label>
                    <input type="text" name="full_name" value={details.full_name} onChange={handleChange} />

                    <br />

                    <label>Contact   </label>
                    <input type="text" name="contact" value={details.contact} onChange={handleChange} />
                </div>
                <br />
                <div>
                    <label>Upload your Resume:  </label>
                    <input type="file" name="resume" onChange={(e)=>{setResume(e.target.files[0])}} />
                </div>

                <br />
                <div>
                    <h3>Education</h3>
                    {edu.map((ele,i)=>{
                        
                        return(
                        <div className="row" style={{marginTop:'5px'}}>
                            <div className="col" style={{float:'left'}}>
                                <label>Passing Year  </label>
                                <input type="text" name="passing_year" value={ele.passing_year} onChange={(e) => {
                                    const list=[...edu];
                                    list[i].passing_year=e.target.value;
                                    setEdu(list);
                                }} />
                            </div>

                            <div className="col" style={{float:'left',marginLeft:'5px'}}>
                                <label>School  </label>
                                <input type="text" name="school" value={ele.school} onChange={(e) => {
                                    const list=[...edu];
                                    list[i].school=e.target.value;
                                    setEdu(list);
                                }} />
                            </div>

                            <div className="col" style={{float:'left',marginLeft:'5px'}}>
                                <label>Degree  </label>
                                <input type="text" name="degree" value={ele.degree} onChange={(e) => {
                                    const list=[...edu];
                                    list[i].degree=e.target.value;
                                    setEdu(list);
                                }} />
                            </div>

                            <div className="col" style={{float:'left',marginLeft:'5px'}}>
                                <label>CGPA  </label>
                                <input type="text" name="cgpa" value={ele.cgpa} onChange={(e) => {
                                    const list=[...edu];
                                    list[i].cgpa=e.target.value;
                                    setEdu(list);
                                }} />
                            </div>
                            
                           <div className="col">
                           {edu.length !== 1 && edu.length === i+1 && <button style={{background:'#f4f4f5'}}
  className="mr10 btn"
  onClick={() => {handleEduRemove(i)}}><span><i class="fas fa-trash" style={{color:"crimson" ,fontSize:"25px"}}></i></span></button>}
{edu.length - 1 === i && <button style={{background:'#f4f4f5',marginLeft:'5px'}} className="btn" onClick={handleAddEdu}><span><i class="fas fa-plus" style={{fontSize:"25px"}}></i></span></button>}
                           </div>
                        </div>
                        );

                    })}

                </div>
                <br />
                
                <div>
                    <h3>Work History</h3>
                    {work.map((ele,i)=>{
                        
                        return(
                        <div className="row" style={{marginTop:'5px'}}>
                            <div className="col" style={{float:'left'}}>
                                <label>Start Year  </label>
                                <input type="text" name="startYear" value={ele.startYear} onChange={(e) => {
                                    const list=[...work];
                                    list[i].startYear=e.target.value;
                                    setWork(list);
                                }} />
                            </div>

                            <div className="col" style={{float:'left',marginLeft:'5px'}}>
                                <label>End Year  </label>
                                <input type="text" name="endYear" value={ele.endYear} onChange={(e) => {
                                    const list=[...work];
                                    list[i].endYear=e.target.value;
                                    setWork(list);
                                }} />
                            </div>

                            <div className="col" style={{float:'left',marginLeft:'5px'}}>
                                <label>Company  </label>
                                <input type="text" name="company" value={ele.company} onChange={(e) => {
                                    const list=[...work];
                                    list[i].company=e.target.value;
                                    setWork(list);
                                }} />
                            </div>

                            <div className="col" style={{float:'left',marginLeft:'5px'}}>
                                <label>Work Experience  </label>
                                <input type="text" name="work_exp" value={ele.work_exp} onChange={(e) => {
                                    const list=[...work];
                                    list[i].work_exp =e.target.value;
                                    setWork(list);
                                }} />
                            </div>

                            <div className="col" style={{float:'left',marginLeft:'5px'}}>
                                <label>Designation  </label>
                                <input type="text" name="designation" value={ele.designation} onChange={(e) => {
                                    const list=[...work];
                                    list[i].designation =e.target.value;
                                    setWork(list);
                                }} />
                            </div>
                            
                           <div className="col">
                           {work.length !== 1 && work.length === i+1 && <button style={{background:'#f4f4f5'}}
  className="mr10 btn"
  onClick={() => {handleWorkRemove(i)}}><span><i class="fas fa-trash" style={{color:"crimson" ,fontSize:"25px"}}></i></span></button>}
{work.length - 1 === i && <button style={{background:'#f4f4f5',marginLeft:'5px'}} className="btn" onClick={handleAddWork}><span><i class="fas fa-plus" style={{fontSize:"25px"}}></i></span></button>}
                           </div>
                        </div>
                        );

                    })}
                </div>
                <br />

                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>

            </form>

        </div>
    );

}

export default Register;