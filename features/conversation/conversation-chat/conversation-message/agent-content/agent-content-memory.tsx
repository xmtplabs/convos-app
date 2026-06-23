import { memo } from "react"
import { ViewStyle } from "react-native"
import { HStack } from "@/design-system/HStack"
import { Text } from "@/design-system/Text"
import { VStack } from "@/design-system/VStack"
import { AgentCard } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-card"
import {
  IAgentMemoryContent,
  IAgentMemoryItem,
} from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content.types"
import { ThemedStyle, useAppTheme } from "@/theme/use-app-theme"

type IAgentContentMemoryProps = {
  content: IAgentMemoryContent
}

/**
 * Bucket 4 — Memory / Context.
 *
 * What the agent remembers about the user. Memory lives with the user, so we
 * make it visible and inspectable rather than hidden inside a model.
 */
export const AgentContentMemory = memo(function AgentContentMemory(
  props: IAgentContentMemoryProps,
) {
  const { content } = props
  const { theme } = useAppTheme()

  return (
    <AgentCard
      icon="key"
      accent="neutral"
      title={content.title ?? "What I remember"}
      subtitle="Stored with you, not the model"
      collapsible
      defaultExpanded
    >
      <VStack style={{ rowGap: theme.spacing.xs }}>
        {content.items.map((item) => (
          <MemoryRow key={item.id} item={item} />
        ))}
      </VStack>
    </AgentCard>
  )
})

const MemoryRow = memo(function MemoryRow(props: { item: IAgentMemoryItem }) {
  const { item } = props
  const { themed } = useAppTheme()

  return (
    <VStack style={themed($row)}>
      <HStack style={themed($rowHeader)}>
        <Text preset="smaller" color="secondary">
          {item.label}
        </Text>
        {!!item.source && (
          <Text preset="smaller" color="tertiary">
            {item.source}
          </Text>
        )}
      </HStack>
      <Text preset="small" weight="medium">
        {item.value}
      </Text>
    </VStack>
  )
})

const $row: ThemedStyle<ViewStyle> = ({ spacing, colors, borderRadius }) => ({
  rowGap: spacing["6xs"],
  padding: spacing.xs,
  borderRadius: borderRadius.xs,
  backgroundColor: colors.fill.minimal,
})

const $rowHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "space-between",
  columnGap: spacing.sm,
})
