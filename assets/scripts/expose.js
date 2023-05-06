// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    const select = document.getElementById('horn-select');
    const children = Array.from(expose.children);
    const hornimg = children.find(elem => elem.nodeName === 'IMG');
    const hornaud = children.find(elem => elem.nodeName === 'AUDIO');
    const button = children.find(elem => elem.nodeName === 'BUTTON');
    const volcont = document.getElementById('volume-controls')
    const volicon = Array.from(volcont.children).find(elem => elem.nodeName === 'IMG')
    const volume = document.getElementById('volume');
    const jsConfetti = new JSConfetti()

    select.addEventListener('change', () => {
        hornimg.src = `./assets/images/${select.value}.svg`;
        hornaud.src = `./assets/audio/${select.value}.mp3`;
    })

    button.addEventListener('click', () => {
        hornaud.play();
        if (select.value === 'party-horn') {
            jsConfetti.addConfetti();
        }
    })

    volume.addEventListener('input', () => {
        console.log(volume.value);
        volicon.src = `assets/icons/volume-level-${getVolume(volume.value)}.svg`
        console.log(volicon.src);
        hornaud.volume = volume.value / 100;
    })

    function getVolume(value) {
        if (value == 0) {
            return 0;
        } else if (value < 33) {
            return 1;
        } else if (value < 67) {
            return 2;
        }
        return 3;
    }
}
