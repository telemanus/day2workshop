//Load libraries
const express=require("express");
const path=require("path");
const fs=require("fs");

//start an instance of application
const app=express();


//define routes
app.use(express.static(path.join(__dirname,'public')));

app.use(express.static(path.join(__dirname ,'image')));

app.get("/asset", (req,res,next)=>{

    const testFolder='public/asset';
    var fList=[];

    fs.readdirSync(testFolder).forEach(file => {
        console.log(file);
        fList.push(file);

      });

      var randomFile = fList[Math.floor(Math.random()*fList.length)];

      res.status(200);
      res.type('text/html');
  //    res.send(`<img src="Vader.jpg">`);
      res.send(`<img width="350px" src="${randomFile}">`);

})

app.use((req,res,next)=>{
    res.status(404);
    res.sendFile(path.join(__dirname, 'public', 'error.html'));
})


//Start web server
//start server on port 3000 if undefined on command line
const PORT=parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

app.listen(PORT, ()=>{
    console.info(`Application started on port ${PORT} at ${new Date()}`);
});