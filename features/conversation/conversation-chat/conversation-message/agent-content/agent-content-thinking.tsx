import { memo } from "react"
import { ViewStyle } from "react-native"
import { ActivityIndicator } from "@/design-system/activity-indicator"
import { Center } from "@/design-system/Center"
import { HStack } from "@/design-system/HStack"
import { Icon } from "@/design-system/Icon/Icon"
import { Text } from "@/design-system/Text"
import { VStack } from "@/design-system/VStack"
import { AgentCard } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-card"
import {
  IAgentThinkingContent,
  IAgentThinkingStep,
} from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content.types"
import { ThemedStyle, useAppTheme } from "@/theme/use-app-theme"

type IAgentContentThinkingProps = {
  content: IAgentThinkingContent
}

/**
 * Bucket 1 — Thinking / Reasoning.
 *
 * Shows the agent's reasoning steps live while it works. Collapses to a short
 * summary once done so the chat stays readable.
 */
export const AgentContentThinking = memo(function AgentContentThinking(
  props: IAgentContentThinkingProps,
) {
  const { content } = props
  const { theme } = useAppTheme()

  const isThinking = content.status === "thinking"

  return (
    <AgentCard
      icon="timer"
      accent={isThinking ? "accent" : "neutral"}
      title={content.title ?? "Thinking"}
      subtitle={isThinking ? "Working through it…" : content.summary}
      collapsible
      defaultExpanded={isThinking}
      trailing={
        isThinking ? <ActivityIndicator size="small" color={theme.colors.fill.accent} /> : undefined
      }
    >
      <VStack style={{ rowGap: theme.spacing.xs }}>
        {content.steps.map((step) => (
          <ThinkingStep key={step.id} step={step} />
        ))}
      </VStack>
    </AgentCard>
  )
})

const ThinkingStep = memo(function ThinkingStep(props: { step: IAgentThinkingStep }) {
  const { step } = props
  const { theme, themed } = useAppTheme()

  return (
    <HStack style={themed($step)}>
      <Center style={themed($stepIndicator)}>
        {step.status === "active" ? (
          <ActivityIndicator size="small" color={theme.colors.fill.accent} />
        ) : step.status === "done" ? (
          <Icon icon="checkmark" size={theme.iconSize.xs} color={theme.colors.global.green} />
        ) : (
          <Center style={themed($pendingDot)} />
        )}
      </Center>

      <VStack style={{ flex: 1, rowGap: theme.spacing["6xs"] }}>
        <Text
          preset="small"
          color={step.status === "pending" ? "secondary" : "primary"}
          weight={step.status === "active" ? "medium" : "regular"}
        >
          {step.label}
        </Text>
        {!!step.detail && (
          <Text preset="smaller" color="secondary">
            {step.detail}
          </Text>
        )}
      </VStack>
    </HStack>
  )
})

const $step: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  columnGap: spacing.xs,
  alignItems: "flex-start",
})

const $stepIndicator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: spacing.sm,
  height: spacing.sm,
  marginTop: spacing["5xs"],
})

const $pendingDot: ThemedStyle<ViewStyle> = ({ spacing, colors, borderRadius }) => ({
  width: spacing.xxs,
  height: spacing.xxs,
  borderRadius: borderRadius.full,
  backgroundColor: colors.fill.tertiary,
})
