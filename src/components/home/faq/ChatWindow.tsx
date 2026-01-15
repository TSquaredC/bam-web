import type { RefObject } from 'react';
import type { ChatMessage } from '@/types/faq-chat';

type ChatWindowProps = {
  messages: ChatMessage[];
  isSending: boolean;
  placeholderMessage: string;
  containerRef: RefObject<HTMLDivElement | null>;
};

const ChatWindow = ({ messages, isSending, placeholderMessage, containerRef }: ChatWindowProps) => {
  return (
    <div
      ref={containerRef}
      className="max-h-80 overflow-y-auto pr-2 text-sm sm:text-base scroll-smooth"
    >
      {messages.length === 0 ? (
        <p className="text-[#A1A2A3]">{placeholderMessage}</p>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <span
              className={`mt-2 max-w-[80%] rounded-2xl px-3 py-2 text-xs sm:text-sm ${
                message.role === 'user' ? 'bg-[#BD0308] text-white' : 'bg-[#1E1E1E] text-[#E6E6E6]'
              }`}
            >
              {message.content}
            </span>
          </div>
        ))
      )}
      {isSending ? (
        <div className="flex justify-start">
          <span className="flex items-center gap-1 rounded-2xl bg-[#1E1E1E] px-3 py-2">
            <span
              className="inline-block h-1 w-1 md:h-1.5 md:w-1.5 animate-bounce rounded-full bg-[#6E6E6E]"
              style={{ animationDelay: '0ms', animationDuration: '600ms' }}
            />
            <span
              className="inline-block h-1 w-1 md:h-1.5 md:w-1.5 animate-bounce rounded-full bg-[#6E6E6E]"
              style={{ animationDelay: '120ms', animationDuration: '600ms' }}
            />
            <span
              className="inline-block h-1 w-1 md:h-1.5 md:w-1.5 animate-bounce rounded-full bg-[#6E6E6E]"
              style={{ animationDelay: '240ms', animationDuration: '600ms' }}
            />
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default ChatWindow;
