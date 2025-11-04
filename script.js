let highestZ = 1;

class Paper {
  constructor(el){
    this.el = el;
    this.holding = false;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.rotation = 0;
    this.init();
  }

  init(){
    this.el.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      this.holding = true;
      this.el.style.zIndex = ++highestZ;
      this.startX = t.clientX;
      this.startY = t.clientY;
      this.offsetX = this.currentX;
      this.offsetY = this.currentY;
    }, {passive:false});

    window.addEventListener('touchmove', (e) => {
      if(!this.holding) return;
      const t = e.touches[0];
      const dx = t.clientX - this.startX;
      const dy = t.clientY - this.startY;
      this.currentX = this.offsetX + dx;
      this.currentY = this.offsetY + dy;
      this.update();
    }, {passive:false});

    window.addEventListener('touchend', () => { this.holding = false; });
  }

  update(){
    this.el.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
  }
}

document.querySelectorAll('.paper').forEach(el => new Paper(el));