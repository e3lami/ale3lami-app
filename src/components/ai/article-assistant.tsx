'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { Bot, User, Send, Loader2, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// --- Configuration ---
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";
const SYSTEM_INSTRUCTION = 'You are the AI-E3lami Assistant. Use the article content to help the user. We are in 2026, be smart and concise.';

// --- Types ---
interface Message {
  role: 'user' | 'model' | 'system';
  content: string;
}

interface ArticleAssistantProps {
  articleText: string;
}

// --- Component ---
export default function ArticleAssistant({ articleText }: ArticleAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isApiConfigured, setIsApiConfigured] = useState(false);

  const isMobile = useIsMobile();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Effect to check for API key on mount
  useEffect(() => {
    if (API_KEY) {
      setIsApiConfigured(true);
    } else {
      setIsApiConfigured(false);
    }
  }, []);
  
  // Effect to set initial message and check API key when sheet opens
  useEffect(() => {
    if (isOpen) {
      setMessages([
        { role: 'system', content: 'مرحباً! أنا مساعدك الإعلامي. كيف يمكنني مساعدتك في تحليل هذا المقال اليوم؟' }
      ]);
      setInputValue('');
      if (!API_KEY) {
         setError('Gemini API Key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env file.');
      } else {
        setError(null);
      }
    }
  }, [isOpen]);

  // Effect to scroll to the bottom of the chat on new messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);
  
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || !isApiConfigured) return;

    const newUserMessage: Message = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY!);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const history = messages
        .filter(m => m.role === 'user' || m.role === 'model')
        .map(m => ({
          role: m.role,
          parts: [{ text: m.content }],
        }));
      
      const isFirstUserMessage = history.filter(h => h.role === 'user').length === 0;

      const fullPrompt = isFirstUserMessage
          ? `${SYSTEM_INSTRUCTION}\n\n--- ARTICLE TEXT ---\n${articleText}\n\n--- USER QUESTION ---\n${inputValue}`
          : inputValue;

      const contentsForApi = [...history, { role: 'user', parts: [{ text: fullPrompt }] }];

      const result = await model.generateContent({
        contents: contentsForApi,
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ],
      });

      const responseText = result.response.text();
      setMessages(prev => [...prev, { role: 'model', content: responseText }]);

    } catch (e: any) {
      console.error(e);
      setError('Please update your Gemini API Key in the settings to continue.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderNotConfigured = () => (
    <div className="p-6 flex flex-col gap-4 items-center justify-center h-full text-center">
        <KeyRound className="h-12 w-12 text-destructive" />
        <h3 className="text-lg font-semibold">AI Assistant Not Configured</h3>
        <p className="text-sm text-muted-foreground px-4">
          Please set the <code className="font-mono bg-muted px-1.5 py-1 rounded">NEXT_PUBLIC_GEMINI_API_KEY</code> in your <code className="font-mono bg-muted px-1.5 py-1 rounded">.env</code> file to activate the assistant.
        </p>
    </div>
  );

  const renderChatInterface = () => (
    <>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role !== 'user' && (
                <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                  <AvatarFallback><Bot size={18} /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs md:max-w-md rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap break-words',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted rounded-bl-none',
                  message.role === 'system' && 'bg-transparent text-center text-xs text-muted-foreground italic w-full max-w-full'
                )}
              >
                {message.content}
              </div>
               {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><User size={18} /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                  <AvatarFallback><Bot size={18} /></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-2.5 flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
            </div>
          )}
          {error && (
             <Alert variant="destructive" className="mt-4">
                <AlertTitle>Assistant Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
             </Alert>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1"
            disabled={isLoading || !isApiConfigured}
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={isLoading || !isApiConfigured || !inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
  
  return (
    <>
      <Button
        className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40 h-16 w-16 rounded-full shadow-lg flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-110"
        onClick={() => setIsOpen(true)}
        aria-label="Discuss article with AI"
      >
        <Bot className="h-8 w-8" />
        <span className='sr-only'>ناقش هذا المقال مع الذكاء الاصطناعي</span>
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side={isMobile ? 'bottom' : 'right'} className="h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-md flex flex-col p-0 bg-card/95 backdrop-blur-xl border-border">
          <SheetHeader className="p-4 border-b border-border flex-shrink-0">
            <SheetTitle className="flex items-center gap-2 text-foreground">
              <Bot className="h-5 w-5 text-primary" />
              <span>AI-E3lami Assistant</span>
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 w-full h-full overflow-hidden flex flex-col">
            {isApiConfigured ? renderChatInterface() : renderNotConfigured()}
          </div>

        </SheetContent>
      </Sheet>
    </>
  );
}
