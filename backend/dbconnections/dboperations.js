const { log } = require('console');
const config = require("./dbconfig"),
  sql = require("mssql");

  
  const getUsers = async () => {
    try {
      let pool = await sql.connect(config);
      let transaction = 
      `begin try
        begin transaction
          SELECT * FROM Person
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
        
      let users = await pool.request().query(transaction);
      return users;
    } catch (err) {
      console.log(err);
    }
  };
  const getUser = async (userID) => {
    try {
      let pool = await sql.connect(config);
      let transaction = 
    `begin try
      begin transaction
      SELECT * FROM Person WHERE PersonID = ${userID}
      commit transaction
    end try
    begin catch
      rollback transaction
    end catch`;
      let user = await pool.request().query(transaction);
      return user;
    } catch (error) {
        console.log(error)
    }
  };
  const getUserByUserName = async (username, password) => {
    try {
      let pool = await sql.connect(config);
      let transaction = 
    `begin try
      begin transaction
      SELECT * FROM Person WHERE CONVERT(varchar(50), [User Name])='${username}' AND Password='${password}';
      commit transaction
    end try
    begin catch
      rollback transaction
    end catch`;
      let user = await pool.request().query(transaction);
      return user;
    } catch (error) {
        console.log(error)
    }
  };
  const getUserByUserNameWithoutPassword = async (username) => {
    try {
      let pool = await sql.connect(config);
      let transaction = 
    `begin try
      begin transaction
      SELECT * FROM Person WHERE CONVERT(varchar(50), [User Name])='${username}';
      commit transaction
    end try
    begin catch
      rollback transaction
    end catch`;
      let user = await pool.request().query(transaction);
      return user;
    } catch (error) {
        console.log(error)
    }
  };
  const getUserByUserPatientId = async (person) => {
    try {
      let pool = await sql.connect(config);
      let transaction = 
    `begin try
      begin transaction
      SELECT * FROM Patient WHERE PatientID='${person}'
      commit transaction
    end try
    begin catch
      rollback transaction
    end catch`;
      let user = await pool.request().query(transaction);
      return user;
    } catch (error) {
        console.log(error)
    }
  };
  const createUser = async (User) => {
    try {
      let pool = await sql.connect(config);
      let status = 'active';
  
      let result = await pool.request()
        .input('UserName', sql.NVarChar, User.username)
        .input('Password', sql.VarChar(100), User.password)
        .input('role', sql.NVarChar, User.role)
        .input('email', sql.NVarChar, User.Email)
        .input('status', sql.NVarChar, status) 
        .execute('[dbo].[stpInsertPersonValues]');
  
      return result; 
    } catch (err) {
      console.log(err);
      throw err; 
    }
  };
  
  const getSchedule = async () => {
    try {
      let pool = await sql.connect(config);
      let request = new sql.Request(pool);
      let query = `SELECT * FROM ScheduleView`; // Using the view instead of the direct query
      let Schedule = await request.query(query);
      return Schedule.recordset;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  

const getScheduleID = async (scheduleVal) => {
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let startingTime = formatTime(scheduleVal.StartingTime);
    let EndingTime = formatTime(scheduleVal.EndingTime);
    let transaction = 
    `begin try
      begin transaction
      SELECT scheduleid FROM Schedule WHERE [Starting Time]='${startingTime}' and [Ending Time]='${EndingTime}'
      commit transaction
    end try
    begin catch
      rollback transaction
    end catch`;
    let Schedule = await request.query(transaction);
    return Schedule.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
} 
function formatTime(timeValue) {
  return timeValue + '.0000000';
}
const saveSchedule = async (scheduleId,schDay,docId) => {
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let status='free';
    let transaction = 
    `begin try
      begin transaction
      INSERT into  Availability Values ('${docId}' ,'${scheduleId}','${schDay}','${status}')
      commit transaction
    end try
    begin catch
      rollback transaction
    end catch`;
    let Schedule = await request.query(transaction);
    return Schedule.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
} 

const getDocId = async (docId) => {
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
    `begin try
      begin transaction
        SELECT DoctorID from Doctor where PersonID = '${docId}'
      commit transaction
    end try
    begin catch
      rollback transaction
    end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
} 
const getDocs=async(depId)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          SELECT TOP 10 DoctorID, FirstName FROM Doctor WHERE DepartmentId = '${depId}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let DocName = await request.query(transaction);
    return DocName.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getDeps = async () => {
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let query = `SELECT Name, DepartmentId FROM DepartmentView`; // Using the view instead of the direct query
    let Deps = await request.query(query);
    return Deps.recordset;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getDocTime=async(docid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    const Free='free';
    const free2='Free';
    let transaction = 
      `begin try
        begin transaction
          SELECT ScheduleID,Day from Availability where DoctorID = '${docid}' and (status ='${Free}' or status ='${free2}')
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let time = await request.query(transaction);
    return time.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getDocTimeForupdate=async(docid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let time = await request.query(`SELECT ScheduleID,Day from Availability where DoctorID = '${docid}'`);
    console.log(time)
    return time.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}

const AVVtime=async(weekday,docid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let sch='Scheduled';
    let transaction = 
      `begin try
        begin transaction
          SELECT ScheduleID from Availability where DoctorID = '${docid}'  AND CAST(Day AS varchar) ='${weekday}' and status <> '${sch}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let schtime = await request.query(transaction);
    return schtime.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}


const getDocAvv=async(docid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          SELECT [Starting Time],[Ending Time] from Schedule where ScheduleID = '${docid}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let time = await request.query(transaction);
    return time.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}

const getSchId=async(start,end)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let startingTime = formatTime(start);
    let EndingTime = formatTime(end);
    let transaction = 
      `begin try
        begin transaction
          SELECT ScheduleId from Schedule where [Starting Time] = '${startingTime}' and [Ending Time] = '${EndingTime}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset[0].ScheduleId;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}

const setAppointInDb=async(pat,doc,scid)=>{
  try {

    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    const stat="pending";
    const Mstat="unprescribed";
    let transaction = 
      `begin try
        begin transaction
          INSERT INTO Appointment VALUES ('${scid}', '${pat}', '${doc}', '${stat}', '${Mstat}')
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const addIntreatRec=async(pat,doc,tid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          INSERT INTO treatmentrecord VALUES ('${pat}','${tid}','${doc}')
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}

const getAppointmentDetail=async(docid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let stat='pending'
    let transaction = 
      `begin try
        begin transaction
          select PatientID,SlotID from Appointment where DoctorID = '${docid}' and status='${stat}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getAppointmentDetails=async(patid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let stat='pending'
    let id = await request.query(`select DoctorID,SlotID from Appointment where PatientID = '${patid}' and status='${stat}'`);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getConAppointmentDetail=async(docid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let stat='confirmed';
    let Mstat='unprescribed';
    let transaction = 
      `begin try
        begin transaction
          select PatientID,SlotID from Appointment where DoctorID = '${docid}' and status='${stat}' and MeetStatus='${Mstat}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}

const getPatientDetail=async(patid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          select Name from Patient where PatientID = '${patid}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const DocNameFromDocId=async(dcid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let id = await request.query(`select DoctorID from Doctor where CONCAT(FirstName, ' ', LastName) = '${dcid}'`);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getDocDetail=async(Docid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let id = await request.query(`select CONCAT(FirstName, ' ', LastName) AS FullName from Doctor where DoctorID = '${Docid}'`);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getptidname=async(patid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          select PatientID from Patient where name = '${patid}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getid=async(name)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
        select PatientID from Patient where Name = '${name}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getSlotDetail=async(slotid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
        select [Starting Time],[Ending Time] from Schedule where ScheduleID = '${slotid}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}

const getDayDetail=async(slot)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          select Day from Availability where ScheduleID = '${slot}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}

const getPatId=async()=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          select top(1) patientid  from patient order by patientid desc
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}

const getId=async(id)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          Select  PatientID  from Patient where PersonID='${id}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let ids = await request.query(transaction);
    return ids.recordset[0].PatientID;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const fillPerson=async(ids,name,age,gen,add,bd,cn,pm,per,grp)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          Insert into Patient values ('${ids}','${name}','${age}','${gen}','${add}','${bd}','${cn}','${pm}','${per}','${grp}')
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}

const fillStatus=async(doc,day,ids)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let Scheduled='Scheduled';
    let transaction = 
      `begin try
        begin transaction
          Update Availability set DoctorID='${doc}', ScheduleID='${ids}', Day='${day}',Status='${Scheduled}' where DoctorID='${doc}'and ScheduleID='${ids}'and CAST(Day AS varchar)='${day}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const fillAppStatus=async(pid,doc,ids)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let Scheduled='confirmed';
    let transaction = 
      `begin try
        begin transaction
          Update Appointment set Status='${Scheduled}' where DoctorID='${doc}'and SlotID='${ids}' and patientid='${pid}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const updateUnpresStat=async(aid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let Scheduled='prescribed';
    let transaction = 
      `begin try
        begin transaction
          Update Appointment set MeetStatus='${Scheduled}' where appointmentId='${aid}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getAppId=async(docid,slotid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    console.log(docid)
    console.log(slotid)
    let transaction = 
      `begin try
        begin transaction
          select AppointmentID from appointment where DoctorID = '${docid}' and SlotId='${slotid}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset[0].AppointmentID;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getTest=async()=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          select TestName from test
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getTestId=async(Tn)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          select testID from test where TestName='${Tn}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getPressId=async(Tn)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          select prescriptionid from prescription where appointmentid='${Tn}'
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const addTest=async(tId,test)=>{
  try {

    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          Insert into test values('${tId}','${test}')
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const addTestRec=async(tId,test)=>{
  try {

    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          Insert into PatientTest values('${tId}','${test}')
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const addPrescription=async(det,aid,type)=>{
  try {
        let pool = await sql.connect(config);
        let request = new sql.Request(pool);
        request.input('detail', sql.Text,det);
        request.input('App', sql.Int,aid);
        request.input('Type', sql.VarChar,type);
        let transaction = 
          `begin try
            begin transaction
              Insert into Prescription (PrescriptionDetails, AppointmentID, Type) values(@detail,@App,@Type)
            commit transaction
          end try
          begin catch
            rollback transaction
          end catch`;
        let id = await request.query(transaction);
        return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const MaxIdTest=async()=>{
  try {

    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          select top(1) testid  from test order by testid desc
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const MaxIdTreat=async()=>{
  try {

    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let transaction = 
      `begin try
        begin transaction
          select top(1) treatmentid  from treatment order by treatmentid desc
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let id = await request.query(transaction);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const maxDocid=async()=>{
  try {

    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let id = await request.query(`select top(1) DoctorID  from Doctor order by DoctorID desc`);
    return id.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}


const addtreat=async(id,tn,sd,ed,pd)=>{
 try {

    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    console.log(id,tn,sd,ed,pd)
    let transaction = 
      `begin try
        begin transaction
          Insert into treatment values('${id}','${tn}','${sd}','${ed}','${pd}')
        commit transaction
      end try
      begin catch
        rollback transaction
      end catch`;
    let resu = await request.query(transaction);
    return resu.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const AddInPerson=async(name,pass,role,email)=>{
  try {

    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    console.log(name,pass,role,email)
    let resu = await request.query(`Insert into Person values('${name}','${pass}','${role}','${email}')`);
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
/////////////////////////////////Add Doc////////////////////////////////////////////////////////////////////////
const AddDoc=async(id,name,secname,con,add,cnic,gend,rat,dep,per)=>{
  try {
console.log(id,name,secname,con,add,cnic,gend,rat,dep,per)
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let resu = await request.query(`Insert into Doctor values('${id}','${name}','${secname}','${con}','${add}','${cnic}','${gend}','${rat}','${dep}','${per}')`);
    return resu.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const addAvvUpdate=async(id,tcd,tcid,sid,day)=>{
  try {

    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    const stat='free';
    const statF='Free'
    let resu = await request.query(`update availability set ScheduleID='${sid}',Day='${day}' where DoctorID='${id}' and ScheduleID='${tcid}' and Day='${tcd}' and (status='${stat}' or status='${statF})'`);
    return resu.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const RemoveAppRequest=async(id,did,sid)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    const sat='deleted';
    let resu = await request.query(`update appointment set status='${sat}' where DoctorID='${did}' and PatientID='${id}' and SlotID='${sid}'`);
    return resu.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const getDep=async()=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let resu = await request.query(`select Name from Department`);
    return resu.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const GetPersonId=async()=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let resu = await request.query(`select top(1) PersonID  from Person order by PersonID desc`);
    return resu.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const GetDepIds=async(name)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let resu = await request.query(`select DepartmentID from Department where cast([Name] as varchar)='${name}'`);
    return resu.recordset[0].DepartmentID;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const GetPerIDforDel=async(name,pass)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    let resu = await request.query(`select PersonID from Person where cast([User Name] as varchar)='${name}' and cast([Password] as varchar)='${pass}'`);
    return resu.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}
const RemDoc=async(id)=>{
  try {
    let pool = await sql.connect(config);
    let request = new sql.Request(pool);
    const sat='inactive';
    let resu = await request.query(`update Person set status='${sat}' where PersonID='${id}'`);
    let resu2 = await request.query(`update Doctor set status='${sat}' where PersonID='${id}'`);

    return resu.recordset;
  } catch (error) {
      console.log(error);
      throw error; 
  }
}

module.exports = { getUsers, getUser, createUser, getUserByUserName, getUserByUserNameWithoutPassword,getSchedule
,getScheduleID,saveSchedule,getDocId,getDocs,getDeps,getDocTime,getDocAvv,AVVtime ,getSchId,setAppointInDb,getAppointmentDetail,getPatientDetail,getSlotDetail,getDayDetail,fillStatus,getUserByUserPatientId,fillPerson,getPatId,getId,getConAppointmentDetail,getAppId,getTest,getTestId,addTest,MaxIdTest,addPrescription,getPressId,addTestRec,getid,fillAppStatus,updateUnpresStat,MaxIdTreat,addtreat,getptidname,addIntreatRec,getDocTimeForupdate,addAvvUpdate,getAppointmentDetails,getDocDetail,DocNameFromDocId,RemoveAppRequest,getDep,AddInPerson,GetPersonId,GetDepIds,maxDocid,AddDoc,GetPerIDforDel,RemDoc};
