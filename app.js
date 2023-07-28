const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const city=req.body.city;
 const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=9000df896bb37eb10b2be186b392cae7&units=metric";
 https.get(url,function(response){
   console.log(response.statusCode);

   response.on("data",function(data){
   const weatherData=JSON.parse(data)
    // unwrapping of the javascript
//   console.log(JSON.stringify(data)); to wrapp it and represent it in small
    const temp=weatherData.main.temp
    const weatherDes=weatherData.weather[0].description
    const icon=weatherData.weather[0].icon
    const iconurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.setHeader("Content-Type","text/html");
    // imp for html 
    res.write("<h3>the weather is:"+weatherDes+"</h3>");
    res.write('<h1>'+"the temp is:"+temp+'</h1>');
    res.write("<img src="+iconurl+">");
    res.send()
   })
 })
})

app.listen(3000,function(){
    console.log("server at 3000");
});
