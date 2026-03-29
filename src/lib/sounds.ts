// Web Audio API sound effects utility
let audioCtx: AudioContext | null = null;

const getCtx = () => {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
};

// Simple tone helper
const playTone = (freq: number, duration: number, type: OscillatorType = "sine", volume = 0.15) => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

// ✨ Sparkle / click sound
export const playSparkle = () => {
  playTone(1200, 0.15, "sine", 0.1);
  setTimeout(() => playTone(1800, 0.1, "sine", 0.08), 50);
};

// 🌸 Bloom / flower open
export const playBloom = () => {
  playTone(523, 0.2, "sine", 0.12);
  setTimeout(() => playTone(659, 0.2, "sine", 0.1), 100);
  setTimeout(() => playTone(784, 0.3, "sine", 0.08), 200);
};

// 🎁 Surprise reveal pop
export const playPop = () => {
  playTone(300, 0.05, "square", 0.15);
  setTimeout(() => playTone(800, 0.15, "sine", 0.12), 30);
  setTimeout(() => playTone(1200, 0.1, "sine", 0.08), 80);
};

// 🕯️ Candle blow whoosh
export const playWhoosh = () => {
  const ctx = getCtx();
  const bufferSize = ctx.sampleRate * 0.3;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(2000, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
};

// 🎵 Button click
export const playClick = () => {
  playTone(600, 0.08, "sine", 0.1);
};

// 💖 Heart fill / level up
export const playLevelUp = () => {
  [523, 659, 784, 1047].forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, "sine", 0.1), i * 80);
  });
};

// 🏆 Achievement / badge
export const playAchievement = () => {
  const notes = [523, 659, 784, 1047, 1319];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.3, "triangle", 0.12), i * 100);
  });
};

// 🎂 Happy Birthday melody for Lakshmi Priya
export const playBirthdaySong = () => {
  // Happy Birthday melody notes (simplified)
  const melody = [
    // "Happy birthday to you"
    { freq: 262, dur: 0.3 }, { freq: 262, dur: 0.15 }, { freq: 294, dur: 0.4 },
    { freq: 262, dur: 0.4 }, { freq: 349, dur: 0.4 }, { freq: 330, dur: 0.6 },
    // "Happy birthday to you"
    { freq: 262, dur: 0.3 }, { freq: 262, dur: 0.15 }, { freq: 294, dur: 0.4 },
    { freq: 262, dur: 0.4 }, { freq: 392, dur: 0.4 }, { freq: 349, dur: 0.6 },
    // "Happy birthday dear Lakshmi Priya"
    { freq: 262, dur: 0.3 }, { freq: 262, dur: 0.15 }, { freq: 523, dur: 0.4 },
    { freq: 440, dur: 0.4 }, { freq: 349, dur: 0.3 }, { freq: 330, dur: 0.3 }, { freq: 294, dur: 0.6 },
    // "Happy birthday to you"
    { freq: 466, dur: 0.3 }, { freq: 466, dur: 0.15 }, { freq: 440, dur: 0.4 },
    { freq: 349, dur: 0.4 }, { freq: 392, dur: 0.4 }, { freq: 349, dur: 0.6 },
  ];

  let time = 0;
  melody.forEach(({ freq, dur }) => {
    setTimeout(() => playTone(freq, dur + 0.1, "triangle", 0.18), time * 1000);
    time += dur + 0.05;
  });
};
