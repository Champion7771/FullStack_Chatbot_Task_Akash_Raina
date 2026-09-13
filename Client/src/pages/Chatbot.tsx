import { useState } from "react";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const questions = [
  "What services does DroneTV provide?",
  "What courses / training are available?",
  "How can I contact DroneTV?",
  "How can I register?",
  "I am interested in a service.",
  "I am a student.",
  "I want to speak with someone.",
];

function getBotResponse(message: string): string {
  const text = message.toLowerCase().trim();

  // Services
  if (
    text.includes("what services") ||
    text.includes("services does dronetv") ||
    text === "services"
  ) {
    return "DroneTV provides drone-related services for different commercial and professional requirements.";
  }

  // Courses / Training
  if (
    text.includes("course") ||
    text.includes("training") ||
    text.includes("courses")
  ) {
    return "DroneTV provides drone training programs for people who want to learn and develop drone-related skills.";
  }

  // Contact
  if (
    text.includes("contact") ||
    text.includes("reach you") ||
    text.includes("contact dronetv")
  ) {
    return "You can contact DroneTV by submitting the enquiry form on this website.";
  }

  // Registration
  if (
    text.includes("register") ||
    text.includes("registration") ||
    text.includes("sign up")
  ) {
    return "You can register your interest by submitting the enquiry form with your details.";
  }

  // Interested in service
  if (
    text.includes("interested in a service") ||
    text.includes("interested in service") ||
    text.includes("interested")
  ) {
    return "Sure. Please submit an enquiry with the service or course you are interested in.";
  }

  // Student
  if (
    text.includes("i am a student") ||
    text.includes("i'm a student") ||
    text.includes("student")
  ) {
    return "If you are a student, select Student as your user type when submitting an enquiry.";
  }

  // Speak with someone
  if (
    text.includes("speak") ||
    text.includes("talk to someone") ||
    text.includes("someone")
  ) {
    return "Please submit an enquiry with your contact details and someone from DroneTV can follow up with you.";
  }

  // Unknown question
  return "Sorry, I don't understand that question. Please ask about DroneTV's services, courses, registration, or contact information.";
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I'm the DroneTV Support Assistant. How can I help you?",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = (messageText: string) => {
    const text = messageText.trim();

    if (!text) {
      return;
    }

    const userMessage: Message = {
      sender: "user",
      text: text,
    };

    const botMessage: Message = {
      sender: "bot",
      text: getBotResponse(text),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  const resetChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "Hello! I'm the DroneTV Support Assistant. How can I help you?",
      },
    ]);

    setInput("");
  };

  return (
    <main className="min-h-[80vh] bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Support Assistant
          </h1>

          <p className="mt-2 text-gray-400">
            Ask us about our services and courses.
          </p>
        </div>

        {/* Chat Box */}
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 p-4">
            <div>
 <p className="text-xs text-green-400">Online</p>
            </div>

            <button
              type="button"
              onClick={resetChat}
              className="text-sm text-gray-400 transition hover:text-yellow-400 cursor-pointer"
            >
              Reset Chat
            </button>
          </div>

          {/* Messages */}
          <div className="h-100 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
                    message.sender === "user"
                      ? "bg-yellow-400 text-black"
                      : "bg-zinc-800 text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="border-t border-zinc-800 p-4">
            <p className="mb-3 text-xs text-gray-500">Quick questions</p>

            <div className="flex flex-wrap gap-2">
              {questions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question)}
                  className="rounded-full border border-zinc-700 px-3 py-2 text-xs text-gray-300 transition hover:border-yellow-400 hover:text-yellow-400 cursor-pointer"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-zinc-800 p-4"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question..."
              className="flex-1 rounded-lg border border-zinc-700 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-yellow-400"
            />

            <button
              type="submit"
              className="rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-500 cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
