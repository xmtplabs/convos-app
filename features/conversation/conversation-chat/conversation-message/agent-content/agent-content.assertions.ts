import {
  IAgentActionContent,
  IAgentContent,
  IAgentMemoryContent,
  IAgentSourcesContent,
  IAgentSuggestionsContent,
  IAgentThinkingContent,
} from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content.types"

export function isAgentThinkingContent(
  agentContent: IAgentContent,
): agentContent is { type: "agentThinking"; content: IAgentThinkingContent } {
  return agentContent.type === "agentThinking"
}

export function isAgentSourcesContent(
  agentContent: IAgentContent,
): agentContent is { type: "agentSources"; content: IAgentSourcesContent } {
  return agentContent.type === "agentSources"
}

export function isAgentActionContent(
  agentContent: IAgentContent,
): agentContent is { type: "agentAction"; content: IAgentActionContent } {
  return agentContent.type === "agentAction"
}

export function isAgentMemoryContent(
  agentContent: IAgentContent,
): agentContent is { type: "agentMemory"; content: IAgentMemoryContent } {
  return agentContent.type === "agentMemory"
}

export function isAgentSuggestionsContent(
  agentContent: IAgentContent,
): agentContent is { type: "agentSuggestions"; content: IAgentSuggestionsContent } {
  return agentContent.type === "agentSuggestions"
}
