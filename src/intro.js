let highlight = document.querySelector('.highlight');

highlight.forEach(hightlight => {
    highlight.innerHTML = hightlight.innerText.split('').map((letter) => `<span>${letter}</span>`)
});