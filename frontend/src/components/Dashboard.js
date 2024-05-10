import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DocNav from "./docNav";

const Dashboard = () => {
	const [getSchedule, setSchedules] = useState([]); 
	const [selectedTime,handleTimeChange]=useState({StartingTime: 0,EndingTime:0});
	const [selectedDay,setday]=useState({weekDay:""});

	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	  useEffect(() => {
		fetchData();
	  }, []);

	  const fetchData = async () => {
		try {
			const response = await axios.post('http://localhost:4000/schedule')
			setSchedules(response.data.schedule);
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	  };
	  const setInput = (value) => {
		const [startingTime, endingTime] = value.split(' - ');
	
		handleTimeChange(prevState => ({
			...prevState,
			StartingTime: startingTime,
			EndingTime: endingTime
		}));
	};
	
	const setDayInput=(value)=>{
		setday({weekDay:value})
	};
	  const getId = async (par) => {   //to get id of schedule
		try {
			console.log(par);
		  const response = await axios.post('http://localhost:4000/scheduleid', {
			params: {
			  par: par
			}
		  });
			const id=response.data.schedule;
			const scheduleId = id[0].scheduleid;
			const PersonId = localStorage.getItem("_id");
			getDocId(PersonId,scheduleId);
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};

	const getDocId=async(PersonId,scheduleId)=>{
		try {
		  const response = await axios.post('http://localhost:4000/docid', {
			params: {
				PersonId: PersonId
			}
		  });
			const id=response.data.DocId;
			const DocId = id[0].DoctorID;
			save_availability(scheduleId,selectedDay.weekDay,DocId);
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};

	const  save_availability= async (tId,weekday,DocId)=>{
		try {
		  const response = await axios.post('http://localhost:4000/saveAvailability', {
			params: {
				tId: tId,
				weekday: weekday,
				DocId:DocId
			}
		  });
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};

	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage.getItem("_id")) {
			navigate("/");
		}
	}, [navigate]);


	return (

		<div>
			<DocNav/>
		
			<div className="body">
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
				<div className='both-Wraper'>

					<div class="radio-input-wrapper">
						<h1 className="selDay">Select Day</h1>
						{daysOfWeek.map((day, index) => (
							<label class="label" key={index}>
								<input value="value-2" name="value-radio" id={day} className="radio-input" type="radio" onChange={() => setDayInput(day)}/>
								<div class="radio-design"></div>
								<div class="label-text">{day}</div>
							</label>
						))}
					</div>
					
					<div className="time">
						<h1 className="selTime">Time Range</h1>
						<div className="time-wrapper">
							{getSchedule.map((item, index) => (
								<label className="label2" key={index}>
									<input 
										value="value-3" 
										name="value-radio2" 
										className="radio-input2" 
										type="radio" 
										onChange={() => setInput(`${item['Starting Time'].split('T')[1].split('.')[0]} - ${item['Ending Time'].split('T')[1].split('.')[0]}`)} // Pass item directly to setInput
									/>
									<div className="radio-design2"></div>
									<div className="label-text2">{`${item['Starting Time'].split('T')[1].split('.')[0]} - ${item['Ending Time'].split('T')[1].split('.')[0]}`}</div>
								</label>
							))}
						</div>
					</div>
					</div>

					<button className="bookmarkBtn" onClick={() => getId({...selectedTime})} >
						<span className="IconContainer">
							<svg viewBox="0 0 384 512" height="0.9em" className="icon">
							<path
								d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
							></path>
							</svg>
						</span>
					</button>
			</div>
		</div>
	);
};

export default Dashboard;
