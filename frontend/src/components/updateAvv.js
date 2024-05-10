import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DocNav from "./docNav";

const UpdateAvailability=()=>{

    const [docId,setDocId]=useState(0);
    const [time,setTime]=useState([]);
    const [avv,setAvv]=useState([]);
    const [selectedDay,setday]=useState({weekDay:""}); 
    const [putData, setPutdata] = useState(true);
    const [update, setUpdate] = useState(false);
    const [selectedTime,handleTimeChange]=useState({StartingTime: 0,EndingTime:0});
    const [selectedTimeup,handleTimeChangeUp]=useState({StartingTime: 0,EndingTime:0});
	const [selectedDayuup,setdayup]=useState({weekDay:""});
	const [getSchedule, setSchedules] = useState([]); 
	const [getScheduleTochange, setselSchIdwhosechng] = useState([]); 
    const [selSchId,setselSchId]=useState(null);


    const PersonId = localStorage.getItem("_id");
    const getDocId=async(PersonId)=>{
		try {
		  const response = await axios.post('http://localhost:4000/docid', {
			params: {
				PersonId: PersonId
			}
		  });
			const id=response.data.DocId;
			const DocId = id[0].DoctorID;
            setDocId(DocId)
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};
	getDocId(PersonId);

    useEffect(() => {
        if(docId!=0)
        {
            getTimeSch(docId);
        }
    }, [docId]);

    useEffect(() => {
        if(time && time.length>0)
        {
            getTime2Sch(time);
        }
    }, [time]);

    const getTimeSch= async(id)=>{  // for day
        try {
            const response = await axios.post('http://localhost:4000/DocSchforUpdate',{
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
          const setTimeInput = (value) => {
            const [startingTime, endingTime] = value.split(' - ');
            handleTimeChange(prevState => ({
                ...prevState,
                StartingTime: startingTime,
                EndingTime: endingTime
            }));
        };
        const setDayInput=(value)=>{
            setday({weekDay:value});
        }

        const  Update= async (id,Tochngday,SidC,sid,day) => {
            try {
              const response = await axios.post('http://localhost:4000/updateindbAvv', {
                params:{
                id: id ,
                Tochngday:Tochngday,
                SidC:SidC,
                sid:sid,
                day:day
            }});
            } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
            }
          }
          
          useEffect(() => {
            
          if(selectedTime.StartingTime!=0 && selectedTimeup.StartingTime!=0){
            getSchId(selectedTimeup.StartingTime,selectedTimeup.EndingTime)
            getSchIdWhosechng(selectedTime.StartingTime,selectedTime.EndingTime)
          }
        }, [selectedTime,selectedTimeup]);

        const submitDetails=()=>{
            Update(docId,selectedDay.weekDay,getScheduleTochange,selSchId,selectedDayuup.weekDay)
     
        }

        const handlePut=()=>{
            if(selectedDay.weekDay!='' && selectedTime.StartingTime!=0){
                setPutdata(!putData)
                setUpdate(!update)
            }
        }

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:4000/schedule')
                setSchedules(response.data.schedule);
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
          };
        useEffect(() => {
            fetchData();
        }, []);

        const setInputupT = (value) => {
            const [startingTime, endingTime] = value.split(' - ');
        
            handleTimeChangeUp(prevState => ({
                ...prevState,
                StartingTime: startingTime,
                EndingTime: endingTime
            }));
        };
        const setDayInputUp=(value)=>{
            setdayup({weekDay:value})
        };
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
          const getSchIdWhosechng = async (start,end) => {
            try {
              const response = await axios.post('http://localhost:4000/SCHid', {
                params:{
                startT: start ,
                endT:end
            }});
              setselSchIdwhosechng(response.data.schId);
           
            } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
            }
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

              {putData && ( <div className='timeSel'>
              <h1 className="selTime">Select Time and Day ou want to update:</h1>
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
                        onChange={(e) => setDayInput(times.Day)} 
                    />
                    <div className="radio-design"></div>
                    <div className="label-text">{times.Day}</div>
                </label>
                ))}
                </div>

                <div className='avDay'>
                {avv.map((timeArray, index) => (
                        <label key={index}>
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
            <button className="send" onClick={handlePut}>
            <div class="svg-wrapper-1">
                <div class="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                </svg>
                </div>
            </div>
            <span>Select</span>
            </button>
        </div> )}

        {update && ( <div className='both-Wraper'>

            <div class="radio-input-wrapper">
                <h1 className="selDay">Select Day to update</h1>
                {daysOfWeek.map((day, index) => (
                    <label class="label" key={index}>
                        <input value="value-2" 
                        name="value-radio" 
                        id={day} className="radio-input" type="radio" 
                        onChange={() => setDayInputUp(day)}/>
                        <div class="radio-design"></div>
                        <div class="label-text">{day}</div>
                    </label>
                ))}
            </div>

            <div className="time">
                <h1 className="selTime">Time Range to update</h1>
                <div className="time-wrapper">
                    {getSchedule.map((item, index) => (
                        <label className="label2" key={index}>
                            <input 
                                value="value-3" 
                                name="value-radio2" 
                                className="radio-input2" 
                                type="radio" 
                                onChange={() => setInputupT(`${item['Starting Time'].split('T')[1].split('.')[0]} - ${item['Ending Time'].split('T')[1].split('.')[0]}`)} // Pass item directly to setInput
                            />
                            <div className="radio-design2"></div>
                            <div className="label-text2">{`${item['Starting Time'].split('T')[1].split('.')[0]} - ${item['Ending Time'].split('T')[1].split('.')[0]}`}</div>
                        </label>
                    ))}
                </div>
            </div>
           
            </div> )}
            {update &&  <button className="bookmarkBtn" onClick={submitDetails} >
                <span className="IconContainer">
                    <svg viewBox="0 0 384 512" height="0.9em" className="icon">
                    <path
                        d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                    ></path>
                    </svg>
                </span>
            </button>}
        </div>
    );
}
export default UpdateAvailability;