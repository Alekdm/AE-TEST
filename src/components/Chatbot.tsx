import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  initialOpen?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you with your IT needs today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isCollectingInfo, setIsCollectingInfo] = useState(false);
  const [needsLiveSupport, setNeedsLiveSupport] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse: Message;
      const lowerMessage = message.toLowerCase();

      if (isCollectingInfo) {
        botResponse = {
          id: Date.now().toString(),
          text: "Thank you for providing your information. How can we assist you with your IT needs?",
          sender: "bot",
          timestamp: new Date(),
        };
        setIsCollectingInfo(false);
      } else if (
        lowerMessage.includes("help") ||
        lowerMessage.includes("support") ||
        lowerMessage.includes("assistance")
      ) {
        botResponse = {
          id: Date.now().toString(),
          text: "It seems like you need specialized assistance. Would you like to connect with a live support agent?",
          sender: "bot",
          timestamp: new Date(),
        };
        setNeedsLiveSupport(true);
      } else if (
        lowerMessage.includes("price") ||
        lowerMessage.includes("cost") ||
        lowerMessage.includes("quote")
      ) {
        botResponse = {
          id: Date.now().toString(),
          text: "Our pricing varies based on the specific service. Would you like to book a free consultation for a personalized quote?",
          sender: "bot",
          timestamp: new Date(),
        };
      } else if (
        lowerMessage.includes("book") ||
        lowerMessage.includes("appointment") ||
        lowerMessage.includes("schedule")
      ) {
        botResponse = {
          id: Date.now().toString(),
          text: "You can book an appointment by clicking the 'Book an Appointment' button on our website. Would you like me to guide you through the process?",
          sender: "bot",
          timestamp: new Date(),
        };
      } else if (
        lowerMessage.includes("service") ||
        lowerMessage.includes("offer")
      ) {
        botResponse = {
          id: Date.now().toString(),
          text: "We offer a range of IT services including network setup, computer repair, security camera installation, and Wi-Fi optimization. Which service are you interested in?",
          sender: "bot",
          timestamp: new Date(),
        };
      } else if (
        lowerMessage.includes("contact") ||
        lowerMessage.includes("phone") ||
        lowerMessage.includes("email")
      ) {
        botResponse = {
          id: Date.now().toString(),
          text: "You can reach us at (949) 555-1234 or email us at support@octechsupport.com. Would you like me to have someone contact you directly?",
          sender: "bot",
          timestamp: new Date(),
        };
      } else {
        botResponse = {
          id: Date.now().toString(),
          text: "Thanks for your message. To better assist you, could you please provide your name and email?",
          sender: "bot",
          timestamp: new Date(),
        };
        setIsCollectingInfo(true);
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleLiveSupport = () => {
    const liveAgentMessage: Message = {
      id: Date.now().toString(),
      text: "Connecting you with a live support agent. Please wait a moment...",
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, liveAgentMessage]);

    // Simulate live agent connection
    setTimeout(() => {
      const agentConnectedMessage: Message = {
        id: Date.now().toString(),
        text: "Live agent connected. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentConnectedMessage]);
    }, 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-[380px] h-[500px] shadow-lg bg-background border-primary/10">
              <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 bg-primary-foreground">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=techsupport"
                      alt="Chatbot"
                    />
                    <AvatarFallback>IT</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">IT Support</h3>
                    <p className="text-xs opacity-80">Online</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMinimize}
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleChat}
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 overflow-y-auto flex-grow h-[360px] flex flex-col space-y-4">
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-2">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isCollectingInfo && (
                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <p className="text-sm font-medium">
                      Please provide your information:
                    </p>
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-sm"
                    />
                    <Input
                      placeholder="Your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsCollectingInfo(false);
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: Date.now().toString(),
                            text: `Information received - Name: ${name}, Email: ${email}`,
                            sender: "bot",
                            timestamp: new Date(),
                          },
                        ]);
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                )}

                {needsLiveSupport && (
                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <p className="text-sm font-medium">
                      Would you like to connect with a live agent?
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setNeedsLiveSupport(false);
                          handleLiveSupport();
                        }}
                      >
                        Yes, please
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setNeedsLiveSupport(false);
                          setMessages((prev) => [
                            ...prev,
                            {
                              id: Date.now().toString(),
                              text: "No problem. I'll continue to assist you here. What questions do you have?",
                              sender: "bot",
                              timestamp: new Date(),
                            },
                          ]);
                        }}
                      >
                        No, thanks
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 border-t">
                <div className="flex w-full space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-grow"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4"
          >
            <Card className="w-[380px] shadow-md">
              <CardHeader className="bg-primary text-primary-foreground p-3 flex flex-row justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6 bg-primary-foreground">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=techsupport"
                      alt="Chatbot"
                    />
                    <AvatarFallback>IT</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-sm">IT Support</h3>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMinimize}
                    className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleChat}
                    className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={toggleChat}
        size="lg"
        className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default Chatbot;
