// Will return whether the current environment is in a regular browser
// and not CEF
export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

// Basic no operation function
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};
