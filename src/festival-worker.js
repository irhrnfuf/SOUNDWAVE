// Unit II: HTML5 Web Worker (Runs in a background thread)
self.onmessage = function (event) {
  const { attendees, stages } = event.data;
  // Simulate heavy acoustic & crowd capacity calculation in background thread
  let totalSoundPower = 0;
  for (let i = 1; i <= 50000; i++) {
    totalSoundPower += Math.sqrt(i * stages) * 0.001;
  }
  const decibelEstimate = Math.min(115, Math.round(88 + (attendees / 1000) * 2.4));
  const recommendedWattage = attendees * stages * 120;

  self.postMessage({
    decibelEstimate,
    recommendedWattage,
    computedScore: totalSoundPower.toFixed(1),
    timestamp: new Date().toLocaleTimeString()
  });
};
