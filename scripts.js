// Радиационный счетчик
class RadiationMeter {
  constructor() {
    this.level = 0;
    this.element = document.querySelector('.radiation-level');
    this.updateInterval = null;
  }

  start() {
    this.updateInterval = setInterval(() => {
      this.level = Math.floor(Math.random() * 100);
      this.updateDisplay();
    }, 3000);
  }

  updateDisplay() {
    let status = 'нормальный';
    if (this.level > 80) status = 'критический';
    else if (this.level > 50) status = 'повышенный';
    
    this.element.textContent = `Уровень радиации: ${status} (${this.level}%)`;
    this.element.style.color = this.level > 80 ? '#ff0000' : '#39ff14';
  }
}
// Добавляем к существующему JavaScript

// Функция для инициализации уровней опасности
function initDangerLevels() {
  const locationCards = document.querySelectorAll('.location-card');
  
  locationCards.forEach(card => {
    const description = card.querySelector('p');
    const dangerMatch = description.textContent.match(/Уровень опасности (\d+)/);
    
    if (dangerMatch) {
      const dangerLevel = parseInt(dangerMatch[1]);
      card.setAttribute('data-danger', dangerLevel);
      
      // Создаем элемент для отображения уровня опасности
      const dangerIndicator = document.createElement('div');
      dangerIndicator.className = `danger-level danger-level-${dangerLevel}`;
      
      // Добавляем иконку опасности
      const dangerIcon = document.createElement('span');
      dangerIcon.innerHTML = `
        <svg class="danger-icon" viewBox="0 0 24 24">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>
        </svg>
      `;
      
      // Добавляем текст уровня опасности
      let dangerText;
      switch(dangerLevel) {
        case 0:
          dangerText = 'Мирная зона';
          break;
        case 1:
          dangerText = 'Минимальная угроза';
          break;
        case 2:
          dangerText = 'Низкая угроза';
          break;
        case 3:
          dangerText = 'Средняя угроза';
          break;
        case 4:
          dangerText = 'Высокая угроза';
          break;
        case 5:
          dangerText = 'Критическая угроза';
          break;
        default:
          dangerText = 'Неизвестный уровень угрозы';
      }
      
      dangerIndicator.appendChild(dangerIcon);
      dangerIndicator.appendChild(document.createTextNode(dangerText));
      
      // Добавляем дополнительную информацию об опасности
      const dangerInfo = document.createElement('div');
      dangerInfo.className = 'danger-text';
      dangerInfo.textContent = `Уровень опасности: ${dangerLevel}`;
      
      // Вставляем элементы в карточку
      card.insertBefore(dangerIndicator, description.nextSibling);
      card.insertBefore(dangerInfo, dangerIndicator.nextSibling);
      
      // Добавляем эффект свечения для опасных зон
      if (dangerLevel >= 4) {
        let glowColor = dangerLevel === 5 ? '#ff0000' : '#FF5722';
        card.style.boxShadow = `inset 0 0 10px ${glowColor}`;
      }
    }
  });
}

// Функция для анимации критических уровней опасности
function animateCriticalLevels() {
  const criticalZones = document.querySelectorAll('.danger-level-5');
  
  criticalZones.forEach(zone => {
    // Добавляем случайные помехи
    setInterval(() => {
      if (Math.random() > 0.8) { // 20% шанс появления помех
        zone.style.opacity = '0.8';
        setTimeout(() => {
          zone.style.opacity = '1';
        }, 100);
      }
    }, 500);
  });
}

// Функция для создания эффекта радиационного шума
function createRadiationNoise(card) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.className = 'radiation-noise';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity = '0.1';
  canvas.style.mixBlendMode = 'screen';
  
  function drawNoise() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 255;
      data[i] = noise;     // red
      data[i + 1] = noise; // green
      data[i + 2] = 0;     // blue
      data[i + 3] = 20;    // alpha
    }
    
    ctx.putImageData(imageData, 0, 0);
  }
  
  function resize() {
    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;
  }
  
  resize();
  window.addEventListener('resize', resize);
  
  setInterval(drawNoise, 100);
  card.appendChild(canvas);
}

// Обновляем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Существующие инициализации...
  
  initDangerLevels();
  animateCriticalLevels();
  
  // Добавляем радиационный шум для опасных зон
  document.querySelectorAll('.location-card[data-danger="5"]').forEach(card => {
    createRadiationNoise(card);
  });
});



// Анимация появления секций
function initSectionAnimations() {
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
  });
}

// Эффект статических помех
function addStaticEffect() {
  const static = document.createElement('div');
  static.classList.add('static-effect');
  document.body.appendChild(static);

  setInterval(() => {
    static.style.opacity = Math.random() * 0.1;
  }, 100);
}

// Плавная прокрутка для навигации
function initSmoothScroll() {
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

// Кнопка "Узнать больше"
function initMoreInfoButton() {
  const button = document.getElementById('more-info');
  if (button) {
    button.addEventListener('click', () => {
      const history = document.getElementById('history');
      if (history) {
        history.scrollIntoView({ behavior: 'smooth' });
        
        // Добавляем эффект свечения
        history.style.boxShadow = '0 0 20px var(--soviet-red)';
        setTimeout(() => {
          history.style.boxShadow = 'none';
        }, 1000);
      }
    });
  }
}

// Инициализация всех эффектов
document.addEventListener('DOMContentLoaded', () => {
  const radiationMeter = new RadiationMeter();
  radiationMeter.start();
  
  addDamageEffects();
  initSectionAnimations();
  addStaticEffect();
  initSmoothScroll();
  initMoreInfoButton();
});