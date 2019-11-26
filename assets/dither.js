var canvas;
var context;

window.addEventListener('DOMContentLoaded',()=> {
    var image = document.getElementById('scream');
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    drawImage(image);
})

function drawImage(image) {
    // Set the canvas the same width and height of the image
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    ditherImage();
}

function ditherImage(){
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;
    for(let x=0; x< canvas.width; x++){
        for(let y=0; y<canvas.height; y++){
            let i = index(x,y);
            
            let [nR, nG, nB] = [Math.round(pixels[i] /255)*255, Math.round(pixels[i+1] /255)*255, Math.round(pixels[i+2] /255)*255];
            let [eR, eG, eB] = [pixels[i] - nR, pixels[i+1] - nG, pixels[i+2] - nB]; //CALCULATING ERROR
            [pixels[i], pixels[i+1], pixels[i+2]] = [nR, nG, nB]; //Setting new pixel views


            let right = index(x+1,y); //right pixel
            pixels[right]+= eR * 7/16.0; //r
            pixels[right+1]+= eG *7/16.0 //g
            pixels[right+2]+= eB * 7/16.0; //b


            let bottomL = index(x-1,y+1); //bottom left pixel
            pixels[bottomL]+= eR * 3/16.0; //r
            pixels[bottomL+1]+= eG *3/16.0 //g
            pixels[bottomL+2]+= eB * 3/16.0; //b


            let bottom = index(x,y+1); //bottom pixel
            pixels[bottom]+= eR * 5/16.0; //r
            pixels[bottom+1]+= eG *5/16.0 //g
            pixels[bottom+2]+= eB * 5/16.0; //b

            let bottomR = index(x+1,y+1); //bottom right pixel
            pixels[bottomR]+= eR * 1/16.0; //r
            pixels[bottomR+1]+= eG *1/16.0 //g
            pixels[bottomR+2]+= eB * 1/16.0; //b
        }
    }
    context.putImageData(imageData, 0, 0);
}

function index(x,y){
    return (x+y*canvas.width)*4;
}