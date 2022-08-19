import React, { useState } from "react";
import axios from 'axios';

const Register = ()=> {
    const [details,setDetails] = useState({full_name:"",contact:""});
    const [resume,setResume] = useState(null);
    const [contactError,setContactError] = useState(true);
    const [edu,setEdu] = useState([{passing_year:"",school:"",degree:"",cgpa:""}]);
    const [work,setWork] = useState([{startYear:"",endYear:"",company:"",work_exp:"",designation:""}]);


    
    const handleChange = (event) => {

        const {name , value} = event.target;

        setDetails((prev) => ({
            ...prev,
            [name] : value
        }));
    }

    const Checkphone = (event)=>
    {
      var pattern = new RegExp(/^[6-9]{1}[0-9]{9}$/);
      setContactError(!pattern.test(event.target.value));
      if(!pattern.test(event.target.value))
      {
        alert('Invalid Contact');
      }
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

      const handleSubmit = (e) => {
        e.preventDefault();

        if(contactError)
        {
            alert('Contact Error');
            return;
        }

        const fd = new FormData();

        fd.append('resume',resume);
        fd.append('full_name',details.full_name);
        fd.append('contact',details.contact);
        fd.append('edhistory',JSON.stringify(edu));
        fd.append('whistory',JSON.stringify(work));

        axios.post("http://127.0.0.1:8000/addCandidate/",fd,
        {headers: {
            "Content-Type": "multipart/form-data"
        }}).then((response) => {
            alert(response.data.message);
            if(response.data.message === 'success')
                window.location.reload();
        })

      }

    return (
        <div className="container">
            <h1>Registration Form</h1>
            <form>
                <div className="row">
                    <div className="col-md-3 form-group">
                        <label>Full Name   </label>
                        <input type="text" className="form-control" name="full_name" value={details.full_name} onChange={handleChange} />

                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Contact   </label>
                        <input type="text" name="contact" className="form-control" value={details.contact} onChange={handleChange} onBlur={Checkphone} />
                    </div>

                    <div className="col-md-6 form-group">
                        <label>Upload Your Resume: </label>
                        <input accept="application/pdf" className="form-control" type="file" name="resume" onChange={(e)=>{
                    setResume(e.target.files[0]);
                    console.log(e.target.files);

                    }} />
                    </div>
                </div>

                <div className="row" style={{marginTop:'10px'}}>
                    <div className="col">
                    <h3>Education</h3>
                    {edu.map((ele,i)=>{
                        
                        return(
                        <div className="row" >
                            <div className="col-md-2">
                                <label>Passing Year  </label>
                                <input type="text" className="form-control" name="passing_year" value={ele.passing_year} onChange={(e) => {
                                    const list=[...edu];
                                    list[i].passing_year=e.target.value;
                                    setEdu(list);
                                }} />
                            </div>

                            <div className="col-md-2" >
                                <label>School  </label>
                                <input type="text" className="form-control" name="school" value={ele.school} onChange={(e) => {
                                    const list=[...edu];
                                    list[i].school=e.target.value;
                                    setEdu(list);
                                }} />
                            </div>

                            <div className="col-md-2">
                                <label>Degree  </label>
                                <input type="text" name="degree" className="form-control" value={ele.degree} onChange={(e) => {
                                    const list=[...edu];
                                    list[i].degree=e.target.value;
                                    setEdu(list);
                                }} />
                            </div>

                            <div className="col-md-2">
                                <label>CGPA  </label>
                                <input type="text" name="cgpa" className="form-control" value={ele.cgpa} onChange={(e) => {
                                    const list=[...edu];
                                    list[i].cgpa=e.target.value;
                                    setEdu(list);
                                }} />
                            </div>
                            
                           <div className="col-md-2">
                           {edu.length !== 1 && edu.length === i+1 && <button style={{background:'#f4f4f5'}}
  className="mr10 btn"
  onClick={() => {handleEduRemove(i)}}><span><i class="fas fa-trash" style={{color:"crimson" ,fontSize:"25px"}}></i></span></button>}
{edu.length - 1 === i && <button style={{background:'#f4f4f5',marginLeft:'5px'}} className="btn" onClick={handleAddEdu}><span><i class="fas fa-plus" style={{fontSize:"25px"}}></i></span></button>}
                           </div>
                        </div>
                        );

                    })}
                    </div>
                    

                </div>
                
                <div className="row">
                    <div className="col">
                    <h3>Work History</h3>
                    {work.map((ele,i)=>{
                        
                        return(
                        <div className="row" style={{marginTop:'5px'}}>
                            <div className="col-md-2" style={{float:'left'}}>
                                <label>Start Year  </label>
                                <input type="text" name="startYear" value={ele.startYear} onChange={(e) => {
                                    const list=[...work];
                                    list[i].startYear=e.target.value;
                                    setWork(list);
                                }} />
                            </div>

                            <div className="col-md-2" style={{float:'left',marginLeft:'5px'}}>
                                <label>End Year  </label>
                                <input type="text" name="endYear" value={ele.endYear} onChange={(e) => {
                                    const list=[...work];
                                    list[i].endYear=e.target.value;
                                    setWork(list);
                                }} />
                            </div>

                            <div className="col-md-2" style={{float:'left',marginLeft:'5px'}}>
                                <label>Company  </label>
                                <input type="text" name="company" value={ele.company} onChange={(e) => {
                                    const list=[...work];
                                    list[i].company=e.target.value;
                                    setWork(list);
                                }} />
                            </div>

                            <div className="col-md-2" style={{float:'left',marginLeft:'5px'}}>
                                <label>Work Experience  </label>
                                <input type="text" name="work_exp" value={ele.work_exp} onChange={(e) => {
                                    const list=[...work];
                                    list[i].work_exp =e.target.value;
                                    setWork(list);
                                }} />
                            </div>

                            <div className="col-md-2" style={{float:'left',marginLeft:'5px'}}>
                                <label>Designation  </label>
                                <input type="text" name="designation" value={ele.designation} onChange={(e) => {
                                    const list=[...work];
                                    list[i].designation =e.target.value;
                                    setWork(list);
                                }} />
                            </div>
                            
                           <div className="col-md-2">
                           {work.length !== 1 && work.length === i+1 && <button style={{background:'#f4f4f5'}}
  className="mr10 btn"
  onClick={() => {handleWorkRemove(i)}}><span><i class="fas fa-trash" style={{color:"crimson" ,fontSize:"25px"}}></i></span></button>}
{work.length - 1 === i && <button style={{background:'#f4f4f5',marginLeft:'5px'}} className="btn" onClick={handleAddWork}><span><i class="fas fa-plus" style={{fontSize:"25px"}}></i></span></button>}
                           </div>
                        </div>
                        );

                    })}
                    </div>
                    
                </div>
                <br />

                <div>
                    <button className="btn btn-outline-primary"onClick={handleSubmit}>Submit</button>
                </div>

            </form>

        </div>
    );

}

export default Register;