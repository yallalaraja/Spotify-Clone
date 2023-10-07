console.log("Welcome to spotify");

//Intialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/5.mp3')
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'))

let songs = [
    {songName : "salam rocky bhai" , filePath:"songs/1.mp3",coverPath: "covers/1.jpg"},
    {songName : "Tiger Hukum" , filePath:"songs/2.mp3",coverPath: "covers/2.jpg"},
    {songName : "RRR" , filePath:"songs/3.mp3",coverPath: "covers/3.jpg"},
    {songName : "disco dancer" , filePath:"songs/4.mp3",coverPath: "covers/4.jpg"},
    {songName : "Ilahi mera" , filePath:"songs/5.mp3",coverPath: "covers/5.jpg"},
    {songName : "Lungi Dance" , filePath:"songs/6.mp3",coverPath: "covers/6.jpg"},
]

songs.forEach((element,i)=>{
    console.log(element,i);
    document.getElementsByClassName("songImage")[i].src = songs[i].coverPath;
    document.getElementsByClassName("songName")[i].innerText = songs[i].songName;
})

//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play')
        masterPlay.classList.remove('fa-pause-circle')
        gif.style.opacity = 0;
    }
})

//Listen to events

audioElement.addEventListener('timeupdate',()=>{ 
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{   
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src = `songs/${songIndex+1}.mp3`
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 6){
        songIndex = 0;
    }else{
        songIndex+=1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex=6;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})

