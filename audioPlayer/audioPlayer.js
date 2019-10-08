// component name : <audio-player></audio-player>
// use attributes : songSrc, songTitle, songAuthor, songImg in the component to load your song;

const audioPlayerTemplateHtml = `

<style>
body
{
    margin: 0;
    animation-name: overflowHidden;
    animation-duration: 0.7s;
}


.audio-container
{
    z-index: 100;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: rgb(54, 54, 54);
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    font-family: 'Arial';
    animation-name: audioPlayerSlideIn;
    animation-duration: 0.7s;
    box-shadow: 1px 1px 4px 1px rgba(92, 92, 92, 0.62);
}

.song-title
{
    white-space: nowrap;
    text-overflow: ellipsis;
}

#brand-player
{
    color: #fff;
    display: flex;
    align-items: stretch;
    justify-content: start;
    width: 25%;
}

#songTitle, #songAuthor
{
    margin-left: 1rem;
}

#songSlider
{
    width: 100%;
}

#audio-player-time
{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    width: 100%;
}

.player
{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 50%;
}

.controllers
{
    display: flex;
    align-items: center;
    justify-content: center;
}

.controllers :nth-child(2)
{
    padding: 0 1rem 0 1rem;
}

.volume
{
    width: 25%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.volume input
{
    width: 30% !important;
}

.audio-container img:hover:not(#song-image)
{
    transform: scale(1.05);
    cursor: pointer;
}

#songVolume
{
  margin-right: 1rem;
}

#songVolume {
  -webkit-appearance: none;
  -moz-apperance: none;
  border-radius: 6px;
  height: 6px;
  
  background-image: -webkit-gradient(linear,
      left top, 
      right top, 
      color-stop(50%, #d45445),
      color-stop(50%, #8a7f7f));
  
  background-image: -moz-linear-gradient(left center,
      #d45445 0%, #d45445 50%,
      #8a7f7f 50%, #8a7f7f 100%);
}

#songSlider {
  -webkit-appearance: none;
  -moz-apperance: none;
  border-radius: 6px;
  height: 6px;
  
  background-image: -webkit-gradient(linear,
      left top, 
      right top, 
      color-stop(0%, #d45445),
      color-stop(0%, #8a7f7f));
  
  background-image: -moz-linear-gradient(left center,
      #d45445 0%, #d45445 0%,
      #8a7f7f 0%, #8a7f7f 100%);
}

input[type="range"]::-moz-range-track {
  border: none;
  background: none;
  outline: none;
}

input[type=range]:focus {
  outline: none;
  border: none;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  background-color: #ffffff;
  height: 13px;
  width: 13px;
  border-radius: 50%;
  box-shadow: 1px 1px 4px 1px rgba(0,0,0,0.62);
}


input[type=range]::-webkit-slider-thumb:hover 
{
  transform: scale(1.2);
  cursor: grab;
}

input[type=range]::-moz-range-thumb {
  -moz-appearance: none !important;
  background-color: #df7164;
  border: none;
  height: 13px;
  width: 13px;
  border-radius: 50%;
}

#separator
{
  display: none;
}

@keyframes audioPlayerSlideIn
{
  0%{
    transform: translateY(102px);
    opacity: 0;
  }

  100%{
    transform: translateX(0px);
  }
}

@keyframes overflowHidden
{
  0%{
    overflow: hidden;
  }

  100%{
    overflow: hidden;
  }
}



@media (max-width: 1350px)
{
  #songSlider
  {
    position: absolute;
    bottom: 102px;
    margin: 0;
    left: 0;
    max-width: 98.8%;
    border-radius: 0;
  }
  #separator
  {
    display: block;
    margin: 0 1rem;
  }
}

@media (max-width: 800px){
  
  .song-title
  {
    display: none;
  }
  #song-image
  {
    width: 64px;
  }
  #currentTime, #duration
  {
    font-size: 80%;
  }
  #songVolume
  {
    width: 60% !important;

  }
  #songSlider
  {
    position: absolute;
    bottom: 80px;
  }
}
</style>

<div class="audio-container">

        <div id="brand-player">

            <img id="song-image" alt="song image" width="86px">

                <div class="song-title">
                    <p id="songTitle">My song title will goes here</p>
                    <p id="songAuthor">Author</p>
                </div>

        </div>

        <div class="player">
            
            <div class="controllers">
                <img id="previous" src="./audioPlayer/images/previous.png" alt="previous-track" width="15px">
                <img id="play-pause" src="./audioPlayer/images/play.png" alt="play-track" width="40px">
                <img id="next" src="./audioPlayer/images/next.png" alt="next-track" width="15px">
            </div>

            <div id="audio-player-time">
                <div id="currentTime" class="current-time">00:00</div>
                <div id="separator">-</div>
                    <input type="range" id="songSlider" class="song-slider" min="0" step="1"/>
                <div id="duration" class="duration">00:00</div>
            </div>

        </div>

        <div class="volume">
                <img id="speaker-volume" src="./audioPlayer/images/volume.png" alt="volume" width="16px">
                <input type="range" id="songVolume" class="song-volume" min="0" max="1" step="0.01"/>
        </div>
   
</div>`

const audioPlayerTemplate = document.createElement('template');
audioPlayerTemplate.innerHTML = audioPlayerTemplateHtml;

class AudioPlayer extends HTMLElement {
    
    constructor()
    {
        super();

        this.attachShadow({mode: 'open'})
            .appendChild(audioPlayerTemplate.content.cloneNode(true));

        this.songTitle = this.shadowRoot.getElementById('songTitle');
        this.songAuthor = this.shadowRoot.getElementById('songAuthor');
        this.songImage = this.shadowRoot.getElementById('song-image');
        this.songSlider = this.shadowRoot.getElementById('songSlider');
        this.currentTime = this.shadowRoot.getElementById('currentTime');
        this.duration = this.shadowRoot.getElementById('duration');
        this.volumeSlider = this.shadowRoot.getElementById('songVolume');
        this.playPause = this.shadowRoot.getElementById('play-pause');
        this.speaker = this.shadowRoot.getElementById('speaker-volume');
        this.volumeProgress = this.shadowRoot.getElementById('progressVolume');
        this.audio = this.shadowRoot.querySelector('#audio-container');
        this.previousSong = this.shadowRoot.getElementById('previous');
        this.nextSong = this.shadowRoot.getElementById('next');
        this.a = this.volumeSlider.value;
        

        this.song = new Audio();
        this.currentSong = 0;

        this.songs = [
            { 
              beat: "10550.mp3",
              author: "test",
              img: "Elvis.jpg",
            },
            { 
                beat: "13748.mp3",
                author: "test1",
                img: "zzTop.jpg",
            },
        ];
    }

    connectedCallback()
    {
        this.loadSong();
        setInterval(this.updateSongSlider.bind(this), 1000);
        this.updateSongSlider();
        this.playPause.addEventListener('click', this.playOrPauseSong.bind(this));
        this.speaker.addEventListener('click', this.clickMuted.bind(this));
        this.speaker.addEventListener('scroll', this.adjustVolume.bind(this));
        this.volumeSlider.addEventListener('change', this.adjustVolume.bind(this));
        this.volumeSlider.addEventListener('mousemove', this.updateProgressBarVolume.bind(this));
        this.previousSong.addEventListener('click', this.previous.bind(this));
        this.nextSong.addEventListener('click', this.next.bind(this));
        this.songSlider.addEventListener('change', this.seekSong.bind(this));
    }

    loadSong()
    {
        if(this.currentSong >= this.songs.length)
            this.currentSong = 0;
        this.song.src = this.getAttribute('songSrc');
        this.songTitle.textContent =  this.getAttribute('songTitle');
        this.songAuthor.textContent = this.getAttribute('songAuthor');
        this.songImage.src = this.getAttribute('songImg'); 
        this.song.volume = this.volumeSlider.value;
        this.song.play();
        setTimeout(this.showDuration.bind(this), 1000);
    }

    updateSongSlider()
    {
        var c = Math.round(this.song.currentTime);
        this.songSlider.value = c;
        this.currentTime.textContent = this.convertTime(c);
        //update the input[range] background color as a progress bar
        var progressBar = this.shadowRoot.getElementById('songSlider');
        var val = ((progressBar.value - progressBar.min) / (progressBar.max - progressBar.min))
        var percent = val * 100;
        progressBar.style.backgroundImage = 
        '-webkit-gradient(linear, left top, right top, ' +
        'color-stop(' + percent + '%, #d45445), ' +
        'color-stop(' + percent + '%, #8a7f7f)' +
        ')';
    }

    convertTime(secs)
    {
        var min = Math.floor(secs/60);
        var sec = secs % 60;
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;
        return (min + ":" + sec);
    }

    showDuration()
    {
        var d = Math.floor(this.song.duration);
        this.songSlider.setAttribute("max", d);
        this.duration.textContent = this.convertTime(d);
    }

    playOrPauseSong()
    {
        if(this.song.paused){
            this.song.play();
            this.playPause.src = "./audioPlayer/images/pause.png"; 
        }else{
            this.song.pause();
            this.playPause.src="./audioPlayer/images/play.png";
        }
    }

    next()
    {
        this.song.src = this.getAttribute('songSrc');
        this.songTitle.textContent =  this.getAttribute('songTitle');
        this.songAuthor.textContent = this.getAttribute('songAuthor');
        this.songImage.src = this.getAttribute('songImg'); 
        this.playPause.src = "./audioPlayer/images/pause.png";
        this.loadSong();    
    }

    previous()
    {
      this.song.src = this.getAttribute('songSrc');
      this.songTitle.textContent =  this.getAttribute('songTitle');
      this.songAuthor.textContent = this.getAttribute('songAuthor');
      this.songImage.src = this.getAttribute('songImg'); 
        this.playPause.src = "./audioPlayer/images/pause.png";
        this.loadSong();
    }

    seekSong()
    {
        this.song.currentTime = this.songSlider.value;
        this.currentTime.textContent = this.convertTime(this.song.currentTime);
    }

    adjustVolume()
    {
        this.song.volume = this.volumeSlider.value;

        if(this.volumeSlider.value === this.volumeSlider.min)
        this.speaker.src = "./audioPlayer/images/muted.png";
        else if(volumeSlider > 0.1 || volumeSlider.value < 0.49)
        this.speaker.src = "./audioPlayer/images/low-volume.png";
        else
        this.speaker.src = "./audioPlayer/images/volume.png";
    }

    clickMuted()
    {

        if(this.volumeSlider.value >= 0.01)
        {
            this.volumeSlider.value = 0;
            this.song.volume = 0;
            this.speaker.src = "./audioPlayer/images/muted.png";
            this.volumeSlider.style.backgroundImage = 
            '-webkit-gradient(linear, left top, right top, ' +
            'color-stop(' + 0 + '%, #d45445), ' +
            'color-stop(' + 0 + '%, #8a7f7f)' +
            ')'
        }

        else if(this.volumeSlider.value <= 0)
        {
          this.volumeSlider.value = this.a;
          this.song.volume =  this.a;
          this.speaker.src = "./audioPlayer/images/volume.png";
          this.volumeSlider.style.backgroundImage = 
            '-webkit-gradient(linear, left top, right top, ' +
            'color-stop(' + 50 + '%, #d45445), ' +
            'color-stop(' + 50 + '%, #8a7f7f)' +
            ')'
        }
    }

    updateProgressBarVolume()
    {
        var val = ((this.volumeSlider.value - this.volumeSlider.min) / (this.volumeSlider.max - this.volumeSlider.min));
        var percent = val * 100;
        this.volumeSlider.style.backgroundImage = 
        '-webkit-gradient(linear, left top, right top, ' +
        'color-stop(' + percent + '%, #d45445), ' +
        'color-stop(' + percent + '%, #8a7f7f)' +
        ')'
    }

    static Register()
    {
        customElements.define('audio-player', AudioPlayer);
    }
}

AudioPlayer.Register();
