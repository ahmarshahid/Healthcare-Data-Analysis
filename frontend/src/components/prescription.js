import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DocNav from "./docNav";

const Prescription=(props)=>{
    const { prop1,prop2 } = props;
    const[newpat,setNew]=useState("null");//type
    const[test,setTest]=useState([]);
    const[testName,setTestName]=useState("null");
    const[detail,setDetail]=useState("null");
    const[testId,setTestId]=useState(0);
    const[maxId,setMaxId]=useState(0);
    const[pressId,setPressId]=useState(0);
    const[press2Id,setPress2Id]=useState(0);
    const[newtestName,setnewTestName]=useState("null");
    const [clicked, setclicked] = useState(false);
    const [Treatclicked, setTreatclicked] = useState(false);
    const [addclick, setAddclick] = useState(false);
    const [show, setShowAdd] = useState(false);
    const [showadd, setShowAdda] = useState(true);
    const[treatName,setTreatNme]=useState("null");
    const[startDate,setStartDate]=useState("null");
    const[endDate,setEndDate]=useState("null");
    const[docid,setDocid]=useState(0);



    useEffect(()=>{
        getTestMAxId();
        const personId=localStorage.getItem("_id"); 
        getDocId(personId);
    })
    const setInput=(value)=>{
        setNew(value);
        setShowAdd(!show);
        setclicked(!clicked)
        if(Treatclicked){
         setTreatclicked(!Treatclicked);
        }
       
      }
      const setInput2=(value)=>{
       setNew(value);
       if(clicked){
          setclicked(!clicked)
       }
       if(show){
        setShowAdd(!show)
     }
     }

     const getTests = async () => {  
		try {
		    const response = await axios.post('http://localhost:4000/getTest')
            console.log(response.data.appId);
            setTest(response.data.appId);
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};
    const getTestId = async (tn) => {  
		try {
		    const response = await axios.post('http://localhost:4000/getTestId',{
                params:{
                    Tn:tn
                }
            })
            console.log("tn"+response.data.appId[0].testID);
            setTestId(response.data.appId);
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};
     useEffect(() => {
        if(newpat !=null || newpat !=""){
            if(newpat==="Test"){
               getTests();
            }
            if(newpat==="Treatment"){
              setTreatclicked(!Treatclicked);
            }
        }
        }, [newpat]);

        const handleChange=(value)=>{
            setTestName(value);
            setShowAdda(!showadd)
        }
        const handleNameChange = (event) => {
            setnewTestName(event.target.value); 
        }
        useEffect(() => {
            if(testName!="null")
            {
                getTestId(testName);
            }
            
          }, [testName]);

          const AdNewTest = async (id,tn) => {   
            try {
                const response = await axios.post('http://localhost:4000/Addtest',{
                    params:{
                        id:id,
                        Tn:tn
                    }
                })
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };

        const addInPrescription = async (det,appid,type) => {   
            try {
                
                const response = await axios.post('http://localhost:4000/AddPrescription',{
                    params:{
                        det:det,
                        appid:appid,
                        type,type
                    }
                })
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };

        const getPresId = async (id) => {   
        try {
            const response = await axios.post('http://localhost:4000/getPressId',{
                params:{
                    id:id
                }
            })
            console.log(response.data.appId[0].prescriptionid);
            setPressId(response.data.appId[0].prescriptionid);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

        const addInTestrecord = async (pid,tid) => {   
            try {
                const response = await axios.post('http://localhost:4000/AddtestRec',{
                    params:{
                        tid:tid,
                        pid:pid
                    }
                })
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
        useEffect(()=>{
            if(pressId!=0 ){
                console.log("fff"+pressId,testId)
                addInTestrecord(pressId,testId[0].testID);
            }
        },[pressId,testId])

        const getTestMAxId = async () => {   
            try {
                const response = await axios.post('http://localhost:4000/maxTestId')
                console.log(response.data.appId[0].testid);
                setMaxId(response.data.appId[0].testid);
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
        const updateStatus = async (id) => {   
            try {
                const response = await axios.post('http://localhost:4000/updateUnstatus',{
                    params:{
                        id:id
                    }
                })
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
        const hndlAddClick=()=>{
            setAddclick(!addclick)
            setclicked(!clicked)
        }
        const addnewestTest=()=>{
            AdNewTest(maxId+1,newtestName);
            getTestId(newtestName);
            setnewTestName('');
        }
        const textChng=(event)=>{
            setDetail(event.target.value);
        }
        const addInDb=()=>{
            addInPrescription(detail,prop1,newpat);
            updateStatus(prop1);
            getPresId(prop1);
        }
/////////////////////////////////////////////////////////////////////
        const handleTreatChange=(event)=>{
            setTreatNme(event.target.value);
        }
        const handleStartDateChange=(event)=>{
            setStartDate(event.target.value);
        }
        const handleEndDateChange=(event)=>{
            setEndDate(event.target.value);
        }
        const addtreatmentIndb=()=>{
            addInPrescription(detail,prop1,newpat);
           updateStatus(prop1);
           getPres2Id(prop1);
           getTreatMAxId();
        }
        useEffect(()=>{
            if(press2Id !=0){
               addInTreatment(maxId+1,treatName,startDate,endDate,press2Id);
               addInTreatmentRecord(prop2,docid,maxId+1)
                console.log("varcheck"+prop2,docid,maxId+1)
            }
        },[press2Id])
        const getTreatMAxId = async () => {   
            try {
                const response = await axios.post('http://localhost:4000/maxTreatId')
                console.log(response.data.appId[0].treatmentid);
                setMaxId(response.data.appId[0].treatmentid);
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
        const getDocId = async (perId) => {   
            try {
                const response = await axios.post('http://localhost:4000/DocIdGet',{
                    params:{
                        perId:perId
                    }
                })
                console.log("dddd"+response.data.patId[0].DoctorID);
                setDocid(response.data.patId[0].DoctorID);
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
        const addInTreatment = async (id,tn,sd,ed,pd) => {   
            try {
                const response = await axios.post('http://localhost:4000/Addtreat',{
                    params:{
                        id:id,
                        Tn:tn,
                        sd:sd,
                        ed:ed,
                        pd:pd
                    }
                })
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
        const addInTreatmentRecord = async (patid,docid,tretid) => {   
            try {
                const response = await axios.post('http://localhost:4000/AddtreatRecord',{
                    params:{
                        patid:patid,
                        docid:docid,
                        tretid:tretid,
                    }
                })
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
     
        const getPres2Id = async (id) => {   
            try {
                const response = await axios.post('http://localhost:4000/getPressId',{
                    params:{
                        id:id
                    }
                })
                console.log("pppppp"+response.data.appId[0].prescriptionid);
                setPress2Id(response.data.appId[0].prescriptionid);
                
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
        
    return(
        <div className="pres">
            <DocNav/>
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
                <div className='wraperB'>
                
                <div className='left'>
                <h2 className='hd'>Select treatment type:</h2>

                    <div>
                    <label className="label2">
                        <input 
                            value={"Test"} 
                            name="value-radio2" 
                            className="radio-input2" 
                            type="radio" 
                            onChange={(e) => setInput("Test")} 
                        />
                        <div className="radio-design2"></div>
                        <div className="label-text2">{"Test"}</div>
                    </label>
                    </div>
                    <div>
                    <label className="label2">
                        <input 
                            value={"Treatment"} 
                            name="value-radio2" 
                            className="radio-input2" 
                            type="radio" 
                            onChange={(e) => setInput2("Treatment")} 

                        />
                        <div className="radio-design2"></div>
                        <div className="label-text2">{"Treatment"}</div>
                    </label>
                    </div>
                    {clicked &&(<div>
                        <h2 className='hd'>Add Prescription Details:</h2>
                        <div className="card">
                            <div className="form">
                        <div class="group">
                            <textarea placeholder=""
                             id="comment" name="comment" rows="5" required="" onChange={textChng}></textarea>
                            <label for="comment">Details/Description</label>
                        </div>
                        </div>
                        </div>
                    </div>)}
                    {Treatclicked &&(<div>
                        <h2 className='hd'>Add Prescription Details:</h2>
                        <div className="card">
                            <div className="form">
                        <div class="group">
                            <textarea placeholder=""
                             id="comment" name="comment" rows="5" required="" onChange={textChng}></textarea>
                            <label for="comment">Details/Description</label>
                        </div>
                        </div>
                        </div>
                    </div>)}
                </div>
                <div className="right">
                {clicked && (  <div>
                <h2 className='hd'>Select Test:</h2>
               <div className="time-wrapper">
                    {test.map((item, index) => (
                        <label className="label" key={index}>
                            <input 
                                value="value-3" 
                                name="value-radio" 
                                className="radio-input" 
                                type="radio" 
                                onChange={() => handleChange(item.TestName)} // Pass item directly to setInput
                            />
                            <div className="radio-design"></div>
                            <div className="label-text">{item.TestName}</div>
                        </label>
                    ))}
                </div>
                </div>)}

                {Treatclicked && (<div>
                    <div className="input-group">
                            <input
                                id='username'
                                name='username'
                                type='text' required
                                //value={newtestName}
                                onChange={handleTreatChange}
                            />
                            <label for="username">Treatment Name</label>
                            </div>
                    <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label class="font-semibold text-sm text-gray-400 pb-1 block label-color" for="dob">Starting Date</label>
                            <input class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500" type="date" id="dob"  onChange={handleStartDateChange}/>
                        </div>
                    </div>
                    <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label class="font-semibold text-sm text-gray-400 pb-1 block label-color" for="dob">Ending Date</label>
                            <input class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500" type="date" id="dob" onChange={handleEndDateChange}/>
                        </div>
                    </div>
                </div>)}                    

                {show && showadd && (  <div className="add">

                    <button
                        className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                        title="Add New"
                        onClick={hndlAddClick}
                        >
                        <svg
                            className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                            viewBox="0 0 24 24"
                            height="50px"
                            width="50px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            stroke-width="1.5"
                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                            ></path>
                            <path stroke-width="1.5" d="M8 12H16"></path>
                            <path stroke-width="1.5" d="M12 16V8"></path>
                        </svg>
                        </button>
                        <lable  className="lt" >Add new test</lable>
                    </div>)}
                    {addclick && (  <div className="flx">
                    <div className="input-group">
                            <input
                                id='username'
                                name='username'
                                type='text' required
                                value={newtestName}
                                onChange={handleNameChange}
                            />
                            <label for="">Test Name</label>
                            </div>
                            <button class="boton-elegante" onClick={addnewestTest}>Add</button>

                        </div>)}
                        </div>
                       
            </div>
            {clicked &&(<button className="bookmarkBtn" onClick={(addInDb)} >
                <span className="IconContainer">
                    <svg viewBox="0 0 384 512" height="0.9em" className="icon">
                    <path
                        d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                    ></path>
                    </svg>
                </span>
            </button>)}
            {Treatclicked &&(<button className="bookmarkBtn" onClick={(addtreatmentIndb)} >
                <span className="IconContainer">
                    <svg viewBox="0 0 384 512" height="0.9em" className="icon">
                    <path
                        d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                    ></path>
                    </svg>
                </span>
            </button>)}
        </div>
    )
}
export default Prescription;