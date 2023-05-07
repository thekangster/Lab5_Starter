// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const explore = document.getElementById('explore');
  const children = Array.from(explore.children);
  const synth = window.speechSynthesis;
  const select = document.getElementById('voice-select');
  let voices = [];

  synth.addEventListener('voiceschanged', () => {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
      let option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.value = i;
      select.appendChild(option);
    }
  })

  const button = children.find(elm => elm.nodeName === 'BUTTON');
  button.addEventListener('click', () => {
    const text = document.getElementById('text-to-speak');
    const utterance = new SpeechSynthesisUtterance(text.value);

    const img = children.find(elm => elm.nodeName === 'IMG');
    utterance.addEventListener('end', () => {
      img.alt = 'smiling face';
      img.src = 'assets/images/smiling.png';
    })

    utterance.voice = voices[select.value];
    img.alt = 'speaking face';
    img.src = 'assets/images/smiling-open.png';
    synth.speak(utterance);
  });
}
