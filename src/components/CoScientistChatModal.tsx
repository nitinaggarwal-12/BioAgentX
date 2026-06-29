import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { X, Send, Bot, User, Sparkles, Dna, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CoScientistChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  agentRole: string;
  topicContext: string;
  initialQuestion?: string;
}

export const CoScientistChatModal: React.FC<CoScientistChatModalProps> = ({
  isOpen,
  onClose,
  agentName,
  agentRole,
  topicContext,
  initialQuestion
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Initialize chat with greeting or probing challenge
      const introMsg: ChatMessage = {
        id: '1',
        sender: 'agent',
        agentName: agentName,
        text: initialQuestion 
          ? `Greetings Principal Investigator. Regarding my probing question: "${initialQuestion}" — what are your thoughts on addressing this biochemical constraint?`
          : `Hello! I am the ${agentName}. I have been continuously modeling "${topicContext}". What specific hypotheses or parameter adjustments would you like to explore together?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([introMsg]);
    }
  }, [isOpen, agentName, topicContext, initialQuestion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const promptToSend = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/co-scientist-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentName,
          question: promptToSend,
          topicContext
        })
      });

      const data = await res.json();
      const botReplyText = data.reply || `Understood. Let's incorporate that feedback into the next AlphaFold structural refinement cycle.`;

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        agentName,
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        agentName,
        text: `[Offline Simulation]: That is a profound point regarding ${topicContext}. We will update the virtual ADMET scoring matrix to accommodate this boundary.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/50 rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] max-h-[90vh] flex flex-col overflow-hidden ring-1 ring-cyan-500/20"
        >
          {/* Modal Header */}
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="h-5 w-5 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base font-sans">{agentName}</h3>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-cyan-950 text-cyan-400 rounded border border-cyan-800/60 flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" /> Peer AI Co-Scientist
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">{agentRole}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat Messages Log Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950/50">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      {isUser ? 'Principal Investigator (You)' : msg.agentName}
                    </span>
                    <span className="text-[9px] font-mono text-slate-600">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-sans leading-relaxed shadow-md ${
                      isUser
                        ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-tr-sm'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-[10px] font-mono text-cyan-400">{agentName}</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-3 text-xs text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                  <span>Synthesizing multi-omics evidence base...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSendMessage} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Debate hypothesis with ${agentName}...`}
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner font-sans"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              <Send className="h-4 w-4 fill-slate-950" />
              <span className="hidden sm:inline">Transmit</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
