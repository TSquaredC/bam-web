import axios from "axios";
import { kaiChatBaseUrl } from "@/helpers/constants";

type KaiTextSelection = Record<string, unknown>;

const KAI_API_KEY = process.env.NEXT_PUBLIC_KAI_API_KEY;
const KAI_AGENT_ID = process.env.NEXT_PUBLIC_KAI_AGENT_ID;

const kaiChatInstance = axios.create({
  baseURL: kaiChatBaseUrl,
  headers: {
    "KAI-API-KEY": KAI_API_KEY ?? "",
    "AGENT-ID": KAI_AGENT_ID ?? "",
  },
});

export const createKaiChat = async (
  data: {
    query: string;
    chat_id?: string;
    text_selections?: KaiTextSelection[];
  },
  signal?: AbortSignal
) => {
  try {
    const res = await kaiChatInstance.post("/chat", data, {
      signal,
      responseType: "text",
      headers: { Accept: "text/event-stream" },
    });
    return res;
  } catch (err: any) {
    if (axios.isCancel(err)) {
      console.warn("Request canceled:", err.message);
    } else {
      console.error("Error in createKaiChat:", err);
    }
    throw err;
  }
};
