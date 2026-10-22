import { invoke } from "@tauri-apps/api/core"

export type DeepTutorReply = {
  answer: string
  raw?: string
}

/**
 * Ask DeepTutor a question against a knowledge base. The Rust side
 * (`run_deeptutor_chat`) shells out to the `deeptutor` CLI at the configured
 * repo path (settings.deeptutorRepo).
 */
export async function runDeepTutorChat(
  repo: string,
  kb: string,
  question: string,
): Promise<DeepTutorReply> {
  return invoke<DeepTutorReply>("run_deeptutor_chat", { repo, kb, question })
}
