import { memo, useCallback } from "react"
import { ViewStyle } from "react-native"
import { HStack } from "@/design-system/HStack"
import { Icon } from "@/design-system/Icon/Icon"
import { Pressable } from "@/design-system/Pressable"
import { Text } from "@/design-system/Text"
import { AgentCard } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-card"
import {
  IAgentSuggestion,
  IAgentSuggestionsContent,
} from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content.types"
import { ThemedStyle, useAppTheme } from "@/theme/use-app-theme"

type IAgentContentSuggestionsProps = {
  content: IAgentSuggestionsContent
  onSelectSuggestion?: (suggestion: IAgentSuggestion) => void
}

/**
 * Bucket 5 — Suggestions / Follow-ups.
 *
 * Tappable prompts that keep the conversation moving. The agent surfaces the
 * right next step at the right time.
 */
export const AgentContentSuggestions = memo(function AgentContentSuggestions(
  props: IAgentContentSuggestionsProps,
) {
  const { content, onSelectSuggestion } = props
  const { themed } = useAppTheme()

  return (
    <AgentCard icon="message.badge" accent="accent" title={content.title ?? "Suggested next steps"}>
      <HStack style={themed($chips)}>
        {content.suggestions.map((suggestion) => (
          <SuggestionChip
            key={suggestion.id}
            suggestion={suggestion}
            onPress={() => onSelectSuggestion?.(suggestion)}
          />
        ))}
      </HStack>
    </AgentCard>
  )
})

const SuggestionChip = memo(function SuggestionChip(props: {
  suggestion: IAgentSuggestion
  onPress: () => void
}) {
  const { suggestion, onPress } = props
  const { theme, themed } = useAppTheme()

  const handlePress = useCallback(() => onPress(), [onPress])

  return (
    <Pressable withHaptics onPress={handlePress} style={themed($chip)}>
      {!!suggestion.icon && (
        <Icon icon={suggestion.icon} size={theme.iconSize.xs} color={theme.colors.text.action} />
      )}
      <Text preset="smaller" weight="medium" color="action">
        {suggestion.label}
      </Text>
    </Pressable>
  )
})

const $chips: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexWrap: "wrap",
  columnGap: spacing.xxs,
  rowGap: spacing.xxs,
})

const $chip: ThemedStyle<ViewStyle> = ({ spacing, colors, borderRadius, borderWidth }) => ({
  flexDirection: "row",
  alignItems: "center",
  columnGap: spacing["4xs"],
  paddingVertical: spacing.xxs,
  paddingHorizontal: spacing.xs,
  borderRadius: borderRadius.full,
  borderWidth: borderWidth.sm,
  borderColor: colors.border.subtle,
  backgroundColor: colors.background.surface,
})
