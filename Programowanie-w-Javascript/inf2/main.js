// pobranie referencji
document.body.addEventListener('keypress', onKeyPress);
document.querySelector('#recordBtn').addEventListener('click', onRecordBtn);
document.querySelector('#playBtn').addEventListener('click', onPlayBtn);
document.querySelector('#resetBtn').addEventListener('click', onResetBtn);

let recordedSound=[];
let recordStartTime;

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
    if(soundId){
        const soundTime=Date.now()-recordStartTime;
        const soundObj={
            soundId:soundId,
            time:soundTime};
        playSound(soundId);
        recordedSound.push(soundObj);
    }
}

function playSound(soundId){
    const sound = document.querySelector('#' + soundId);
    sound.play();
}

function onRecordBtn(){
    recordStartTime=Date.now();
    recordedSound=[];
}

function onPlayBtn(){
    for (let index = 0; index < recordedSound.length; index++) {
        const soundObj=recordedSound[index];
        setTimeout(()=>{
            playSound(soundObj.soundId);
        },
        soundObj.time
        );
    }    
}

function onResetBtn(){
    recordedSound = [];
    recordStartTime=0;
}