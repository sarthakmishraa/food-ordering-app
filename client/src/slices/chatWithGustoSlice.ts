import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Message, StreamMessage } from "../utils/types";
import { type RootState } from "../store/store";
import toast from "react-hot-toast";
import {
  MessageRole,
  toastStyles,
} from "../utils/constants";

const BE_API_URL = import.meta.env.VITE_BE_URL;

export type ChatWithGustoState = {
  messages?: Message[];
  streamingMessage?: StreamMessage | null;
};

const initialState: ChatWithGustoState = {
  messages: [],
  streamingMessage: {
    isThinking: false,
    isStreaming: false,
    text: "",
  },
};

export const generateResponse = createAsyncThunk(
  "chatWithGusto/generateResponse",
  async (prompt: string, { dispatch, getState }) => {
    return new Promise<void>((resolve, reject) => {
      const eventSource = new EventSource(
        `${BE_API_URL}/generate?prompt=${encodeURIComponent(
          prompt
        )}`
      );

      const newEvent: StreamMessage = {
        isThinking: true,
        isStreaming: true,
        text: undefined,
      };
      dispatch(setStreamingMessage(newEvent));

      debugger;

      eventSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
          const state = getState() as RootState;
          const newMessage: Message = {
            id: Date.now().toString(),
            role: MessageRole.BOT,
            data: {
              content:
                state?.chatWithGusto?.streamingMessage
                  ?.text || "",
            },
            createdAt: Date.now(),
          };
          const newEvent: StreamMessage = {
            isThinking: false,
            isStreaming: false,
            text: undefined,
          };
          dispatch(setStreamingMessage(newEvent));
          dispatch(addMessages([newMessage]));

          eventSource.close();
          resolve();
          return;
        }

        try {
          const data = JSON.parse(event.data);
          const text =
            data?.chunk?.candidates?.[0]?.content
              ?.parts?.[0]?.text;
          if (text) {
            const newEvent: StreamMessage = {
              isThinking: false,
              isStreaming: true,
              text,
            };
            dispatch(setStreamingMessage(newEvent));
          }

          if (data.error) toast.error(data.error);
        } catch {
          console.warn("Invalid SSE chunk:", event.data);
        }
      };

      eventSource.onerror = (err) => {
        eventSource.close();
        toast.error("Something went wrong", {
          style: toastStyles,
        });
        reject(err);
      };
    });
  }
);

const chatWithGusto = createSlice({
  name: "chatWithGusto",
  initialState: initialState,
  reducers: {
    addMessages(state, action: PayloadAction<Message[]>) {
      if (state.messages && state.messages?.length > 0) {
        state.messages = [
          ...state.messages,
          ...action.payload,
        ];
      } else {
        state.messages = action.payload;
      }
    },
    setStreamingMessage(
      state,
      action: PayloadAction<StreamMessage>
    ) {
      const incoming = action.payload;

      if (incoming.isStreaming) {
        state.streamingMessage = {
          isStreaming: true,
          isThinking: false,
          text:
            (state.streamingMessage?.text || "") +
            (incoming.text || ""),
        };
      } else {
        state.streamingMessage = {
          isStreaming: incoming.isStreaming,
          isThinking: incoming.isThinking,
          text: incoming.text,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateResponse.pending, (state) => {
        state.streamingMessage = {
          isThinking: true,
          isStreaming: true,
          text: undefined,
        };
        debugger;
      })
      .addCase(generateResponse.fulfilled, (state) => {
        state.streamingMessage = {
          isThinking: false,
          isStreaming: false,
          text: state?.streamingMessage?.text,
        };
      })
      .addCase(generateResponse.rejected, (state) => {
        state.streamingMessage = {
          isThinking: false,
          isStreaming: false,
          text: state?.streamingMessage?.text,
        };
      });
  },
});

export const { addMessages, setStreamingMessage } =
  chatWithGusto.actions;
export const useMessages = (state: RootState) =>
  state.chatWithGusto.messages;
export const useStreamMessage = (state: RootState) =>
  state.chatWithGusto.streamingMessage;

export default chatWithGusto.reducer;
