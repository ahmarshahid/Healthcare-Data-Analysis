import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

const AddDoc=()=>{

    const [department,setDepartmet]=useState([]);
    const [Name, setName] = useState('');
    const [NameSec, setsecName] = useState('');
    const [gender, setGender] = useState('male'); 
    const [CNIC, setCnic] = useState(''); 
    const [address, setAddress] = useState('');
    const [Dep, setDepChange] = useState('Cardiology'); 
    const [Pass, setPass] = useState(''); 
    const [Email, setEmail] = useState(''); 
    const [Contact, setContact] = useState(); 
    const [Added,setAdded]=useState('false');
    const [perId, setPersonId] = useState(0); 
    const [DepId, setDepId] = useState(0); 
    const [DocId, setDocId] = useState(0); 

    // function isValidEmail(email) {
    //     // Regular expression to validate email address
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // }
    useEffect(()=>{
        getDepartment();
        GetDocId();

    },[])
    useEffect(()=>{
        if(Added){
            GetPersonId();
        }
    },[Added])

  
  
    useEffect(()=>{
        if(Dep!=''){
            GetDepId(Dep)
        }
    },[Dep])
  
    const handleBlur = () => {
        AddInperson(Name,Pass,'doctor',Email);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value); 
    }
    const handleNameChange = (event) => {
        setName(event.target.value); 
    }
    const handleSecNameChange = (event) => {
        setsecName(event.target.value); 
    }
    const handleGenderChange = (event) => {
      setGender(event.target.value); 
    };
    const handleCnicChange=(event)=>{
        setCnic(event.target.value)
      }
      const handleDepChange=(event)=>{
        setDepChange(event.target.value);
      }
      const handlePass=(event)=>{
        setPass(event.target.value)
      }
       const handleEmail=(event)=>{
        setEmail(event.target.value)
      }
      const handleContact=(event)=>{
        setContact(event.target.value)
      }
    //   useEffect(()=>{
    //     if(perId!=0){
    //        console.log("kuti"+perId)
    //     }
    // },[perId])
      const handleDbContent=()=>{
        AddDocInDb(DocId+1,Name,NameSec,Contact,address,CNIC,gender,4,DepId,perId+1)
      }

    const getDepartment = async () => {
        try {
          const response = await axios.post("http://localhost:4000/getDep");
          setDepartmet(response.data.dep);
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      };
      const AddInperson = async (name,pass,role,email) => {
        try {
          const response = await axios.post("http://localhost:4000/inPerson",{
            params:{
                name:name,
                pass:pass,
                role:role,
                email:email 
            }
          })
          setAdded(!Added)
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      };
      ///////////////////////////////////////////////////
      const AddDocInDb = async (id,name,SecName,contact,add,cnic,gen,rating,depid,Perid) => {
        try {
          const response = await axios.post("http://localhost:4000/AddDocInDb",{
            params:{
                id:id,
                name:name,
                SecName:SecName,
                contact:contact,
                add:add,
                cnic:cnic,
                gen:gen,
                rating:rating,
                depid:depid,
                Perid:Perid
            }
          })
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      };
      /////////////////////////////////////////////////////////////
      const GetPersonId = async () => {
        try {
          const response = await axios.post("http://localhost:4000/personIdsss");
          setPersonId(response.data.id[0].PersonID);
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      };
      const GetDocId = async () => {
        try {
          const response = await axios.post("http://localhost:4000/dcid")

          setDocId(response.data.id[0].DoctorID)
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      };
      const GetDepId = async (dep) => {
        try {
          const response = await axios.post("http://localhost:4000/DepIds",{
            params:{
                Dep:dep,
            }
          })
          setDepId(response.data.id)
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      };

    return(
        <div className="mainAdminApp">
        <AdminNav/>
            <div className="loader">
                <div className="loaders"></div>
                <div className="loaders"></div>
                <div className="loaders"></div>
                <div className="loaders"></div>
                <div className="loaders"></div>
                <div className="loaders"></div>
                <div className="loaders"></div>
                <div className="loaders"></div>
            </div>
            <div class="con">
        <h2 class="h2class">Add Doctor</h2>
        <div class="add-doctor-form">
            <div class="form-grop">
                <label for="first_name" class="lbl">First Name </label>
                <input type="text" id="first_name" name="first_name" value={Name} required onChange={handleNameChange}/>
            </div>

            <div class="form-grop">
                <label for="last_name" class="lbl">Last Name</label>
                <input type="text" id="last_name" name="last_name" value={NameSec} required onChange={handleSecNameChange}/>
            </div>

            <div class="form-grop">
                <label for="cnic" class="lbl">CNIC</label>
                <input type="text"
                 id="cnic" 
                 name="cnic" 
                  placeholder="XXXXX-XXXXXXX-X"
                   required 
                   minLength = "12"
                   value={CNIC}
                   onChange={handleCnicChange}/>
            </div>

            <div class="form-grop">
                <label for="gender" class="lbl">Gender </label>
                <select id="gender" name="gender" required value={gender} onChange={handleGenderChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div class="form-grop">
                <label for="contact" class="lbl">Contact </label>
                <input type="text" id="contact" name="contact"  value={Contact} required onChange={handleContact}/>
            </div>

            <div class="form-grop">
                <label for="address" class="lbl">Address </label>
                <input type="text" id="address" name="address" value={address} required onChange={handleAddressChange}/>
            </div>

            <div class="form-grop">
                <label for="department" class="lbl">Department </label>
                <select id="department" name="department"  required onChange={handleDepChange}>
                {department.map((item, index) => (
                       <option value={item.Name} key={index}>{item.Name}</option>
                    ))}
                </select>
            </div>
            
            <div class="form-grop">
                <label for="email" class="lbl">Email </label>
                <input type="email" id="email" name="email" value={Email} required onChange={handleEmail} />
            </div>

            <div class="form-grop">
                <label for="password" class="lbl">Password </label>
                <input type="password" id="password" name="password" value={Pass} required onChange={handlePass} onBlur={handleBlur}/>
            </div>


            <div class="form-grop">
                <button class="btns" onClick={handleDbContent} >Add Doctor</button>
            </div>
        </div>
    </div>

        </div>
    )
}
export default AddDoc;