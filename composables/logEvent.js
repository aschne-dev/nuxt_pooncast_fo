export async function logEvent(analytics, eventName, eventParams) {
  if (!analytics) {
    return;
  }

  const { logEvent: firebaseLogEvent } = await import("firebase/analytics");
  firebaseLogEvent(analytics, eventName, eventParams);
}
