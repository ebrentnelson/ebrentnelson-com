class EBNApp {
  constructor() {
    this.timer = null;
    this.init();
  }

  init() {
    this.setCurrentYear();
    this.initHomePage();
  }

  setCurrentYear() {
    const yearElements = document.querySelectorAll('.year');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(element => {
      element.textContent = currentYear;
    });
  }

  initHomePage() {
    const grid = document.querySelector('.grid');
    if (!grid) return; // Not on home page

    const tiles = document.querySelectorAll('.grid .tile');

    tiles.forEach(tile => {
      tile.addEventListener('mouseover', () => {
        this.stopShaking();
        this.clearShakingClasses(tiles);
      });

      tile.addEventListener('mouseout', () => {
        this.startShaking(tiles);
      });
    });

    this.startShaking(tiles);
  }

  startShaking(tiles) {
    this.timer = setInterval(() => {
      this.clearShakingClasses(tiles);
      const randomTile = this.getRandomElement(tiles);
      if (randomTile) {
        randomTile.classList.add('shaking');
      }
    }, 2000);
  }

  stopShaking() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  clearShakingClasses(tiles) {
    tiles.forEach(tile => {
      tile.classList.remove('shaking');
    });
  }

  getRandomElement(elements) {
    if (elements.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex];
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new EBNApp();
});
