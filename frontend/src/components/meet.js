import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DocNav from "./docNav";
import Prescription from "./prescription";

const Meet=()=>{

    const [AppointmentDetail,setAppointmentDetail]=useState([]);
    const [PatientDetail,setPatientDetail]=useState([]);
    const [requestedTime,setRequestedTime]=useState([]);
    const [requestedDay,setRequestedDay]=useState([]);
    const [patid,setpatid]=useState(0);
    const [patName,setpatName]=useState("null");
    const [selectedTime,handleTimeChange]=useState({StartingTime: 0,EndingTime:0});
	// const [selectedDay,setday]=useState({weekDay:""});
    const [selSchId,setselSchId]=useState(null);//slotId
    const[docID,setDocId]=useState(0);//doc
    const[Appid,setAppId]=useState(0);//for db
    const perId = localStorage.getItem("_id");
    const navigate=useNavigate();


    const [showChild, setShowChild] = useState(false);
  const [propsToSend, setPropsToSend] = useState(null);
    

    useEffect(() => {
        getDocId(perId);

	  }, []);

      useEffect(() => {
        getAppDet(docID);

	  }, [docID]);

    const getAppDet = async (docid) => {   //to get id of schedule
		try {
			console.log("ddd"+docid);
		    const response = await axios.post('http://localhost:4000/getConAppointments', {
			params: {
			  Docid: docid
			}
		  });
          console.log(response.data.appDet);
          setAppointmentDetail(response.data.appDet);
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};
    const getDocId = async (perId) => { 
		try {
		    const response = await axios.post('http://localhost:4000/DocIdGet', {
			params: {
                perId: perId
			}
		  });
          console.log("rr"+response.data.patId[0].DoctorID);
          setDocId(response.data.patId[0].DoctorID);
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};

    const getPatientInfo = async (patId) => { 
		try {
		    const response = await axios.post('http://localhost:4000/getPatientDet', {
			params: {
			  PatId: patId
			}
		  });
          setPatientDetail( response.data.results);
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};

    const getReqTime = async (slotId) => {   //to get id of schedule
		try {
		    const response = await axios.post('http://localhost:4000/getSlotDet', {
			params: {
                slotId: slotId
			}
		  });
          console.log(response.data.results);
          setRequestedTime(response.data.results);
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
        
	};

    const getReqDay = async (par) => {   //to get id of schedule
		try {
		    const response = await axios.post('http://localhost:4000/getDayDet', {
			params: {
			  Par: par,
			}
		  });
          console.log(response.data.results);
          setRequestedDay( response.data.results);
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};

  

    useEffect(() => {
        if (AppointmentDetail && AppointmentDetail.length > 0) {
           
            getPatientInfo(AppointmentDetail);
            getReqTime(AppointmentDetail);
            getReqDay(AppointmentDetail);
        }
    }, [AppointmentDetail]);

    const setpatNameinput = (value) => {
        setpatName( value );
    };
    const setInput = (value) => {
		const [startingTime, endingTime] = value.split(' - ');
        
		handleTimeChange(prevState => ({
			...prevState,
			StartingTime: startingTime,
			EndingTime: endingTime
		}));
	};

    const getSchId = async (start,end) => {
        try {
          const response = await axios.post('http://localhost:4000/SCHid', {
            params:{
            startT: start ,
            endT:end
        }});
        console.log("hfhsd"+response.data.schId)
          setselSchId(response.data.schId);
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      }
      const GetAppId = async (docid,slotid) => {
        try {
          const response = await axios.post('http://localhost:4000/Appid', {
            params:{
            docid: docid ,
            slotId:slotid
        }});
        console.log("hfhsd"+response.data.appId)
          setAppId(response.data.appId);
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      }
      const GetpatId = async (patName) => {
        try {
          const response = await axios.post('http://localhost:4000/ptidname', {
            params:{
            patName: patName 
        }});
        console.log("hfhsd"+response.data.patId[0].PatientID)
          setpatid(response.data.patId[0].PatientID);
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      }

      useEffect(() => {
        if(selectedTime.StartingTime)
        {
            GetpatId(patName);
            getSchId(selectedTime.StartingTime,selectedTime.EndingTime);
        }
    }, [selectedTime]);

    useEffect(() => {
        if(selSchId)
        {
            console.log("in")
            GetAppId(docID,selSchId);
        }
    }, [selSchId]);

    const ToPrescription=()=>{
    const propsData = {
      prop1: Appid,
      prop2:patid
    };
    setPropsToSend(propsData);
    setShowChild(true);
  };
  if (showChild) {
    return <Prescription {...propsToSend} />;
  }
    
    return(
        <div className="mainConfirmApp">
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
            <div className="parter">
                <div className='avDay'>
                    {PatientDetail.map((timeArray, index) => (
                            <label key={index}>
                                {timeArray.map((item, innerIndex) => (
                                    <label className="label" key={innerIndex}>
                                        <input 
										value="value-3" 
										name="value-radio" 
										className="radio-input" 
										type="radio" 
                                        onChange={(e) => setpatNameinput(`${item['Name']}`)} // Pass item directly to setInput
									/>
									<div className="radio-design"></div>
                                        <div className="label-text">{`${item['Name']}`}</div>
                                    </label>
                                ))}
                            </label>
                        ))}
                </div>

                <div className="avDay">
                    {requestedDay.map((timeArray, index) => (
                            <label key={index}>
                                {timeArray.map((item, innerIndex) => (
                                    <label className="label2" key={innerIndex}>
                                        <input 
										value="value-3" 
										name="value-radio2" 
										className="radio-input2" 
										type="radio" 
									/>
									<div className="radio-design2"></div>
                                        <div className="label-text2">{`${item['Day']}`}</div>
                                    </label>
                                ))}
                            </label>
                        ))}
                </div>
                
                <div className="avDay">
                    {requestedTime.map((timeArray, index) => (
                            <label key={index}>
                                {timeArray.map((item, innerIndex) => (
                                    <label className="label3" key={innerIndex}>
                                        <input 
										value="value-3" 
										name="value-radio3" 
										className="radio-input3" 
										type="radio" 
										onChange={() => setInput(`${item['Starting Time'].split('T')[1].split('.')[0]} - ${item['Ending Time'].split('T')[1].split('.')[0]}`)} // Pass item directly to setInput
									/>
									<div className="radio-design3"></div>
                                        <div className="label-text3">{`${item['Starting Time'].split('T')[1].split('.')[0]} - ${item['Ending Time'].split('T')[1].split('.')[0]}`}</div>
                                    </label>
                                ))}
                            </label>
                        ))}
                </div>
            </div>
            <button className="send" onClick={ToPrescription}>
            <div class="svg-wrapper-1">
                <div class="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                </svg>
                </div>
            </div>
            <span>Add Prescription</span>
            </button>
        </div>
    );
}
export default Meet;