var startTime; // to keep track of the start time
var stopwatchInterval; // to keep track of the interval
var elapsedPausedTime = 0;
var fruits = new Array("Apple", "Orange", "Mango", "Banana", "Guava");
var to_make = fruits[Math.floor(Math.random()*fruits.length)];
second1 = 0;
point = 0;
document.getElementById('TO_DRAW').innerHTML = "TO MAKE: " + to_make;
startStopwatch();

function startStopwatch() {
    if (!stopwatchInterval) {
      startTime = new Date().getTime() - elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
      stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
    }
  }
  
  function stopStopwatch() {
    clearInterval(stopwatchInterval); // stop the interval
    elapsedPausedTime = new Date().getTime() - startTime; // calculate elapsed paused time
    stopwatchInterval = null; // reset the interval variable
  }
  
  function resetStopwatch() {
    stopStopwatch(); // stop the interval
    elapsedPausedTime = 0; // reset the elapsed paused time variable
 // reset the display
  }
 function updateStopwatch(){
    var currentTime = new Date().getTime(); // get current time in milliseconds
    var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
    var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    second1 = seconds;
    var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    var hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
    var displayTime =  pad(seconds); // format display time
    document.getElementById("time").innerHTML = "TIME: " + displayTime; // update the display
    if(seconds >= 30 ){
        get = fruits[Math.floor(Math.random()*fruits.length)];
        to_make = get;
        document.getElementById('TO_DRAW').innerHTML = "TO MAKE: " + to_make;
        stopStopwatch();
        resetStopwatch();
        startStopwatch();
    }

 }
 function pad(number) {
    // add a leading zero if the number is less than 10
    return (number < 10 ? "0" : "") + number;
  }





function preload(){
classifier = ml5.imageClassifier('DoodleNet');

}
function setup(){
    canvas = createCanvas(600,600);
    canvas.center();
    background('white');
    
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
    
    }
    
function draw(){

strokeWeight(5);
stroke(0);
if(mouseIsPressed){
line(pmouseX , pmouseY , mouseX , mouseY);
}
}

function get(){
    console.log('working')
    var x = document.getElementById('num').innerHTML;
    if (x<15){
        alert('Write a Number below 15');
    }else{
        localStorage.setItem('nu',x);
    }
}

function classifyCanvas(){
classifier.classify(canvas, gotResult);

}

function gotResult(error,results){
if(error){
    console.error(error);

}
console.log(results);
document.getElementById('label').innerHTML = 'Label : ' + results[0].label;
document.getElementById('confidence').innerHTML = 'Confidence : ' + Math.round(results[0].confidence * 100) + ' %';
if(results[0].label == to_make){
document.getElementById('point').innerHTML = "POINT: "+(point + 1);
stopStopwatch();
resetStopwatch();
startStopwatch();
}
UtterThis = new SpeechSynthesisUtterance(results[0].label);
synth.speak(UtterThis);
}

function clearCanvas(){
    background('white')
}