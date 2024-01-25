document.addEventListener('DOMContentLoaded', function() {
    var getStartedButton = document.getElementById('get-started');
    getStartedButton.addEventListener('click', function() {
      // Code to transition from splash screen to the main extension view
      window.location.href = 'MainPage.html'; // Assuming you have a MainPage.html
    });
  });
  