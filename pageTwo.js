/**
 * Toggles audio (Play/Pause)
 * @param {DOM Object} audioElement
 * @param {DOM Object} playButton
 */
const toggleAudio = (event,audioElement,playButton) => {

	if (audioElement.getAttribute("isPlaying")) {
		audioElement.pause();
    audioElement.removeAttribute("isPlaying");
		playButton.innerHTML= "Play";

	} else {
		audioElement.play();
    audioElement.setAttribute("isPlaying", true);
		playButton.innerHTML= "Pause";
	}

}

/**
 * Create card for a single audio track
 * @param {String} url
 */
const createAudioSampleCard = (url) => {
  // create new DOM elements
  const audioSampleCardContainer = document.createElement("div");
  audioSampleCardContainer.classList.add('audio-sample-card');
  mainContainer.appendChild(audioSampleCardContainer);

  const trackTitle = document.createElement("h4");
  trackTitle.innerHTML = `Track: ${url.slice(url.lastIndexOf("/")+1).replace(".ogg","")}`;
  audioSampleCardContainer.appendChild(trackTitle);

  const audioElement = document.createElement("audio");
  audioElement.setAttribute("src", url);
  audioElement.setAttribute("type", "audio/mpeg");
  audioSampleCardContainer.appendChild(audioElement);

  const playButton = document.createElement("button");
  playButton.innerHTML = "Listen";
  playButton.classList.add('not-playing');
  playButton.classList.add('button-play');
  playButton.addEventListener('click', (e)=>{toggleAudio(e,audioElement,playButton)});
  audioSampleCardContainer.appendChild(playButton);
}

/**
 * Create intro page
 */
const createPageTwo = () => {
  // clear previous DOM
  mainContainer.innerHTML = "";

  // create new DOM elements
  const mainHeader = document.createElement("h1");
  mainHeader.innerHTML = "TUNE IN TO TUNE OUT";
  mainContainer.appendChild(mainHeader);

  const subHeader = document.createElement("h4");
  subHeader.innerHTML = "Listen up";
  mainContainer.appendChild(subHeader);

  // audio links
  const audioSampleLinks = ["https://static.bandlab.com/soundbanks/previews/new-wave-kit.ogg", "https://static.bandlab.com/soundbanks/previews/synth-organ.ogg"];
  const numOfAudioSamples = audioSampleLinks.length;

  for (let i = 0; i < numOfAudioSamples; i+=1) {
    createAudioSampleCard(audioSampleLinks[i])
  }

  // Extra Button that navigates back to homepage / refreshes page
  const backToHomepageButton = document.createElement("button");
  backToHomepageButton.innerHTML = "Back to homepage";
  mainContainer.appendChild(backToHomepageButton);
  backToHomepageButton.addEventListener("click", ()=> location.reload());

}

//Event Listeners
pageTwoButton.addEventListener("click", createPageTwo)
