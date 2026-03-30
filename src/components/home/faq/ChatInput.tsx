import { IoSend } from 'react-icons/io5';
import { LuMic } from 'react-icons/lu';
import { useState, useEffect, useRef } from 'react';

// --- OPTIMIZED HOOK ---
const useMicVisualizer = (listening: boolean, count: number) => {
  const [data, setData] = useState<number[]>(Array(count).fill(4));
  const refs = useRef<{
    ctx?: AudioContext;
    src?: MediaStreamAudioSourceNode;
    analyser?: AnalyserNode;
    raf?: number;
    stream?: MediaStream;
  }>({});

  useEffect(() => {
    const stop = () => {
      if (refs.current.raf) cancelAnimationFrame(refs.current.raf);
      refs.current.src?.disconnect();
      refs.current.analyser?.disconnect();
      refs.current.stream?.getTracks().forEach((t) => t.stop());
      refs.current.ctx?.close();
      setData(Array(count).fill(4));
    };

    if (!listening) return stop();

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.85;

        const src = ctx.createMediaStreamSource(stream);
        src.connect(analyser);

        refs.current = { stream, ctx, analyser, src };
        const buffer = new Uint8Array(analyser.frequencyBinCount);

        const loop = () => {
          analyser.getByteFrequencyData(buffer);
          const step = Math.floor(buffer.length / (count * 1.2));

          setData(
            Array.from({ length: count }, (_, i) => {
              const val = buffer[Math.min(i * step, buffer.length - 1)] || 0;
              return Math.max(4, (val / 255) * 24);
            }),
          );
          refs.current.raf = requestAnimationFrame(loop);
        };
        loop();
      } catch (e) {
        console.error('Mic Error:', e);
      }
    };

    start();
    return () => stop();
  }, [listening, count]);

  return data;
};

// --- COMPONENT ---
type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  isSending: boolean;
  isTyping: boolean;
  isListening: boolean;
  isMicSupported: boolean;
  onMicToggle: () => void;
  onSend: () => void;
};

const ChatInput = ({ query, onQueryChange, isListening, onMicToggle, onSend, ...props }: Props) => {
  const bars = useMicVisualizer(isListening, 128);
  const visuals = [...bars].reverse().concat(bars); // Create mirror effect

  // CSS mask for fading edges
  const maskStyle = {
    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  };

  return (
    <form
      className="relative mt-2 flex w-full items-center gap-3 rounded-xl bg-[#1a1a1a] py-2 px-3 sm:px-6 sm:py-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <div className="relative flex-1 flex items-center h-full overflow-hidden">
        {isListening && (
          <div
            className="absolute inset-0 flex items-center justify-center gap-[2px] w-full"
            style={maskStyle}
          >
            {visuals.map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-gray-200/80 shrink-0 transition-[height] duration-75 ease-linear"
                style={{ height: h }}
              />
            ))}
          </div>
        )}

        <input
          className={`relative z-10 w-full bg-transparent text-xs sm:text-base text-white outline-none placeholder:text-[#6E6E6E] transition-opacity duration-200 ${
            isListening ? 'opacity-0' : 'opacity-100'
          }`}
          placeholder="Do I need an account to browse Bam?"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          disabled={props.isSending || props.isTyping}
        />
      </div>

      <button
        type="button"
        onClick={onMicToggle}
        disabled={!props.isMicSupported || props.isSending || props.isTyping}
        className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full transition-colors disabled:opacity-50 ${
          isListening ? 'text-[#BD0308] bg-white/10' : 'text-white hover:bg-white/5'
        }`}
      >
        <LuMic className="h-5 w-5 sm:h-8 sm:w-8" />
      </button>

      <button
        type="submit"
        disabled={props.isSending || props.isTyping || !query.trim()}
        className="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-md bg-[#BD0308] text-white transition-colors hover:bg-[#a30307] disabled:opacity-50"
      >
        <IoSend className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>
    </form>
  );
};

export default ChatInput;
