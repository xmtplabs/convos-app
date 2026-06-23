import { memo, useCallback } from "react"
import { ImageStyle, ViewStyle } from "react-native"
import { Image } from "@/design-system/image"
import { Center } from "@/design-system/Center"
import { HStack } from "@/design-system/HStack"
import { Icon } from "@/design-system/Icon/Icon"
import { Pressable } from "@/design-system/Pressable"
import { Text } from "@/design-system/Text"
import { VStack } from "@/design-system/VStack"
import { AgentCard } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-card"
import {
  IAgentSource,
  IAgentSourcesContent,
} from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content.types"
import { navigate } from "@/navigation/navigation.utils"
import { ThemedStyle, useAppTheme } from "@/theme/use-app-theme"

type IAgentContentSourcesProps = {
  content: IAgentSourcesContent
}

/**
 * Bucket 2 — Sources / Citations.
 *
 * The references backing an answer. Trust lives with the user, so we always
 * show our work and let them open any source.
 */
export const AgentContentSources = memo(function AgentContentSources(
  props: IAgentContentSourcesProps,
) {
  const { content } = props
  const { theme } = useAppTheme()

  const count = content.sources.length

  return (
    <AgentCard
      icon="magnifyingglass"
      accent="accent"
      title={content.title ?? "Sources"}
      subtitle={`${count} ${count === 1 ? "reference" : "references"}`}
      collapsible
      defaultExpanded
    >
      <VStack style={{ rowGap: theme.spacing.xs }}>
        {content.sources.map((source) => (
          <SourceRow key={source.id} source={source} />
        ))}
      </VStack>
    </AgentCard>
  )
})

const SourceRow = memo(function SourceRow(props: { source: IAgentSource }) {
  const { source } = props
  const { theme, themed } = useAppTheme()

  // Only open http(s) links in the WebView so unexpected URI schemes can't be
  // handed to an external scheme handler.
  const isSafeHttpUrl = !!source.url && /^https?:\/\//i.test(source.url)

  const handlePress = useCallback(() => {
    if (isSafeHttpUrl && source.url) {
      navigate("WebviewPreview", { uri: source.url })
    }
  }, [isSafeHttpUrl, source.url])

  return (
    <Pressable withHaptics onPress={handlePress} disabled={!isSafeHttpUrl}>
      <HStack style={themed($sourceRow)}>
        <Center style={themed($favicon)}>
          {source.faviconUrl ? (
            <Image source={{ uri: source.faviconUrl }} style={themed($faviconImage)} />
          ) : (
            <Icon icon="link" size={theme.iconSize.xs} color={theme.colors.text.secondary} />
          )}
        </Center>

        <VStack style={{ flex: 1, rowGap: theme.spacing["6xs"] }}>
          <Text preset="small" weight="medium" numberOfLines={1}>
            {source.title}
          </Text>
          {!!source.snippet && (
            <Text preset="smaller" color="secondary" numberOfLines={2}>
              {source.snippet}
            </Text>
          )}
          {!!source.publisher && (
            <Text preset="smaller" color="tertiary" numberOfLines={1}>
              {source.publisher}
            </Text>
          )}
        </VStack>

        {isSafeHttpUrl && (
          <Icon
            icon="arrow.up.right"
            size={theme.iconSize.xs}
            color={theme.colors.text.tertiary}
          />
        )}
      </HStack>
    </Pressable>
  )
})

const $sourceRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  columnGap: spacing.xs,
  alignItems: "center",
})

const $favicon: ThemedStyle<ViewStyle> = ({ spacing, colors, borderRadius }) => ({
  width: spacing.lg,
  height: spacing.lg,
  borderRadius: borderRadius.xs,
  backgroundColor: colors.fill.minimal,
  overflow: "hidden",
})

const $faviconImage: ThemedStyle<ImageStyle> = ({ spacing, borderRadius }) => ({
  width: spacing.lg,
  height: spacing.lg,
  borderRadius: borderRadius.xs,
})
