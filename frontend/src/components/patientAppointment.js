import {React,useState,useEffect} from 'react';
import axios from 'axios';
import PatientNav from "./patientNav";
import { useNavigate,Link } from 'react-router-dom';

const Appointment=()=>{
    const [Department, setDepartment] = useState([]); 
    const [Doctors, setDoctors] = useState([]); 
    const [selectedDep,setDep]=useState({id:0});
    const [showDiv, setShowDiv] = useState(false);
    const [showSecDiv, setShowSecDiv] = useState(false);
    const [putData, setPutdata] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState({ id: 0 });
    const [time,setTime]=useState([]);
    const [SelDayTime,setselDayTime]=useState([]);
    const [selectedDay,setday]=useState({weekDay:""}); // to store in db
    const [avv,setAvv]=useState([]);
    const [selectedTime,handleTimeChange]=useState({StartingTime: 0,EndingTime:0}); // to store in db
    const [selSchId,setselSchId]=useState(null);//for db
    const [patientId,setPatId]=useState(0);

    const PersonId = localStorage.getItem("_id");

    useEffect(() => {
		departments();
      getPatientId(PersonId);

	  }, []);
      
    useEffect(() => {
        console.log(selectedDoctor.id);
        getTimeSch(selectedDoctor.id);
    }, [selectedDoctor.id]);

    const departments=async()=>{
        try{
            const responce= await axios.post('http://localhost:4000/deps')
            console.log(responce.data.Deps)
            setDepartment(responce.data.Deps);
        }catch(error){
            console.error('Error fetching data:', error);
			throw error;
        }
    };

    const GetDocs= async(id)=>{
        try {
			const response = await axios.post('http://localhost:4000/Docs',{
            params:{
                id:id
            }})
			setDoctors(response.data.Docs);
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
    }
    const getTimeSch= async(id)=>{  // for day
        try {
            const response = await axios.post('http://localhost:4000/DocSch',{
                params:{
                    id:id
                }})
                setTime(response.data.DocSch);
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        }

      
        const getTime2Sch = async (waqt) => {
            try {
              const response = await axios.post('http://localhost:4000/docTime', {
                time: waqt 
              });
              setAvv(response.data.results);
            } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
            }
          }

          const getTimefromWeek = async (week,docid) => {
            try {
              const response = await axios.post('http://localhost:4000/docTimeFromWeek', {
                params:{
                dy: week ,
                doCid:docid
            }});
              setselDayTime(response.data.DocT);
            } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
            }
          }

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
          const  storeAppointmentReq= async (schid,Pat,sdoc) => {
            try {
              const response = await axios.post('http://localhost:4000/inDb', {
                params:{
                pat: Pat ,
                Schid:schid,
                Sdoc:sdoc
            }});
              console.log(response.data.set);
            } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
            }
          }
        

    const setDepIdInput = (value) => {
        setDep({ id: value });
    };
    
    useEffect(() => {
        GetDocs(selectedDep.id);
    }, [selectedDep.id]); 

    useEffect(() => {
        // Check if 'time' is not null or undefined
        if (SelDayTime && SelDayTime.length > 0) {
          console.log("SelDayTime is not null or empty, executing effect");
          getTime2Sch(SelDayTime);
        }
      }, [SelDayTime]);
      

    const setDocIdInput = (value) => {
        setSelectedDoctor({ id: value });
    };

    useEffect(() => {
        if (selectedDoctor.id !== 0) {
            getTimeSch(selectedDoctor.id);
        }
    }, [selectedDoctor.id]);

    const setDayInput=(value)=>{
        setday({weekDay:value});
    }
  useEffect(() => {
        if (selectedDay.weekDay !== "") {
           console.log("Weekday is not null or empty, executing effect");
            getTimefromWeek(selectedDay.weekDay,selectedDoctor.id);
        }
    }, [selectedDay.weekDay]);

    const setTimeInput = (value) => {
		const [startingTime, endingTime] = value.split(' - ');
		handleTimeChange(prevState => ({
			...prevState,
			StartingTime: startingTime,
			EndingTime: endingTime
		}));
	};

    useEffect(() => {
        console.log(selectedTime)
        if(putData){
           console.log("selectedTime is not null or empty, executing effect");
            getSchId(selectedTime.StartingTime,selectedTime.EndingTime);
           
        }
    }, [putData]);

    useEffect(() => {
        if(selSchId !=null){
           console.log("selSchId is not null or empty, executing effect");
            storeAppointmentReq(selSchId,patientId,selectedDoctor.id)
        }
    }, [selSchId]);
      
        return(
    <div className='patAp'>
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
        <div className='wraperB'>
            <div className='left'>
            <h1 className='head1'>Start your appointment request here.</h1>
            <p className='para'>Easiest way to reach us</p>
            </div>
            <div className='right'>
            <h2 className='cd'>Select the concerning department</h2>
                <div className="time-wrapper">
                
                {Department.map((department, index) => (
                    <label className="label2" key={index}>
                        <input 
                            value={department.Name} 
                            name="value-radio2" 
                            className="radio-input2" 
                            type="radio" 
                            id={department.Name}
                            onChange={(e) => setDepIdInput(department.DepartmentId)} // Pass item directly to setInput
                        />
                        <div className="radio-design2"></div>
                        <div className="label-text2">{department.Name}</div>
                    </label>
                    ))}
                </div>
                    <button class="cta" onClick={() => setShowDiv(!showDiv)}>
                        <span>Next</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                    </button>
                 </div>
                 
        </div>
        
        {showDiv &&( <div className='DocSel'>
            <div>
                <h1 className='sd'>Select Doctor</h1>
                {Doctors.map((doctor, index) => (
                <label className="label2" key={index}>
                    <input 
                        value={doctor.FirstName} 
                        name="value-radio2" 
                        className="radio-input2" 
                        type="radio" 
                        id={doctor.FirstName}
                        onChange={(e) => setDocIdInput(doctor.DoctorID)} // Pass item directly to setInput
                    />
                    <div className="radio-design2"></div>
                    <div className="label-text2">{doctor.FirstName}</div>
                </label>
                ))}
            </div>
                <button class="nxt" onClick={() => setShowSecDiv(!showSecDiv)}>
                    <span>Next</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                </button>
        </div>)}

        {showSecDiv &&( <div className='timeSel'>
            
                <h2 className='ts'>Select Time and Day</h2>
                <div className='desc'>
                     <p>These are the available time slots of the selected doctor.<br/>Select any of them that suits you better</p>
                </div>
                <div className='parter'>
                <div className='avDay'>
                {time.map((times, index) => (
                <label className="label" key={index}>
                    <input 
                        value={times.Day} 
                        name="value-radio" 
                        className="radio-input" 
                        type="radio" 
                        id={times.Day}
                        onChange={(e) => setDayInput(times.Day)} // Pass item directly to setInput
                    />
                    <div className="radio-design"></div>
                    <div className="label-text">{times.Day}</div>
                </label>
                ))}
                </div>

                <div className='avDay'>
                {avv.map((timeArray, index) => (
                        <label key={index}>
                            {/* Assuming each timeArray contains only one object */}
                            {timeArray.map((item, innerIndex) => (
                                <label className="label2" key={innerIndex}>
                                    <input 
                                        value="value-3" 
                                        name="value-radio2" 
                                        className="radio-input2" 
                                        type="radio" 
                                        onChange={() => setTimeInput(`${item['Starting Time'].split('T')[1].split('.')[0]} - ${item['Ending Time'].split('T')[1].split('.')[0]}`)} // Pass item directly to setInput
                                    />
                                    <div className="radio-design2"></div>
                                    <div className="label-text2">{`${item['Starting Time'].split('T')[1].split('.')[0]} - ${item['Ending Time'].split('T')[1].split('.')[0]}`}</div>
                                </label>
                            ))}
                        </label>
                    ))}

                </div>
            </div>
            <button class="nxt" onClick={() => setPutdata(!putData)}>
                    <span>Next</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                </button>
        </div>)}
        </div>
    );
}
export default Appointment;