if (import.meta.env.DEV && vconsole) {
  await import('vconsole').then(({ default: VConsole }) => {
    new VConsole();
  });
}
