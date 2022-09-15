function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    ObjectDetector = ml5.objectDetector('cocoSSD', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects.";
}

img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function modelLoaded() {
    console.log("cocoSSD is loaded!");
    status = true;
    ObjectDetector.detect(img, gotRestult);
}

function draw() {
    image(img, 0, 0, 640, 420);

    if(status != "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Ststus: Object Detected!";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotRestult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;

}