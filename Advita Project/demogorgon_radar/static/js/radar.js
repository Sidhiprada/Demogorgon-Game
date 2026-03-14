const roomCode = window.location.pathname.split("/")[2]

let players = []

let myLat = null
let myLon = null


const canvas = document.getElementById("radar")
const ctx = canvas.getContext("2d")

const centerX = 200
const centerY = 200

let sweepAngle = 0


function drawRadar(){

ctx.clearRect(0,0,400,400)

drawGrid()
drawSweep()
drawCenter()
drawPlayers()
checkDanger()

}



function drawGrid(){

ctx.strokeStyle = "#00ff9c"

for(let r=50;r<=200;r+=50){

ctx.beginPath()
ctx.arc(centerX,centerY,r,0,Math.PI*2)
ctx.stroke()

}

}


function drawSweep(){

const gradient = ctx.createLinearGradient(
centerX,
centerY,
centerX + 200*Math.cos(sweepAngle),
centerY + 200*Math.sin(sweepAngle)
)

gradient.addColorStop(0,"rgba(0,255,156,0.8)")
gradient.addColorStop(1,"rgba(0,255,156,0.05)")

ctx.beginPath()

ctx.moveTo(centerX,centerY)

ctx.lineTo(
centerX + 200*Math.cos(sweepAngle),
centerY + 200*Math.sin(sweepAngle)
)

ctx.strokeStyle = gradient
ctx.lineWidth = 3
ctx.stroke()

sweepAngle += 0.03

}


function drawCenter(){

ctx.beginPath()

ctx.arc(centerX,centerY,6,0,Math.PI*2)

ctx.fillStyle="white"
ctx.fill()

}


function drawPlayers(){

players.forEach(p=>{

const x = p.x || 0
const y = p.y || 0

ctx.beginPath()

let size = 6

if(p.role === "demogorgon"){

size = 10 + Math.sin(Date.now()*0.01)*4

ctx.fillStyle = "purple"

}else{

ctx.fillStyle = "red"

}

ctx.arc(centerX + x, centerY + y, size, 0, Math.PI*2)

ctx.fill()

})

}
function checkDanger(){

players.forEach(p=>{

if(p.role === "demogorgon"){

const distance = Math.sqrt(p.x*p.x + p.y*p.y)

if(distance < 60){

document.body.style.backgroundColor = "#220000"

if(navigator.vibrate){
navigator.vibrate(300)
}

setTimeout(()=>{
document.body.style.backgroundColor="black"
},200)

}

}

})

}



setInterval(drawRadar,30)



// SEND GPS LOCATION TO SERVER
function sendLocation(){

navigator.geolocation.getCurrentPosition(function(position){

myLat = position.coords.latitude
myLon = position.coords.longitude

fetch("/update-location/",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
lat: myLat,
lon: myLon
})
})

})

}


// CALL ONCE TO TRIGGER PERMISSION
sendLocation()

// THEN UPDATE EVERY 2 SECONDS
setInterval(sendLocation,2000)



// FETCH PLAYERS FROM SERVER
function calculateDistance(lat1, lon1, lat2, lon2){

const R = 6371000

const dLat = (lat2 - lat1) * Math.PI / 180
const dLon = (lon2 - lon1) * Math.PI / 180

const a =
Math.sin(dLat/2) * Math.sin(dLat/2) +
Math.cos(lat1 * Math.PI/180) *
Math.cos(lat2 * Math.PI/180) *
Math.sin(dLon/2) * Math.sin(dLon/2)

const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

return R * c

}



// UPDATE RADAR EVERY SECOND
setInterval(fetchPlayers,1000)

function fetchPlayers(){

fetch("/get-players/"+roomCode+"/")
.then(response => response.json())
.then(data => {

players = []

data.players.forEach(p=>{

if(p.lat && p.lon && myLat && myLon){

const dx = (p.lon - myLon) * 100000
const dy = (p.lat - myLat) * 100000

players.push({
x: dx,
y: -dy,
role: p.role
})

}

})

})
.catch(err => console.log("Fetch error:", err))

}

