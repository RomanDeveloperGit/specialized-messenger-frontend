export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker не поддерживается этим браузером');

    return null;
  }

  try {
    globalThis.__serviceWorkerRegistration =
      await navigator.serviceWorker.register('/service-worker.js');

    await navigator.serviceWorker.ready;

    console.log(
      'Service Worker зарегистрирован:',
      globalThis.__serviceWorkerRegistration,
    );

    return globalThis.__serviceWorkerRegistration;
  } catch (err) {
    console.error('Ошибка регистрации Service Worker:', err);

    return null;
  }
};
