const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);

function applyViewPort() {
  // @ts-ignore
  var isCordovaApp = !!window.cordova;
  if (isCordovaApp && /Android/i.test(navigator.userAgent)) {
    const doc = document.documentElement;
    doc.style.setProperty('--app-inset-top', `${0.01}px`);
    doc.style.setProperty('--app-inset-bottom', `${0.01}px`);
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  }

  if (
    !isCordovaApp &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
  ) {
    var ww = window.screen.width;
    var mw = 470; // min width of site
    var ratio = ww / mw; //calculate ratio
    var viewport_meta_tag = document.querySelector('[name="viewport"]');
    if (ww < mw) {
      viewport_meta_tag.setAttribute(
        'content',
        `width=${ww}, initial-scale=${ratio}, minimum-scale=${ratio}, maximum-scale=${ratio}, user-scalable=no, viewport-fit=cover`,
      );
    } else {
      viewport_meta_tag.setAttribute(
        'content',
        `width=${ww}, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover`,
      );
    }

    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  }
}

function orientationChanged() {
  const timeout = 120;
  return new window.Promise(function(resolve) {
    const go = (i:number, height0: number) => {
      window.innerHeight !== height0 || i >= timeout
        ? resolve()
        : window.requestAnimationFrame(() => go(i + 1, height0));
    };
    go(0, window.innerHeight);
  });
}

function viewPort() {
  window.addEventListener('resize', applyViewPort);

  window.addEventListener('orientationchange', function() {
    orientationChanged().then(function() {
      applyViewPort();
    });
  });

  applyViewPort();
}

export default function register() {
  viewPort();

  if ('serviceWorker' in navigator) {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker-cache-images.js`;
    checkValidServiceWorker(swUrl);
  }

  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // @ts-ignore
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);

        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://goo.gl/SC7cgQ',
          );
        });
      } else {
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl: string) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
            } else {
              console.log('Content is cached for offline use.');
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl: string) {
  fetch(swUrl)
    .then(response => {
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.',
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
