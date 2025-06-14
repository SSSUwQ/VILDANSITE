document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('coinCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const coins = [];
  const coinCount = 30;
  const colors = ['#FFD700', '#FFDF00', '#FFEC8B'];

  class Coin {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height;
      this.size = Math.random() * 15 + 5;
      this.speed = Math.random() * 3 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speed;
      if (this.y > canvas.height) {
        this.y = Math.random() * -100;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  for (let i = 0; i < coinCount; i++) {
    coins.push(new Coin());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    coins.forEach(coin => {
      coin.update();
      coin.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.portfolio-item');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentIndex = 0;
  const totalItems = items.length;

  function showItem(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
  }

  prevBtn.addEventListener('click', () => {
    showItem((currentIndex - 1 + totalItems) % totalItems);
  });

  nextBtn.addEventListener('click', () => {
    showItem((currentIndex + 1) % totalItems);
  });
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showItem(parseInt(dot.dataset.index));
    });
  });
  let autoplay = setInterval(() => {
    showItem((currentIndex + 1) % totalItems);
  }, 5000);
  document.querySelector('.portfolio-carousel').addEventListener('mouseenter', () => {
    clearInterval(autoplay);
  });

  document.querySelector('.portfolio-carousel').addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      showItem((currentIndex + 1) % totalItems);
    }, 5000);
  });
});