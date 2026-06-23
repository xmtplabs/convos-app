import { memo } from "react"
import { ViewStyle } from "react-native"
import { ActivityIndicator } from "@/design-system/activity-indicator"
import { Button } from "@/design-system/Button/Button"
import { HStack } from "@/design-system/HStack"
import { Icon } from "@/design-system/Icon/Icon"
import { Text } from "@/design-system/Text"
import { VStack } from "@/design-system/VStack"
import {
  AgentCard,
  IAgentCardAccent,
} from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-card"
import {
  IAgentActionContent,
  IAgentActionStatus,
} from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content.types"
import { ThemedStyle, useAppTheme } from "@/theme/use-app-theme"

type IAgentContentActionProps = {
  content: IAgentActionContent
  onApprove?: () => void
  onDecline?: () => void
}

/**
 * Bucket 3 — Action / Tool call.
 *
 * Surfaces an action the agent took or wants to take. When the action requires
 * approval we show Approve / Decline so the user stays in control.
 */
export const AgentContentAction = memo(function AgentContentAction(
  props: IAgentContentActionProps,
) {
  const { content, onApprove, onDecline } = props
  const { theme, themed } = useAppTheme()

  const accent = getAccentForStatus(content.status)
  const needsApproval = content.requiresApproval && content.status === "proposed"

  return (
    <AgentCard
      icon="arrow.up.right"
      accent={accent}
      title={content.title}
      subtitle={content.toolName}
      trailing={<ActionStatusBadge status={content.status} />}
    >
      {!!content.description && (
        <Text preset="small" color="secondary">
          {content.description}
        </Text>
      )}

      {!!content.params?.length && (
        <VStack style={themed($params)}>
          {content.params.map((param) => (
            <HStack key={param.label} style={themed($paramRow)}>
              <Text preset="smaller" color="secondary">
                {param.label}
              </Text>
              <Text preset="smaller" weight="medium" numberOfLines={1} style={themed($paramValue)}>
                {param.value}
              </Text>
            </HStack>
          ))}
        </VStack>
      )}

      {!!content.resultSummary && (
        <HStack style={themed($result)}>
          <Icon
            icon={content.status === "error" ? "exclamationmark.triangle" : "checkmark"}
            size={theme.iconSize.xs}
            color={
              content.status === "error" ? theme.colors.global.caution : theme.colors.global.green
            }
          />
          <Text preset="smaller" color="secondary" style={{ flex: 1 }}>
            {content.resultSummary}
          </Text>
        </HStack>
      )}

      {needsApproval && (
        <HStack style={themed($actions)}>
          <Button variant="fill" size="sm" text="Approve" onPress={onApprove} style={{ flex: 1 }} />
          <Button
            variant="outline"
            size="sm"
            text="Decline"
            onPress={onDecline}
            style={{ flex: 1 }}
          />
        </HStack>
      )}
    </AgentCard>
  )
})

const ActionStatusBadge = memo(function ActionStatusBadge(props: { status: IAgentActionStatus }) {
  const { status } = props
  const { theme } = useAppTheme()

  if (status === "running") {
    return <ActivityIndicator size="small" color={theme.colors.fill.accent} />
  }

  const { label, color } = getStatusLabel({ status, theme })

  return (
    <Text preset="smaller" weight="medium" style={{ color }}>
      {label}
    </Text>
  )
})

function getAccentForStatus(status: IAgentActionStatus): IAgentCardAccent {
  switch (status) {
    case "success":
      return "green"
    case "error":
      return "caution"
    case "running":
    case "proposed":
    default:
      return "accent"
  }
}

function getStatusLabel(args: {
  status: IAgentActionStatus
  theme: ReturnType<typeof useAppTheme>["theme"]
}) {
  const { status, theme } = args
  switch (status) {
    case "success":
      return { label: "Done", color: theme.colors.global.green }
    case "error":
      return { label: "Failed", color: theme.colors.global.caution }
    case "proposed":
      return { label: "Proposed", color: theme.colors.text.secondary }
    case "running":
    default:
      return { label: "Running", color: theme.colors.text.secondary }
  }
}

const $params: ThemedStyle<ViewStyle> = ({ spacing, colors, borderRadius }) => ({
  rowGap: spacing.xxs,
  padding: spacing.xs,
  borderRadius: borderRadius.xs,
  backgroundColor: colors.fill.minimal,
})

const $paramRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "space-between",
  columnGap: spacing.sm,
})

const $paramValue: ThemedStyle<ViewStyle> = () => ({
  flexShrink: 1,
  textAlign: "right",
})

const $result: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  columnGap: spacing.xxs,
  alignItems: "center",
})

const $actions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  columnGap: spacing.xs,
})
