export const analyzeWav = async (
  audioBuffer: AudioBuffer | null
): Promise<number> => {
  if (typeof window !== "undefined" && window.AudioContext) {
    return new Promise((resolve, reject) => {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const bufferSource = audioContext.createBufferSource();

      if (!audioBuffer) {
        reject("Invalid audio buffer");
        return;
      }

      bufferSource.buffer = audioBuffer;
      bufferSource.connect(analyser);
      bufferSource.start(0);

      // Estimate time for processing - using the duration of the audio buffer
      const processingTime = audioBuffer.duration;

      setTimeout(() => {
        const frequencyData = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(frequencyData);

        const sum = frequencyData.reduce((acc, val) => acc + val, 0);
        const average = sum / frequencyData.length;

        bufferSource.stop();
        audioContext.close();

        resolve(average);
      }, processingTime * 1000);
    });
  } else {
    console.error("AudioContext is not available");
    return Promise.resolve(0);
  }
};
