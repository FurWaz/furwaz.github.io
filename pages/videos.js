/**
 * Loads the home page in the given element
 * @param {HTMLDivElement} content
 */
function loadVideosPage(content) {
    let h1_1 = document.createElement('h1');
    let h1_2 = document.createElement('h1');
    h1_1.id="info-message"; h1_2.id="info-message";
    h1_1.classList.add(getRandomAnimationIn()); h1_2.classList.add(getRandomAnimationIn());
    h1_1.innerHTML = "Oh, sorry ...";
    h1_2.innerHTML = "The 'video' tab is not finished yet !";
    content.appendChild(h1_1);
    content.appendChild(h1_2);
}