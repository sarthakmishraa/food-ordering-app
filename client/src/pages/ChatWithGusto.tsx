import { PromptInput } from "../components/PromptInput";
import { Message } from "../utils/types";
import { MessageRole } from "../utils/constants";
import {
  addMessages,
  generateResponse,
  useMessages,
  useStreamMessage,
} from "../slices/chatWithGustoSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";
import { MessageBubble } from "../components/MessageBubble";
import { ThinkingIndicator } from "../components/ThinkingIndicator";

export const ChatWithGusto = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(useMessages);
  const streamingMessage = useAppSelector(useStreamMessage);

  const sendMessage = async (prompt: string) => {
    if (
      prompt &&
      typeof prompt === "string" &&
      prompt === ""
    ) {
      return;
    } else {
      const newMessage: Message = {
        id: "1",
        role: MessageRole.USER,
        data: {
          content: prompt || "",
        },
        createdAt: Date.now(),
      };

      dispatch(addMessages([newMessage]));

      await dispatch(generateResponse(prompt)).unwrap();
    }
  };

  return (
    <div className="relative w-full flex-1 flex flex-col justify-between items-center space-y-1">
      <div className="flex-1 p-4 w-full max-h-[calc(100vh-64px)] space-y-4 border border-solid border-[color:var(--color-border)] rounded-md overflow-y-auto">
        {messages?.map((message, index: number) => {
          return (
            <MessageBubble
              key={`${index}-${Date.now()}`}
              message={message}
            />
          );
        })}
        {streamingMessage?.isStreaming && (
          <MessageBubble
            key={`streamingMessage-${Date.now()}`}
            message={{
              id: "111111",
              role: MessageRole.BOT,
              data: {
                content: streamingMessage?.text || "",
              },
              createdAt: Date.now(),
            }}
          />
        )}
        {streamingMessage?.isStreaming &&
          streamingMessage?.isThinking && (
            <ThinkingIndicator />
          )}
      </div>
      <div className="">
        <PromptInput
          containerClassName={
            "absolute bottom-2 left-1/2 -translate-x-1/2"
          }
          onSubmit={(prompt) => sendMessage(prompt)}
        />
      </div>
    </div>
  );
};
