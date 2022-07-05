status="";
objects=[];
function setup(){
    canvas = createCanvas(400,350);
     canvas.center();
     video = createCapture(VIDEO);
     video.hide();
}
function  start(){

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects...";
    input = document.getElementById("object_name").value;
    console.log("Object to detect - "+input);
    
}
function draw(){
    
    image(video,0,0,400,350);
    if (status != "") {
        
        objectDetector.detect(video, gotResults);
        for (i =0;i < objects.length; i++) {
        
        percent = floor(objects[i].confidence*100);
        fill(255,0,0)
        text(objects[i].label + ", " + percent+"%", objects[i].x+15,objects[i].y+15);
        noFill();
        stroke(255,0,0);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if (objects[i].label == input) {
            video.stop();
            objectDetector.detect(gotResults);
            document.getElementById("object_status").innerHTML = input+" found";
            var synth = window.speechSynthesis;
            speak_data = input;
            utterThis =  new SpeechSynthesisUtterance(speak_data)
            synth.speak(utterThis);
        }else{
            document.getElementById("object_status").innerHTML = input+" not found";
        }
        }
    }


}
function modelLoaded(){
    console.log("Model is Loaded");
    status=true;
}
function gotResults(error,results){
    if (error) {
        console.error(error);
    } else {
       console.log(results);
       objects = results;
    }
}
