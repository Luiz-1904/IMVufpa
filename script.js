const isMobile = window.innerWidth <= 768;

const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.menu-btn');
const navRight = document.querySelector('.nav-right');
const backToTop = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('header.hero, section');
const navLinks = document.querySelectorAll('.nav-right a');

// Função para abrir/fechar menu
function toggleMenu() {
  navRight.classList.toggle('active');
  
  // Animação do botão hamburguer para X
  menuBtn.classList.toggle('open');
  
  // Impede o scroll do body quando menu aberto
  document.body.classList.toggle('no-scroll');
}

// Evento de clique no botão
menuBtn.addEventListener('click', toggleMenu);

// Fechar menu ao clicar em um link (mobile)
document.querySelectorAll('.nav-right a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  });
});

// Fechar menu ao redimensionar para desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navRight.classList.remove('active');
    menuBtn.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }
});
// Fechar menu ao clicar em um link (para mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (isMobile) {
      navRight.classList.remove('active');
    }
  });
});

// Evento principal de scroll
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Só aplica esconder a navbar se NÃO for mobile
  if (!isMobile) {
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
  }

  // Mostrar ou esconder botão "voltar ao topo"
  if (currentScrollY > 300) {
    backToTop.style.display = 'block';
    backToTop.style.opacity = '1';
    backToTop.style.transform = 'scale(1)';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.transform = 'scale(0.8)';
    setTimeout(() => {
      if (window.scrollY < 300) backToTop.style.display = 'none';
    }, 300);
  }

  // ScrollSpy — destacar link do menu
  sections.forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - 150;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });

  lastScrollY = currentScrollY;
});

// Observer para as animações de fade-in
const fadeSections = document.querySelectorAll('.fade-in');
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

fadeSections.forEach(section => {
  observer.observe(section);
});

// Verificar se há hash na URL para scroll suave
if (window.location.hash) {
  setTimeout(() => {
    const target = document.querySelector(window.location.hash);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 120,
        behavior: 'smooth'
      });
    }
  }, 100);
}

// Botão "Voltar ao Topo"
backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Loader
window.addEventListener('load', function() {
  setTimeout(function() {
    document.querySelector('.loader').classList.add('loader-hidden');
  }, 1000);
});

// Cursor personalizado
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Efeito cursor ativo
const interactiveElements = document.querySelectorAll('a, button, .pill, .circle-item, .menu-btn');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
});

// Efeito de digitação no hero
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  
  let i = 0;
  const typingEffect = setInterval(() => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingEffect);
    }
  }, 100);
}

// Tooltips para ícones
tippy('[data-tippy-content]', {
  placement: 'top',
  animation: 'scale',
  theme: 'green',
});

// Efeito de hover 3D nos cards
const circleItems = document.querySelectorAll('.circle-item');
circleItems.forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const x = e.clientX - item.getBoundingClientRect().left;
    const y = e.clientY - item.getBoundingClientRect().top;
    
    const centerX = item.offsetWidth / 2;
    const centerY = item.offsetHeight / 2;
    
    const angleX = (y - centerY) / 10;
    const angleY = (centerX - x) / 10;
    
    item.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// Scroll suave com offset para a navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      const navbarHeight = document.querySelector('.nav').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Adiciona hash na URL sem pular
      history.pushState(null, null, targetId);
    }
  });
});

// Observer para efeito reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Toggle de tema
const themeToggle = document.createElement('div');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
  document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
  themeToggle.innerHTML = document.body.dataset.theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  
  // Salva preferência
  localStorage.setItem('theme', document.body.dataset.theme);
});

// Carrega tema salvo
if (localStorage.getItem('theme') === 'light') {
  document.body.dataset.theme = 'light';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Efeito de digitação para os textos
function typeWriter(element, speed) {
  const text = element.textContent;
  element.textContent = '';
  
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// Aplicar efeito de digitação nos títulos
document.querySelectorAll('.text-content h2').forEach(title => {
  title.style.visibility = 'hidden';
  setTimeout(() => {
    title.style.visibility = 'visible';
    typeWriter(title, 100);
  }, 500);
});

// Efeito hover nos botões
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-3px)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
  });
});

// Adicionar classe pulse para o primeiro botão de cada seção
document.querySelectorAll('.text-content').forEach(content => {
  const firstButton = content.querySelector('.cta-button');
  if (firstButton) {
    firstButton.classList.add('pulse');
  }
});

