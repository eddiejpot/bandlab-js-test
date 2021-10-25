let audioContext = new AudioContext();
let audioSource = false;

/**
 * Fetches audio from url
 * @param {String} url
 * @returns {Object} decoded Audio Data
 */
const fetchAudio = async(url) => {
  try {
    // error fetching due to cors
    const response = await fetch(url);
    const bufferAudio = await response.arrayBuffer();
    const decodeAudio = await audioContext.decodeAudioData(bufferAudio);
    return decodeAudio;
  } catch (error) {
    console.log("Error fetching audio",error) 
  }
}

/**
 * Start/stop audio 
 * @param {String} url
 * @param {DOM Object} playButton
 */
const playAudioSample = async(url,playButton) => {

  const audio = await fetchAudio(url);

  // change all playButton text to 'listen'
  const selectPlayButtons = document.querySelectorAll(".button-play");
  // const selectSibilings = playButton.parentNode.parentNode.childNodes
  for (let i = 0; i < selectPlayButtons.length; i++) {
    selectPlayButtons[i].innerHTML = "Listen";
  }

  await audioContext.close();
  audioContext = new AudioContext();
  // creates a sound source
  audioSource = audioContext.createBufferSource();
  // tell the source which sound to play
  audioSource.buffer = audio;                  
  // connect the source to the context's destination (the speakers)  
  audioSource.connect(audioContext.destination);
  // play the source now
  audioSource.start(0); 
  playButton.innerHTML= "Playing";
 
}

/**
 * Create card for a single audio sample in the DOM
 * @param {String} url
 */
const createAudioSampleCardPage3 = (url) => {
  // create new DOM elements
  const audioSampleCardContainer = document.createElement("div");
  audioSampleCardContainer.classList.add('audio-sample-card');
  mainContainer.appendChild(audioSampleCardContainer);

  const trackTitle = document.createElement("h4");
  trackTitle.innerHTML = `Track: ${url.slice(url.lastIndexOf("/")+1).replace(".mp3","")}`;
  audioSampleCardContainer.appendChild(trackTitle);

  const playButton = document.createElement("button");
  playButton.innerHTML = "Listen";
  playButton.classList.add('not-playing');
  playButton.classList.add('button-play');
  playButton.addEventListener('click', ()=> playAudioSample(url,playButton));
  audioSampleCardContainer.appendChild(playButton);
}

/**
 * Create intro page
 */
const createPageThree = () => {
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
  const audioSampleLinks = ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3", "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"];
  const numOfAudioSamples = audioSampleLinks.length;

  for (let i = 0; i < numOfAudioSamples; i+=1) {
    createAudioSampleCardPage3(audioSampleLinks[i])
  }

  // Extra Button that navigates back to homepage / refreshes page
  const backToHomepageButton = document.createElement("button");
  backToHomepageButton.innerHTML = "Back to homepage";
  mainContainer.appendChild(backToHomepageButton);
  backToHomepageButton.addEventListener("click", ()=> location.reload());

}

//Event Listeners
pageThreeButton.addEventListener("click", createPageThree)
