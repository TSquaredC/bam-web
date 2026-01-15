import { IoSend } from 'react-icons/io5';
import { LuMic } from 'react-icons/lu';

type ChatInputProps = {
  query: string;
  onQueryChange: (value: string) => void;
  isSending: boolean;
  isTyping: boolean;
  isListening: boolean;
  isMicSupported: boolean;
  onMicToggle: () => void;
  onSend: () => void;
};

const ChatInput = ({
  query,
  onQueryChange,
  isSending,
  isTyping,
  isListening,
  isMicSupported,
  onMicToggle,
  onSend,
}: ChatInputProps) => {
  return (
    <form
      className="mt-4 flex w-full items-center gap-3 rounded-md sm:rounded-xl bg-[#1a1a1a] py-2 px-3 sm:px-6 sm:py-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
    >
      <input
        className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-[#6E6E6E] sm:text-base"
        placeholder="Do I need an account to browse Bam?"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        disabled={isSending || isTyping}
        aria-label="Ask Bam a question"
      />
      <button
        type="button"
        className={`flex h-10 w-10 items-center justify-center text-white disabled:opacity-50 sm:h-11 sm:w-11 ${
          isListening ? 'text-[#BD0308]' : ''
        }`}
        aria-label="Start voice input"
        onClick={onMicToggle}
        disabled={!isMicSupported || isSending || isTyping}
        title={isMicSupported ? 'Voice input' : 'Mic not supported'}
      >
        <LuMic className="h-5 w-5 sm:h-8 sm:w-8" />
      </button>
      <button
        type="submit"
        className="flex h-8 w-8 items-center justify-center rounded-md bg-[#BD0308] text-white disabled:opacity-50 sm:h-11 sm:w-11"
        aria-label="Send message"
        disabled={isSending || isTyping || !query.trim()}
      >
        <IoSend className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>
    </form>
  );
};

export default ChatInput;
