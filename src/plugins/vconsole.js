if (import.meta.env.DEV && window.vconsole) {
  await import('vconsole').then(({ default: VConsole }) => {
    new VConsole();
  });
}
