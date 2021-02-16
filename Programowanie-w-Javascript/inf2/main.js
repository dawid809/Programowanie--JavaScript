/* eslint-disable no-undef */
// pobranie referencji
document.body.addEventListener('keypress', onKeyPress);
document.querySelector('#recordBtn1').addEventListener('click', onRecordBtn1);
document.querySelector('#playBtn1').addEventListener('click', onPlayBtn1);
document.querySelector('#resetBtn1').addEventListener('click', onResetBtn1);

document.querySelector('#recordBtn2').addEventListener('click', onRecordBtn2);
document.querySelector('#playBtn2').addEventListener('click', onPlayBtn2);
document.querySelector('#resetBtn2').addEventListener('click', onResetBtn2);
let recordedSound1=[];
let recordStartTime1;

let recordedSound2=[];
let recordStartTime2;

let rec1=false;
let rec2=false;

function onKeyPress(ev){
    let soundId;
    switch(ev.code){
    case'KeyA':
        soundId='boom';
        break;
    case 'KeyS':
        soundId='clap';
        break;
    case'KeyD':
        soundId='hihat';
        break;
    case'KeyF':
        soundId='kick';
        break;
    case'KeyG':
        soundId='openhat';
        break;
    case'KeyH':
        soundId='ride';
        break;
    case'KeyJ':
        soundId='snare';
        break;
    case'KeyK':
        soundId='tink';
        break;
    case'KeyL':
        soundId='tom';
        break;
    }
    console.log(ev.code);
    playSound(soundId);
    if(soundId){
        if (rec1){
            soundTime=Date.now()-recordStartTime1;
            let soundObj={
                soundId:soundId,
                time:soundTime
            };
            recordedSound1.push(soundObj);
        }
        if (rec2){
            soundTime=Date.now()-recordStartTime2;
            let soundObj={
                soundId:soundId,
                time:soundTime
            };
            recordedSound2.push(soundObj);
        }
    }
}

function playSound(soundId){
    const sound = document.querySelector('#' + soundId);
    sound.play();
}

function onRecordBtn1(){
    recordStartTime1=Date.now();
    recordedSound1=[];
    rec1=true;
}

function onPlayBtn1(){
    rec1=false;
    for (let index = 0; index < recordedSound1.length; index++) {
        const soundObj=recordedSound1[index];
        setTimeout(()=>{
            playSound(soundObj.soundId);
        },
        soundObj.time
        );
    }    
}

function onResetBtn1(){
    recordedSound1 = [];
    recordStartTime1=0;
}

function onRecordBtn2(){
    recordStartTime2=Date.now();
    recordedSound2=[];
    rec2=true;
}

function onPlayBtn2(){
    rec2=false;
    for (let index = 0; index < recordedSound2.length; index++) {
        const soundObj=recordedSound2[index];
        setTimeout(()=>{
            playSound(soundObj.soundId);
        },
        soundObj.time
        );
    }    
}

function onResetBtn2(){
    recordedSound2 = [];
    recordStartTime2=0;
}