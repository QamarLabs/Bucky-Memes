export const getTestIndicator = () => process.env.NODE_ENV === "development";

export const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};
