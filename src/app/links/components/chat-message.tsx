"use client";

import { useSessionStorage } from "usehooks-ts";

import TypingAnimation from "@/components/text-animations/typing-text";

interface ChatMessageProps {
  text: string;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, className }) => {
  const [shouldAnimate, setShouldAnimate] = useSessionStorage(
    "shouldAnimate",
    true,
  );

  const onAnimationFinish = () => {
    setShouldAnimate(false);
  };

  if (shouldAnimate) {
    return (
      <TypingAnimation
        as="span"
        text={text}
        duration={20}
        className={className}
        onAnimationFinish={onAnimationFinish}
      />
    );
  }

  return <span className={className}>{text}</span>;
};

export default ChatMessage;
