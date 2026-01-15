import { useEffect, useMemo, useRef, useState } from 'react';
import { createKaiChat } from '@/services/api';
import ChatInput from './components/ChatInput';
import ChatWindow from './components/ChatWindow';
import FAQChips from './components/FAQChips';
import FAQHeader from './components/FAQHeader';
import { ChatMessage } from './types';

const faqChips = [
  'Who can use Bam?',
  'How do gigs and listings work?',
  'Is Bam only for film and entertainment?',
  'Is Bam free to use?',
];

const buildMessageId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const pickText = (o: Record<string, unknown>) =>
  (o.response || o.answer || o.text || o.delta || o.message || o.content || '') as string;

const pickChatId = (o: Record<string, unknown>) => (o.chat_id || o.chatId || o.id || '') as string;

const extractKaiResponse = (payload: unknown) => {
  let text = '';
  let chatId = '';

  const handleRecord = (record: Record<string, unknown>) => {
    const response = record.response as string | undefined;
    if (response !== 'stream_complete' && response !== 'chat_saved') {
      text += pickText(record);
    }
    chatId ||= pickChatId(record);
  };

  if (!payload) return { text, chatId };

  if (typeof payload === 'string') {
    payload
      .split('\n')
      .map((l) => l.replace(/^data:\s?/, '').trim())
      .filter((l) => l && l !== '[DONE]')
      .forEach((line) => {
        try {
          handleRecord(JSON.parse(line));
        } catch {
          text += line;
        }
      });

    return { text: text.trim(), chatId };
  }

  if (typeof payload === 'object') {
    handleRecord(payload as Record<string, unknown>);
    return { text: text.trim(), chatId };
  }

  return { text, chatId };
};

const FAQ = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMicSupported, setIsMicSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const typingRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any)?.SpeechRecognition || (window as any)?.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsMicSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (e: any) => {
      const transcript = Array.from(e.results)
        .slice(e.resultIndex)
        .map((r: any) => r[0].transcript)
        .join('');
      setQuery(transcript.trim());
    };

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      setError('Mic failed. Please try again.');
    };

    recognitionRef.current = recognition;

    return () => {
      typingRef.current && clearInterval(typingRef.current);
      recognition.stop();
    };
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isSending, isTyping]);

  const placeholderMessage = useMemo(
    () => (isSending ? 'Thinking...' : error || ''),
    [isSending, error],
  );

  const typeMessage = (fullText: string, id: string) => {
    typingRef.current && clearInterval(typingRef.current);

    let i = 0;
    setIsTyping(true);

    typingRef.current = window.setInterval(() => {
      i++;
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, content: fullText.slice(0, i) } : m)),
      );
      if (i >= fullText.length) {
        clearInterval(typingRef.current!);
        setIsTyping(false);
      }
    }, 15);
  };

  const handleMicToggle = () => {
    if (!recognitionRef.current || isSending || isTyping) return;
    isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
    setError(null);
  };

  const handleSend = async (nextQuery?: string) => {
    const trimmed = (nextQuery ?? query).trim();
    if (!trimmed || isSending || isTyping) return;

    setQuery('');
    setError(null);

    setMessages((m) => [...m, { id: buildMessageId(), role: 'user', content: trimmed }]);
    setIsSending(true);

    try {
      const res = await createKaiChat({ query: trimmed, chat_id: chatId ?? undefined });
      const parsed = extractKaiResponse(res?.data);

      parsed.chatId && setChatId(parsed.chatId);
      if (!parsed.text) throw new Error('Empty response');

      const id = buildMessageId();
      setMessages((m) => [...m, { id, role: 'assistant', content: '' }]);
      typeMessage(parsed.text, id);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-20 text-white sm:py-28 mt-40 sm:mt-60 xl:mt-80">
      <div className="section-width 2xl:max-w-screen-2xl md:w-11/12 mx-auto max-md:mx-3">
        <div className="rounded-3xl bg-white p-2 sm:p-4">
          <div className="bg-[#111111] px-2 pb-4 sm:px-12 sm:pb-16 rounded-xl sm:rounded-3xl">
            <FAQHeader title="FAQ's" subtitle="Got Questions? We've Got Answers." />

            {messages.length === 0 && <FAQChips chips={faqChips} onSelect={handleSend} />}

            <div className="bg-[#0f0f0f] px-3 py-4 sm:px-6 sm:py-6 rounded-md sm:rounded-xl">
              <ChatWindow
                messages={messages}
                isSending={isSending}
                placeholderMessage={placeholderMessage}
                containerRef={containerRef}
              />

              <ChatInput
                query={query}
                onQueryChange={setQuery}
                isSending={isSending}
                isTyping={isTyping}
                isListening={isListening}
                isMicSupported={isMicSupported}
                onMicToggle={handleMicToggle}
                onSend={handleSend}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
