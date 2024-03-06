class Timeline {
  constructor(element) {
    this.element = document.querySelector(element);
    this.itemSelector = ".timeline-item";
    this.activeClass = "timeline-item--active";
    this.imgSelector = ".timeline__img";
    this.init();
  }

  init() {
    this.items = Array.from(this.element.querySelectorAll(this.itemSelector));
    this.setInitialStyles();
    this.addScrollEvent();
  }

  setInitialStyles() {
    this.items[0].classList.add(this.activeClass);
    this.element.style.backgroundImage = `url(${this.items[0].querySelector(this.imgSelector).src})`;
  }

  addScrollEvent() {
    window.addEventListener("scroll", () => {
      let min, max;
      const windowHeight = window.innerHeight; // or whatever is the the height above the timeline

      const pos = window.scrollY -(windowHeight);

      this.items.forEach((item, i) => {
        min = item.offsetTop;
        max = item.offsetTop + item.clientHeight;

        if (i === this.items.length - 2 && pos > min + item.clientHeight / 2) {
          this.items.forEach(el => el.classList.remove(this.activeClass));
          this.element.style.backgroundImage = `url(${this.items[this.items.length - 1].querySelector(this.imgSelector).src})`;
          this.items[this.items.length - 1].classList.add(this.activeClass);
        } else if (pos <= max - 40 && pos >= min) {
          this.element.style.backgroundImage = `url(${item.querySelector(this.imgSelector).src})`;
          this.items.forEach(el => el.classList.remove(this.activeClass));
          item.classList.add(this.activeClass);
        }
      });
    });
  }
}

const timeline = new Timeline("#timeline");