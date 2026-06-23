import { memo, ReactNode, useState } from "react"
import { ViewStyle } from "react-native"
import { Center } from "@/design-system/Center"
import { HStack } from "@/design-system/HStack"
import { Icon } from "@/design-system/Icon/Icon"
import { IIconName } from "@/design-system/Icon/Icon.types"
import { Pressable } from "@/design-system/Pressable"
import { Text } from "@/design-system/Text"
import { VStack } from "@/design-system/VStack"
import { ThemedStyle, useAppTheme } from "@/theme/use-app-theme"

export type IAgentCardAccent = "neutral" | "accent" | "green" | "caution"

type IAgentCardProps = {
  icon: IIconName
  title: string
  subtitle?: string
  accent?: IAgentCardAccent
  /** Optional content rendered on the right side of the header (e.g. a status chip). */
  trailing?: ReactNode
  /** When set, the card header becomes pressable and toggles the body. */
  collapsible?: boolean
  defaultExpanded?: boolean
  children?: ReactNode
}

/**
 * Shared container for all agent "superpower" content cards.
 *
 * Renders a full-width, lightly-bordered card with a colored icon badge, a
 * title/subtitle header and an optional collapsible body. Kept local to the
 * agent-content module so the visual language of these cards can evolve
 * independently from chat bubbles.
 */
export const AgentCard = memo(function AgentCard(props: IAgentCardProps) {
  const {
    icon,
    title,
    subtitle,
    accent = "neutral",
    trailing,
    collapsible = false,
    defaultExpanded = true,
    children,
  } = props

  const { theme, themed } = useAppTheme()
  const [expanded, setExpanded] = useState(defaultExpanded)

  const accentColor = getAccentColor({ accent, theme })

  const Header = (
    <HStack style={themed($header)}>
      <Center style={[themed($iconBadge), { backgroundColor: withAlpha(accentColor) }]}>
        <Icon icon={icon} size={theme.iconSize.sm} color={accentColor} />
      </Center>

      <VStack style={themed($headerText)}>
        <Text preset="smallerBold">{title}</Text>
        {!!subtitle && (
          <Text preset="smaller" color="secondary">
            {subtitle}
          </Text>
        )}
      </VStack>

      {trailing}

      {collapsible && (
        <Icon
          icon={expanded ? "chevron.up" : "chevron.down"}
          size={theme.iconSize.sm}
          color={theme.colors.text.tertiary}
        />
      )}
    </HStack>
  )

  return (
    <VStack style={themed($card)}>
      {collapsible ? (
        <Pressable withHaptics onPress={() => setExpanded((prev) => !prev)}>
          {Header}
        </Pressable>
      ) : (
        Header
      )}

      {(!collapsible || expanded) && !!children && (
        <VStack style={themed($body)}>{children}</VStack>
      )}
    </VStack>
  )
})

function getAccentColor(args: {
  accent: IAgentCardAccent
  theme: ReturnType<typeof useAppTheme>["theme"]
}) {
  const { accent, theme } = args
  switch (accent) {
    case "accent":
      return theme.colors.fill.accent
    case "green":
      return theme.colors.global.green
    case "caution":
      return theme.colors.global.caution
    case "neutral":
    default:
      return theme.colors.text.secondary
  }
}

// Lightweight translucent background for the icon badge. Colors in the palette
// are hex strings, so append an alpha channel.
function withAlpha(color: string) {
  if (color.startsWith("#") && color.length === 7) {
    return `${color}1A` // ~10% opacity
  }
  return color
}

const $card: ThemedStyle<ViewStyle> = ({ colors, spacing, borderRadius, borderWidth }) => ({
  width: "100%",
  borderRadius: borderRadius.sm,
  borderWidth: borderWidth.sm,
  borderColor: colors.border.subtle,
  backgroundColor: colors.background.surface,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.sm,
  rowGap: spacing.xs,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  columnGap: spacing.xs,
})

const $iconBadge: ThemedStyle<ViewStyle> = ({ spacing, borderRadius }) => ({
  width: spacing.lg,
  height: spacing.lg,
  borderRadius: borderRadius.xs,
})

const $headerText: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  rowGap: spacing["6xs"],
})

const $body: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  rowGap: spacing.xs,
})
