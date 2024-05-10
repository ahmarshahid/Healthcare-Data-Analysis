const express = require('express');
const Territories = require('./dbconnections/Territories');
const dboperations= require('./dbconnections/dboperations');
const cors = require('cors');
var bodyParser = require('body-parser');
const config                =require('./dbconnections/dbconfig'),
      sql                   =require('mssql');  

const API_PORT= process.env.PORT || 5000;

const app= express();
const corsOptions = {
    origin: '*', // replace with your frontend's URL
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));
app.use(express.json()); // for this also install npm install body-parser@latest

const getTerritories = async (terrD) => {
    try {
        let pool = await sql.connect(config);
        let request = new sql.Request(pool);
        request.input('TerritoryD', sql.NVarChar(10), terrD);
        
        let customers = await request.query('SELECT * FROM Territories WHERE TerritoryDescription = @TerritoryD');
        return customers.recordset;
    } catch (error) {
        console.log(error);
        throw error; // Ensure to throw the error for proper error handling
    }
}

app.post('/api', async (req, res) => {
  try {
    const territoryDescription = req.body.params.par;
    const territory = await getTerritories(territoryDescription);
    res.json({territory});
  } catch (error) {
    console.error('Error fetching territories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const createTerritories = async (terr) => {
  try {
      let pool = await sql.connect(config);
      let request = new sql.Request(pool);
      request.input('TerritoryID', sql.Int, terr.TerritoryID);
      request.input('TerritoryDescription', sql.NVarChar, terr.TerritoryDescription);
      request.input('RegionID', sql.Int, terr.RegionID);

      let result = await request.query('INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID) VALUES (@TerritoryID, @TerritoryDescription, @RegionID)');
      console.log(result);
      return result.recordset;
  } catch (error) {
      console.log(error);
      throw error; // Ensure to throw the error for proper error handling
  }
}


app.post('/hello', async (req, res) => {
    try {
        const newTerr = req.body.params.par; // Access 'par' directly
        await createTerritories(newTerr);
       const territory = await getTerritories(newTerr.TerritoryDescription); // Ensure consistency in parameter names
       res.json({ territory });
    } catch (error) {
        console.error('Error fetching territories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
app.get('/quit', function(req,res){
    res.send({result:'bye'});
})

// let something=new Territories(7777,'lahore',1);


// createTerritories(something);

app.listen(API_PORT, () => {
    sql.connect(config).then(()=>{
        console.log("sql connected")
    });
    console.log(`listening on port ${API_PORT}`)});
