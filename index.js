const express = require("express");
const fs = require("fs")
const path = require("path")
const dirPath = path.join(__dirname, "timestamps");
const app = express()

console.log(dirPath)

app.get("/timestamp", (req, res)=>{
    let date = new Date();
    const timeStampDate = `Last updated : ${date.toUTCString().slice(0,-3)}`;
    fs.writeFileSync(`${dirPath}/current-date-time.txt`, timeStampDate, (err)=> {
        if(err){
            res.send({message:"error writting timestamp"})
        }
    })
    res.send(path.join(dirPath, "current-date-time.txt"));
})

let carData = [
      {
        name: "slavia",
        country: "german",
        company: "Skoda",
        fuel: "diesel",
        type: "manual",
      },
      {
        name: "virtus",
        country: "german",
        company: "vokswagon",
        fuel: "petrol",
        type: "DSG",
      },
      {
        name: "Verna",
        country: "Korea",
        company: "Hyndai",
        fuel: "petrol",
        type: "manual",
      },
      {
        name: "city",
        country: "japan",
        company: "Honda",
        fuel: "diese22l",
        type: "DCT",
      },
    ];
    
    // car data api endpoints 
    // get all data with querys
    app.get("/car/all", (req, res)=>{
        const {type, fuel} = req.query;
        let returnData = carData;
        if(req.query){
            if(type) {
            returnData  = returnData.filter((val)=>val.type=== type);
            }
            if(fuel){
                returnData = returnData.filter((val)=>val.fuel=== fuel)
            }
        }
        res.json({data : returnData});
    })

//http://localhost:9000/
//listen and start a http server in specific port

app.listen(9000, ()=>console.log(`server started in localhost:9000`))