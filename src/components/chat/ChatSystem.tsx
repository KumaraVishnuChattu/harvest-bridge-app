
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/pages/Index';
import { Send, Mic, Phone, Video, MoreVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatSystemProps {
  userRole: UserRole;
  userName: string;
}

interface ChatRoom {
  id: string;
  name: string;
  role: UserRole;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'voice' | 'image';
  isOwn: boolean;
}

const chatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    role: 'farmer',
    lastMessage: 'The tomatoes are ready for harvest',
    timestamp: '10:30 AM',
    unread: 2,
    avatar: '👨‍🌾',
    online: true
  },
  {
    id: '2',
    name: 'Agri Foods Ltd',
    role: 'buyer',
    lastMessage: 'Can you deliver 500kg by Friday?',
    timestamp: '9:15 AM',
    unread: 0,
    avatar: '🏢',
    online: false
  },
  {
    id: '3',
    name: 'Lakshmi Devi',
    role: 'farmer',
    lastMessage: 'Voice message',
    timestamp: 'Yesterday',
    unread: 1,
    avatar: '👩‍🌾',
    online: true
  }
];

const sampleMessages: Message[] = [
  {
    id: '1',
    sender: 'Ramesh Kumar',
    content: 'Hello! I have fresh tomatoes available.',
    timestamp: '10:00 AM',
    type: 'text',
    isOwn: false
  },
  {
    id: '2',
    sender: 'You',
    content: 'What quantity do you have available?',
    timestamp: '10:05 AM',
    type: 'text',
    isOwn: true
  },
  {
    id: '3',
    sender: 'Ramesh Kumar',
    content: 'Around 300kg of Grade A tomatoes',
    timestamp: '10:10 AM',
    type: 'text',
    isOwn: false
  },
  {
    id: '4',
    sender: 'Ramesh Kumar',
    content: 'The tomatoes are ready for harvest',
    timestamp: '10:30 AM',
    type: 'text',
    isOwn: false
  }
];

export const ChatSystem: React.FC<ChatSystemProps> = ({ userRole, userName }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        type: 'text',
        isOwn: true
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Voice recording stopped" : "Voice recording started",
      description: isRecording ? "Processing your message..." : "Speak now...",
    });
  };

  const selectedChatData = chatRooms.find(chat => chat.id === selectedChat);

  if (!selectedChat) {
    return (
      <div className="space-y-4 p-4">
        <h2 className="text-xl font-bold">Messages</h2>
        
        <div className="space-y-3">
          {chatRooms.map((chat) => (
            <Card 
              key={chat.id} 
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setSelectedChat(chat.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="text-2xl">{chat.avatar}</div>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate">{chat.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                        {chat.unread > 0 && (
                          <Badge className="bg-agri-green-500 text-white min-w-[20px] h-5 text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          chat.role === 'farmer' 
                            ? 'bg-agri-green-100 text-agri-green-800' 
                            : 'bg-agri-orange-100 text-agri-orange-800'
                        }`}
                      >
                        {chat.role}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Chat Header */}
      <Card className="rounded-b-none border-b-0">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedChat(null)}
              >
                ←
              </Button>
              <div className="relative">
                <div className="text-2xl">{selectedChatData?.avatar}</div>
                {selectedChatData?.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold">{selectedChatData?.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedChatData?.online ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`chat-bubble ${
                message.isOwn
                  ? 'bg-agri-green-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-foreground border'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.isOwn ? 'text-green-100' : 'text-muted-foreground'
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <Card className="rounded-t-none border-t-0">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full ${isRecording ? 'bg-red-100 text-red-600' : ''}`}
                onClick={handleVoiceRecord}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            
            <Button
              className="rounded-full bg-agri-green-500 hover:bg-agri-green-600"
              size="sm"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
