const vturbVideos = [
    { videoId: '67ef1b101c43bdcdf346abe4', delayInSeconds: 2502, utm: '' },
    { videoId: '67ef23c7b1ca0fb5ab90a0c2', delayInSeconds: 2591, utm: '' },
    { videoId: '67ef13d598bb6fc870fe4e75', delayInSeconds: 2497, utm: '' },
    { videoId: '67ef1f5ed79e8fc0a7600a4e', delayInSeconds: 2508, utm: '' },
    { videoId: '68003aa2ef1105ebfc6a01b9', delayInSeconds: 2575, utm: '' },
];

document.addEventListener('DOMContentLoaded', function () {
    var SECONDS_TO_DISPLAY_WHATSAPP = 99999;
    var SECONDS_TO_DISPLAY = 2562;

    var CLASS_TO_DISPLAY = 'esconder';

    /* DAQUI PARA BAIXO NAO PRECISA ALTERAR */
    var attempts = 0;
    var elsHiddenList = [];
    var elsDisplayed = false;
    var elsHidden = document.querySelectorAll(`.${CLASS_TO_DISPLAY}`);
    var alreadyDisplayedKey = `alreadyElsDisplayed${SECONDS_TO_DISPLAY}`;
    var alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);

    var whatsappDisplayed = false;
    var alreadyDisplayedKeyWhatsApp = `alreadyElsDisplayedWpp${SECONDS_TO_DISPLAY_WHATSAPP}`;
    var alreadyElsDisplayedWhatsApp = localStorage.getItem(alreadyDisplayedKeyWhatsApp);

    elsHiddenList = Array.prototype.slice.call(elsHidden);

    var showHiddenElements = function () {
        elsDisplayed = true;
        elsHiddenList.forEach(e => e.classList.remove('esconder'));
        localStorage.setItem(alreadyDisplayedKey, true);
        window.dispatchEvent(new CustomEvent('showHiddenElements'));
    };

    var showHiddenWhatsApp = function () {
        if (whatsappDisplayed) return;

        whatsappDisplayed = true;
        var el = document.querySelector('.whatsapp-button');
        el.classList.remove('esconder-whatsapp');
        localStorage.setItem(alreadyDisplayedKeyWhatsApp, true);
    };

    var startWatchVideoProgress = function () {
        if (
            typeof smartplayer === 'undefined' ||
            !(smartplayer.instances && smartplayer.instances.length)
        ) {
            if (attempts >= 10) return;
            attempts += 1;
            return setTimeout(function () {
                startWatchVideoProgress();
            }, 1000);
        }

        console.log('teste a/b delay script loaded');
        const buttonLinks = document.querySelectorAll('a');
        vturbVideos.forEach(video => {
            if (smartplayer.instances[0].analytics.player.options.id == video.videoId) {
                utmPrefix = window.location.search ? '&' : '?';
                const queryString =
                    window.location.search.replace('utm_source=FB', '') + utmPrefix + video.utm;
                if (buttonLinks[0].href.includes(video.utm)) return;
                buttonLinks.forEach(buttonLink => {
                    if (buttonLink.href.includes('?')) {
                        buttonLink.href += queryString.replace('?', '&');
                    } else {
                        buttonLink.href += queryString;
                    }
                });
            }
        });

        vturbVideos.forEach(video => {
            if (smartplayer.instances[0].analytics.player.options.id == video.videoId) {
                SECONDS_TO_DISPLAY = video.delayInSeconds;
                console.log('Delay personalizado encontrado.');
            }
        });
        
        console.log('Delay definido para:', SECONDS_TO_DISPLAY);

        smartplayer.instances[0].on('timeupdate', () => {
            var currentTime = smartplayer.instances[0].video.currentTime;

            if (elsDisplayed || smartplayer.instances[0].smartAutoPlay) return;

            if (!alreadyElsDisplayedWhatsApp && currentTime >= SECONDS_TO_DISPLAY_WHATSAPP) {
                showHiddenWhatsApp();
            }

            if (currentTime < SECONDS_TO_DISPLAY) return;

            showHiddenElements();
        });
    };

    if (alreadyElsDisplayed === 'true') {
        showHiddenElements();
    } else {
        startWatchVideoProgress();
    }

    if (alreadyElsDisplayedWhatsApp === 'true') showHiddenWhatsApp();
});
