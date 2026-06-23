import { memo } from "react"
import { AgentContentAction } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content-action"
import { AgentContentMemory } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content-memory"
import { AgentContentSources } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content-sources"
import { AgentContentSuggestions } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content-suggestions"
import { AgentContentThinking } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content-thinking"
import {
  isAgentActionContent,
  isAgentMemoryContent,
  isAgentSourcesContent,
  isAgentSuggestionsContent,
  isAgentThinkingContent,
} from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content.assertions"
import { IAgentContent } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content.types"

type IAgentContentProps = {
  agentContent: IAgentContent
}

/**
 * Dispatcher for agent content cards. Mirrors the pattern in
 * `conversation-message.tsx`: switch on the content type and render the right
 * card. Kept separate from the XMTP message union so it can be used anywhere
 * (chat, build screen, demos) without protocol plumbing.
 */
export const AgentContent = memo(function AgentContent(props: IAgentContentProps) {
  const { agentContent } = props

  if (isAgentThinkingContent(agentContent)) {
    return <AgentContentThinking content={agentContent.content} />
  }

  if (isAgentSourcesContent(agentContent)) {
    return <AgentContentSources content={agentContent.content} />
  }

  if (isAgentActionContent(agentContent)) {
    return <AgentContentAction content={agentContent.content} />
  }

  if (isAgentMemoryContent(agentContent)) {
    return <AgentContentMemory content={agentContent.content} />
  }

  if (isAgentSuggestionsContent(agentContent)) {
    return <AgentContentSuggestions content={agentContent.content} />
  }

  const _exhaustiveCheck: never = agentContent
  return null
})
