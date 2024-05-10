import {React,useState,useEffect} from 'react';
import axios from 'axios';
import PatientNav from "./patientNav";

const AppointmenrDel=()=>{

  const [requestedDay, setRequestedDay] = useState([]);
  const [requestedTime, setRequestedTime] = useState([]);
  const [AppointmentDetail, setAppointmentDetail] = useState([]);
  const [selectedTime, handleTimeChange] = useState({StartingTime: 0,EndingTime: 0});
  const [selectedDay, setday] = useState({ weekDay: "" });
  const[pId,setPatId]=useState(0);
  const PersonId = localStorage.getItem("_id");
  const [DocNames, setDocDetail] = useState([]);
  const [DocName, setDocname] = useState("null");
  const [selSchId,setselSchId]=useState(null); //db
  const[selDCId,setdcid]=useState(0);

  useEffect(()=>{
    getPatientId(PersonId);
  },[]);

  useEffect(() => {
      if(pId!=0){
        getAppDet(pId);
    }
  }, [pId]);
  useEffect(() => {
            
    if(selectedTime.StartingTime!=0 && DocName!="null"){
      getSchId(selectedTime.StartingTime,selectedTime.EndingTime);
      getDocIDFromName(DocName);
    }
  }, [selectedTime,DocName]);

  const getSchId = async (start,end) => {
    try {
      const response = await axios.post('http://localhost:4000/SCHid', {
        params:{
        startT: start ,
        endT:end
    }});
      setselSchId(response.data.schId);
   
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  const getPatientId = async (personId) => {
    try {
      const response = await axios.post('http://localhost:4000/patientId', {
        params:{
            personId: personId 
    }});
      setPatId(response.data.patId);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  const getDocNameInfo = async (app) => {
    try {
        console.log("kkk"+app)
      const response = await axios.post("http://localhost:4000/getdocName", {
        params: {
            app: app,
        },
      });
      const fullNames = response.data.results.map(result => result[0].FullName);
      setDocDetail(fullNames);

    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
    const getReqDay = async (par) => {
        //to get day from scheduleId
        try {
          const response = await axios.post("http://localhost:4000/getDayDet", {
            params: {
              Par: par,
            },
          });
          console.log(response.data.results);
          setRequestedDay(response.data.results);
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      };
      const getReqTime = async (slotId) => {
        //to get timerange from scheduleID
        try {
          const response = await axios.post("http://localhost:4000/getSlotDet", {
            params: {
              slotId: slotId,
            },
          });
          console.log(response.data.results);
          setRequestedTime(response.data.results);
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      };
      const getAppDet = async (patid) => { //to get slotid+Docid from appointment
        try {
          console.log("ddd" + patid);
          const response = await axios.post(
            "http://localhost:4000/getSlotDocIdFromApp",
            {
              params: {
                patid: patid,
              },
            }
          );
          console.log(response.data.appDet);
          setAppointmentDetail(response.data.appDet);
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      };

      useEffect(() => {
        if (AppointmentDetail && AppointmentDetail.length > 0) {
          getDocNameInfo(AppointmentDetail);
          getReqTime(AppointmentDetail);
          getReqDay(AppointmentDetail);
        }
      }, [AppointmentDetail]);

      const getDocIDFromName = async (Docid) => {
        try {
          const response = await axios.post("http://localhost:4000/getDocIdFromName", {
            params: {
                Docid: Docid
            },
          });
          setdcid(response.data.DcName[0].DoctorID);
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      };

      const setInput = (value) => {
        const [startingTime, endingTime] = value.split(" - ");
    
        handleTimeChange((prevState) => ({
          ...prevState,
          StartingTime: startingTime,
          EndingTime: endingTime,
        }));
      };
      const setDayInput = (value) => {
        setday({ weekDay: value });
      };
      const setDocInput = (value) => {
        setDocname(value);
      };
      const RemoveReq = async (pid,did,sid) => {
        try {
          const response = await axios.post("http://localhost:4000/RemoveAppreq", {
            params: {
                pid: pid,
                did:did,
                sid:sid
            },
          });
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      };
    const removeFromDb=()=>{
        console.log("all"+pId,selDCId,selSchId)
        RemoveReq(pId,selDCId,selSchId);
    }
    return(
        <div className='mainConfirmApp'>
        <PatientNav/>
        <div class="loader">
			<div class="loaders"></div>
			<div class="loaders"></div>
			<div class="loaders"></div>
			<div class="loaders"></div>
			<div class="loaders"></div>
			<div class="loaders"></div>
			<div class="loaders"></div>
			<div class="loaders"></div>
		</div>
        <div className="parter">
        <div className="avDay">

        {DocNames.map((name, index) => (
            <label className="label" key={index}>
                <input
                value={name}
                name="value-radio"
                className="radio-input"
                type="radio"
                onChange={() => setDocInput(name)} 
                />
                <div className="radio-design"></div>
                <div className="label-text">{name}</div>
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
                    onChange={() => setDayInput(`${item["Day"]}`)} // Pass item directly to setInput
                  />
                  <div className="radio-design2"></div>
                  <div className="label-text2">{`${item["Day"]}`}</div>
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
                    onChange={() =>
                      setInput(
                        `${
                          item["Starting Time"].split("T")[1].split(".")[0]
                        } - ${item["Ending Time"].split("T")[1].split(".")[0]}`
                      )
                    } 
                  />
                  <div className="radio-design3"></div>
                  <div className="label-text3">{`${
                    item["Starting Time"].split("T")[1].split(".")[0]
                  } - ${item["Ending Time"].split("T")[1].split(".")[0]}`}</div>
                </label>
              ))}
            </label>
          ))}
        </div>
     
        </div>
        <button class="del" onClick={removeFromDb}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 14"
                class="svgIcon bin-top"
            >
                <g clip-path="url(#clip0_35_24)">
                <path
                    fill="black"
                    d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                ></path>
                </g>
                <defs>
                <clipPath id="clip0_35_24">
                    <rect fill="white" height="14" width="69"></rect>
                </clipPath>
                </defs>
            </svg>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 57"
                class="svgIcon bin-bottom"
            >
                <g clip-path="url(#clip0_35_22)">
                <path
                    fill="black"
                    d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                ></path>
                </g>
                <defs>
                <clipPath id="clip0_35_22">
                    <rect fill="white" height="57" width="69"></rect>
                </clipPath>
                </defs>
            </svg>
        </button>

      </div>
    )
}
export default AppointmenrDel;