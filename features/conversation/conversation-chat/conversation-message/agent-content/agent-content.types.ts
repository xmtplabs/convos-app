import { IIconName } from "@/design-system/Icon/Icon.types"

/**
 * Agent "superpower" content types.
 *
 * These are rich, dynamic cards that an agent (or Convos itself) can surface in
 * a conversation to show *how* it is working for the user. They map to the five
 * buckets every great agent needs:
 *
 *   1. Thinking     → reasoning steps shown live while the agent works
 *   2. Sources      → the citations / references backing an answer
 *   3. Action       → a tool call / action the agent took or wants to take
 *   4. Memory       → what the agent remembers about the user / context
 *   5. Suggestions  → follow-up prompts the user can tap to keep going
 *
 * NOTE: These are intentionally decoupled from the XMTP-bound
 * `IConversationMessage` union. They describe UI content only and do not (yet)
 * have a wire-format codec, so they can evolve without touching the protocol
 * conversion layer.
 */
export type IAgentContentType =
  | "agentThinking"
  | "agentSources"
  | "agentAction"
  | "agentMemory"
  | "agentSuggestions"

/**
 * 1. Thinking / Reasoning
 */
export type IAgentThinkingStepStatus = "pending" | "active" | "done"

export type IAgentThinkingStep = {
  id: string
  label: string
  status: IAgentThinkingStepStatus
  detail?: string
}

export type IAgentThinkingContent = {
  title?: string
  // "thinking" drives the live, animated state; "done" collapses to a summary
  status: "thinking" | "done"
  steps: IAgentThinkingStep[]
  summary?: string
}

/**
 * 2. Sources / Citations
 */
export type IAgentSource = {
  id: string
  title: string
  url?: string
  publisher?: string
  snippet?: string
  faviconUrl?: string
}

export type IAgentSourcesContent = {
  title?: string
  sources: IAgentSource[]
}

/**
 * 3. Action / Tool call
 */
export type IAgentActionStatus = "proposed" | "running" | "success" | "error"

export type IAgentActionParam = {
  label: string
  value: string
}

export type IAgentActionContent = {
  title: string
  toolName: string
  status: IAgentActionStatus
  description?: string
  params?: IAgentActionParam[]
  // When true and status is "proposed", the card shows Approve / Decline
  requiresApproval?: boolean
  resultSummary?: string
}

/**
 * 4. Memory / Context
 */
export type IAgentMemoryItem = {
  id: string
  label: string
  value: string
  source?: string
}

export type IAgentMemoryContent = {
  title?: string
  items: IAgentMemoryItem[]
}

/**
 * 5. Suggestions / Follow-ups
 */
export type IAgentSuggestion = {
  id: string
  label: string
  icon?: IIconName
}

export type IAgentSuggestionsContent = {
  title?: string
  suggestions: IAgentSuggestion[]
}

/**
 * Discriminated union of all agent content.
 */
export type IAgentContent =
  | { type: "agentThinking"; content: IAgentThinkingContent }
  | { type: "agentSources"; content: IAgentSourcesContent }
  | { type: "agentAction"; content: IAgentActionContent }
  | { type: "agentMemory"; content: IAgentMemoryContent }
  | { type: "agentSuggestions"; content: IAgentSuggestionsContent }
