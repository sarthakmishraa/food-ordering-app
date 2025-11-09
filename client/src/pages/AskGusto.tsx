import { PromptInput } from "../components/PromptInput";
import { Message } from "../utils/types";
import { MessageRole } from "../utils/constants";
import {
  addMessages,
  generateResponse,
  useMessages,
  useStreamMessage,
} from "../slices/askGustoSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";
import { MessageBubble } from "../components/MessageBubble";
import { ThinkingIndicator } from "../components/ThinkingIndicator";

export const AskGusto = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(useMessages);
  const streamingMessage = useAppSelector(useStreamMessage);

  const showPromptInputAtCenter = messages?.length === 0;
  const welcomeText = "What’s on your mind today?";

  const sendMessage = async (prompt: string) => {
    if (
      !prompt ||
      (typeof prompt === "string" && prompt === "")
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
      <div className="p-4 w-full max-h-[calc(100vh-64px)] space-y-4 overflow-y-auto">
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
        <div className="mb-[108px]"></div>
      </div>
      <div className="">
        {showPromptInputAtCenter && (
          <div className="absolute bottom-[65%] left-1/2 -translate-x-1/2 text-3xl font-medium">
            {welcomeText}
          </div>
        )}
        <div>
          <PromptInput
            containerClassName={`absolute ${
              showPromptInputAtCenter
                ? "bottom-[45%]"
                : "bottom-2"
            }  left-1/2 -translate-x-1/2 duration-800`}
            onSubmit={(prompt) => sendMessage(prompt)}
          />
        </div>
      </div>
    </div>
  );
};
