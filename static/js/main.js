const url = './static/js/data/projects.json';

(() => {
  const app = {
    async init() {
      console.log('1. Application Initialized!');
      // Variables
      // Call the function cacheElements
      this.cacheElements();
      // Call the function generateUI
      this.addLoadingPage(this.loadingScreen, this.body);
      this.registerSkillAnimationObserver();
      this.getData(url);
    },
    cacheElements() {
      console.log('2. Cache the elements!');
      this.loadingScreen = document.querySelector('#loading-screen');
      this.body = document.querySelector('.body');
      this.$projects = document.querySelector('.projects');
      this.$skillsContainer = document.querySelector('#skills-container');
      this.$skills = document.querySelectorAll('.skill');
    },
    async getData(url) {
      const projects = await fetch(url, { method: 'GET' });
      const data = await projects.json();

      this.generateHTMLForWork(data);
    },
    generateHTMLForWork(data) {
      let tmpStr = '';

      for (let i = 0; i < data.length; i++) {
        tmpStr += `
        <div class="project">
          <picture class="project--picture">
            <img src="${data[i].picture}" alt="project picture">
          </picture>
          <div class="project--body">
            <div class="project--content">
              <span class="text--color">${data[i].name}</span>
            </div>
            <div class="project--buttons">
              <div>
                <a href="${data[i].url}" class="project--button" target="_blank">Website</a>
                <a href="${data[i].href}" class="project--button" target="_blank">Details</a>
              </div>
              <a class="github--btn" href="${data[i].github}" target="_blank">
                Zie code
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
              </a>
            </div>
          </div>
        </div>
        `;
      }

      this.$projects.innerHTML = tmpStr;
    },
    addLoadingPage(loading, body) {
      window.addEventListener('load', function () {
        loading.style.display = 'none';
        body.style.display = 'block';
      });
    },
    registerSkillAnimationObserver() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.74, // Adjust the threshold as per your requirement
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startSkillAnimations();
            observer.unobserve(entry.target);
          }
        });
      }, options);

      observer.observe(this.$skillsContainer);
    },
    startSkillAnimations() {
      this.$skills.forEach((skill) => {
        const progressBar = skill.querySelector('.skill--progress-bar');
        const width = progressBar.dataset.progress;
        console.log(width)
        progressBar.style.width = '0';
        progressBar.style.animation = `fill-progress${width} 3s ease forwards`;
      });
    },
  };
  app.init();
})();
