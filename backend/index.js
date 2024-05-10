const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const dbOperation = require('./dbconnections/dboperations');
const { Console } = require("console");
const { request } = require("http");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const database = [];
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/register", async (req, res) => {
	const { username, email, password } = req.body;
	let user = {
		username: username,
		password: password,
		role: 'patient',
		Email: email
	};
	let existingAccount = await dbOperation.getUserByUserNameWithoutPassword(username);
	if (existingAccount.recordset[0]===undefined)
	{
		await dbOperation.createUser(user);
		return res.json({ message: "Account created successfully!" });
	}
	res.json({ error_message: "User already exists!" });
});

app.post("/check", async (req, res) => {
	const person = req.body.params.personId;
	let existingAccount = await dbOperation.getUserByUserPatientId(person);
	if (existingAccount===undefined)
	{
		return res.json({ error_message: "User does not exists!.Please select the New Patient option" });
	}
	res.json({message: "Welcome back.We hope you are feeling well" });
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	let result = await dbOperation.getUserByUserName(username, password)
	if (result.recordset[0] === undefined){
		return res.json({
			error_message: "No such Account Exists",
		})
	}
	return res.json({
		message: "Login successfully",
		data: {
			_id: result.recordset[0].PersonID,
			_email: result.recordset[0].Email,
			_role: result.recordset[0].role,
		},
	});
});
//////////////////////////////////////////////////////////////////////////////////////
app.post("/schedule", async (req, res) => {
	try {
		const schedule = await dbOperation.getSchedule();
		res.json({schedule});
	  } catch (error) {
		console.error('Error fetching schedule:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	  }
});
app.post("/scheduleid", async (req, res) => {
	try {
		const scheduleVal = req.body.params.par;
		const schedule = await dbOperation.getScheduleID(scheduleVal);
		res.json({schedule});
	  } catch (error) {
		console.error('Error fetching schedule:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	  }
});


app.post("/saveAvailability", async (req, res) => {
	try {
		const scheduleId = req.body.params.tId;
		const scheduleDay = req.body.params.weekday;
		const docId=req.body.params.DocId;
		const schedule = await dbOperation.saveSchedule(scheduleId,scheduleDay,docId);
		res.json({schedule});
	  } catch (error) {
		console.error('Error fetching schedule:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	  }
});

app.post("/docid", async (req, res) => {
	try {
		const personId = req.body.params.PersonId;
		const DocId = await dbOperation.getDocId(personId);
		res.json({DocId});
	  } catch (error) {
		console.error('Error fetching schedule:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	  }
});

app.post("/Docs", async (req, res) => {
	try {
		const depId = req.body.params.id;
		const Docs = await dbOperation.getDocs(depId);
		res.json({Docs});
	  } catch (error) {
		console.error('Error fetching schedule:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	  }
});

app.post("/deps", async (req, res) => {
	try {
		const Deps = await dbOperation.getDeps();
		res.json({Deps});
	  } catch (error) {
		console.error('Error fetching schedule:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	  }
});

app.post("/DocSch", async (req, res) => {
	try {
		const depId = req.body.params.id;
		const DocSch = await dbOperation.getDocTime(depId);
		res.json({DocSch});
	  } catch (error) {
		console.error('Error fetching schedule:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	  }
});
app.post("/DocSchforUpdate", async (req, res) => {
	try {
		const depId = req.body.params.id;
		const DocSch = await dbOperation.getDocTimeForupdate(depId);
		res.json({DocSch});
	  } catch (error) {
		console.error('Error fetching schedule:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	  }
});
app.post("/ptidname", async (req, res) => {
	try {
		const depId = req.body.params.patName;
		const patId = await dbOperation.getptidname(depId);
		res.json({patId});
	  } catch (error) {
		console.error('Error fetching schedule:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	  }
});

app.post("/docTimeFromWeek", async (req, res) => {
	try {
		const weekday= req.body.params.dy;
		const docid= req.body.params.doCid;
		const DocT = await dbOperation.AVVtime(weekday,docid);
		res.json({DocT});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

app.post("/docTime", async (req, res) => { 
	try {                                      
	  const scheduleIds = req.body.time.map(time => time.ScheduleID); 
	  const results = await Promise.all(scheduleIds.map(async (scheduleId) => {
		return await dbOperation.getDocAvv(scheduleId);
	  }));
	  res.json({ results });
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

  app.post("/SCHid", async (req, res) => { 
	try {                                      
		const start= req.body.params.startT;
		const end= req.body.params.endT;
		const schId = await dbOperation.getSchId(start,end);
		res.json({schId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/inDb", async (req, res) => { 
	try {                                      
		const pat= req.body.params.pat;
		const doc= req.body.params.Sdoc;
		const scId= req.body.params.Schid;
		const schId = await dbOperation.setAppointInDb(pat,doc,scId);
		res.json({schId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

  app.post("/getAppointments", async (req, res) => { 
	try {                                      
		const docid= req.body.params.Docid;
		const appDet = await dbOperation.getAppointmentDetail(docid);
		res.json({appDet});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/getSlotDocIdFromApp", async (req, res) => { 
	try {                                      
		const docid= req.body.params.patid;
		const appDet = await dbOperation.getAppointmentDetails(docid);
		res.json({appDet});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/getConAppointments", async (req, res) => { 
	try {                                      
		const docid= req.body.params.Docid;
		const appDet = await dbOperation.getConAppointmentDetail(docid);
		res.json({appDet});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

  app.post("/getPatientDet", async (req, res) => { 
	try {                                      
		const patid= req.body.params.PatId.map(PatId => PatId.PatientID); 
		const results = await Promise.all(patid.map(async (patid) => {
			return await dbOperation.getPatientDetail(patid);
		}));
		
		res.json({results});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/getDocIdFromName", async (req, res) => { 
	try {                                      
		const sch= req.body.params.Docid;
		const DcName = await dbOperation.DocNameFromDocId(sch);
		res.json({DcName});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

  app.post("/getdocName", async (req, res) => { 
	try {                                      
		const patid= req.body.params.app.map(app => app.DoctorID); 
		const results = await Promise.all(patid.map(async (patid) => {
			return await dbOperation.getDocDetail(patid);
		}));

		res.json({results});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

  app.post("/getSlotDet", async (req, res) => { 
	try {    
		const patid= req.body.params.slotId.map(slotId => slotId.SlotID);
		const results = await Promise.all(patid.map(async (patid) => {
			return await dbOperation.getSlotDetail(patid);
		}));                                      
		res.json({results});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

  app.post("/getDayDet", async (req, res) => { 
	try {  
		const patid= req.body.params.Par.map(Par => Par.SlotID);
		const results = await Promise.all(patid.map(async (patid) => {
			return await dbOperation.getDayDetail(patid);
		}));                                      
		res.json({results});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/getPatientidThname", async (req, res) => { 
	try {                                      
		const sch= req.body.params.patn;
		const results = await dbOperation.getid(sch);
		res.json({results});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

  app.post("/fillDb", async (req, res) => { 
	try {                                      
		const doc= req.body.params.doc;
		const day= req.body.params.day;
		const sch= req.body.params.Sch;
		const schId = await dbOperation.fillStatus(doc,day,sch);
		res.json({schId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/fillDbAppStat", async (req, res) => { 
	try {                                      
		const doc= req.body.params.doc;
		const sch= req.body.params.Sch;
		const pid= req.body.params.pid;
		const schId = await dbOperation.fillAppStatus(pid,doc,sch);
		res.json({schId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/getpatIds", async (req, res) => { 
	try {                                      
		const PatId = await dbOperation.getPatId();
		res.json({PatId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/patientId", async (req, res) => { 
	try {    
		const id= req.body.params.personId;  
		const patId = await dbOperation.getId(id);
		res.json({patId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/DocIdGet", async (req, res) => { 
	try {  
		const id= req.body.params.perId;  
		const patId = await dbOperation.getDocId(id);
		res.json({patId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/Appid", async (req, res) => { 
	try {    
		const dId= req.body.params.docid; 
		const Sid= req.body.params.slotId;  
		const appId = await dbOperation.getAppId(dId,Sid);
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
   app.post("/getTest", async (req, res) => { 
	try {    
		const appId = await dbOperation.getTest();
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/getTestId", async (req, res) => { 
	try {    
		const Sid= req.body.params.Tn;  
		const appId = await dbOperation.getTestId(Sid);
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/AddtreatRecord", async (req, res) => { 
	try {    
		const pid= req.body.params.patid;  
		const did= req.body.params.docid;  
		const tid= req.body.params.tretid;  

		const appId = await dbOperation.addIntreatRec(pid,did,tid);
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/Addtest", async (req, res) => { 
	try {    
		const TN= req.body.params.Tn;  
		const id= req.body.params.id;  
		const appId = await dbOperation.addTest(id,TN);
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/AddtestRec", async (req, res) => { 
	try {    
		const tid= req.body.params.tid;  
		const pid= req.body.params.pid;  
		const appId = await dbOperation.addTestRec(tid,pid);
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/AddPrescription", async (req, res) => { 
	try {    
		const det= req.body.params.det;  
		const aid= req.body.params.appid;  
		const type= req.body.params.type;  

		const appId = await dbOperation.addPrescription(det,aid,type);
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/getPressId", async (req, res) => { 
	try {    
		const det= req.body.params.id;  
		const appId = await dbOperation.getPressId(det);
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/maxTestId", async (req, res) => { 
	try {    
		const appId = await dbOperation.MaxIdTest();
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/maxTreatId", async (req, res) => { 
	try {    
		const appId = await dbOperation.MaxIdTreat();
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/updateUnstatus", async (req, res) => { 
	try {   
		const id= req.body.params.id;                               
		const appId = await dbOperation.updateUnpresStat(id);
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/Addtreat", async (req, res) => { 
	try {    
		const id= req.body.params.id;  
		const tn= req.body.params.Tn;  
		const sd= req.body.params.sd; 
		const ed= req.body.params.ed;  
		const pd= req.body.params.pd;  

		const appId = await dbOperation.addtreat(id,tn,sd,ed,pd);
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/updateindbAvv", async (req, res) => { 
	try {    
		const id= req.body.params.id;  
		const tcd= req.body.params.Tochngday;  
		const tcid= req.body.params.SidC; 
		const sid= req.body.params.sid;  
		const day= req.body.params.day;  
		const appId = await dbOperation.addAvvUpdate(id,tcd,tcid,sid,day);
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/TreatId", async (req, res) => { 
	try {    
		const appId = await dbOperation.treatid();
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/saveInPateint", async (req, res) => { 
	try {    
		const id= req.body.params.id;                               
		const name= req.body.params.name;
		const age= req.body.params.age;
		const gen= req.body.params.gender;
		const add= req.body.params.address;
		const bd= req.body.params.blood;
		const cn= req.body.params.cnic;
		const pm= req.body.params.pm;
		const per= req.body.params.person;
		const grp= req.body.params.grp;

		const schId = await dbOperation.fillPerson(id,name,age,gen,add,bd,cn,pm,per,grp);
		res.json({schId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/RemoveAppreq", async (req, res) => { 
	try {    
		const id= req.body.params.pid;  
		const Did= req.body.params.did;  
		const Sid= req.body.params.sid; 
		const appId = await dbOperation.RemoveAppRequest(id,Did,Sid);
		res.json({appId});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/getDep", async (req, res) => { 
	try {    
		const dep = await dbOperation.getDep();
		res.json({dep});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/inPerson", async (req, res) => { 
	try { 
		const name= req.body.params.name; 
		const password= req.body.params.pass; 
		const rol= req.body.params.role; 
		const ema= req.body.params.email; 
		console.log(name,password,rol,ema)
		const dep = await dbOperation.AddInPerson(name,password,rol,ema);
		
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/personIdsss", async (req, res) => { 
	try { 
		const id = await dbOperation.GetPersonId();
		res.json({id});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/DepIds", async (req, res) => { 
	try { 
		const ema= req.body.params.Dep; 
		const id = await dbOperation.GetDepIds(ema);
		res.json({id});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/personIdForDel", async (req, res) => { 
	try { 
		const name= req.body.params.name; 
		const pass= req.body.params.pass; 

		const id = await dbOperation.GetPerIDforDel(name,pass);
	
		res.json({id});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/dcid", async (req, res) => { 
	try { 
		const id = await dbOperation.maxDocid();
		console.log({id})
		res.json({id});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/remDocFromPerAndDoc", async (req, res) => { 
	try { 
		const perid=req.body.params.perid;
		const id = await dbOperation.RemDoc(perid);
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  app.post("/AddDocInDb", async (req, res) => { 
	try { 

		const did= req.body.params.id;
		const name= req.body.params.name;
		const secname= req.body.params.SecName;
		const con= req.body.params.contact;
		const add= req.body.params.add;
		const cnic= req.body.params.cnic;
		const gend= req.body.params.gen;
		const rat= req.body.params.rating;
		const dep= req.body.params.depid;
		const per= req.body.params.Perid;
		const id = await dbOperation.AddDoc(did,name,secname,con,add,cnic,gend,rat,dep,per);
		res.json({id});
	} catch (error) {
	  console.error('Error fetching data:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

//////////////////////////////////////////////////////////////////////////////////////////////////


app.post("/schedule/create", (req, res) => {
	const { userId, timezone, schedule } = req.body;
	let result = database.filter((db) => db.id === userId);
	result[0].timezone = timezone;
	result[0].schedule = schedule;
	res.json({ message: "OK" });
});

app.get("/schedules/:id", (req, res) => {
	const { id } = req.params;
	let result = database.filter((db) => db.id === id);
	if (result.length === 1) {
		return res.json({
			message: "Schedules successfully retrieved!",
			schedules: result[0].schedule,
			username: result[0].username,
			timezone: result[0].timezone,
		});
	}
	return res.json({ error_message: "Sign in again, an error occured..." });
});

app.post("/schedules/:username", (req, res) => {
	const { username } = req.body;
	let result = database.filter((db) => db.username === username);
	if (result.length === 1) {
		const scheduleArray = result[0].schedule;
		const filteredArray = scheduleArray.filter((sch) => sch.startTime !== "");
		return res.json({
			message: "Schedules successfully retrieved!",
			schedules: filteredArray,
			timezone: result[0].timezone,
			receiverEmail: result[0].email,
		});
	}
	return res.json({ error_message: "User doesn't exist" });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
