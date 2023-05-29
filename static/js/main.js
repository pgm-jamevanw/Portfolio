(() => {
  const app = {
    async init () {
      console.log('1. Application Initialized!');
      // Variables
      // Call the function cacheElements
      this.cacheElements();
      // Call the function generateUI
    },
    cacheElements () {
      console.log('2. Chache the elements!');
      this.loadingScreen = document.querySelector('#loading-screen');
      this.body = document.querySelector(".body");
      console.log(this.loadingScreen, this.body)
      this.addLoadingPage(this.loadingScreen, this.body);
    },
    addLoadingPage (loading, body) {
      window.addEventListener('load', function() {
        loading.style.display = 'none';
        body.style.display = 'block';
      });
    }
  };
  app.init();
})();
