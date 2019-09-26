let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  $(".install-app").removeClass('hide');
});

window.addEventListener('appinstalled', (evt) => {
    console.log('App was installed!');
    $(".install-app").addClass('hide');
});

async function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    console.log(deferredPrompt)
    deferredPrompt.userChoice.then(function(choiceResult){
      if (choiceResult.outcome === 'accepted') {
        console.log('Your PWA has been installed');
        $(".install-app").removeClass('hide');
      } else {
        console.log('User chose to not install your PWA');
      }
      deferredPrompt = null;
    });
  }
}