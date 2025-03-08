export const registerServiceWorker = (onUpdateFound) => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log(
                        'ServiceWorker registration successful with scope: ',
                        registration.scope
                    );

                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;

                        if (installingWorker) {
                            installingWorker.onstatechange = () => {
                                if (
                                    installingWorker.state === 'installed' &&
                                    navigator.serviceWorker.controller
                                ) {
                                    // Trigger the callback to notify the app
                                    onUpdateFound();
                                }
                            };
                        }
                    };
                })
                .catch((err) =>
                    console.error('ServiceWorker registration failed: ', err)
                );
        });

        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('New Service Worker is controlling the page.');
            location.reload();
        });
    }
};
