import { memo, useCallback, useMemo } from "react"
import { Screen } from "@/components/screen/screen"
import { IExtendedEdge } from "@/components/screen/screen.helpers"
import { IHeaderProps } from "@/design-system/Header/Header"
import { IIconName } from "@/design-system/Icon/Icon.types"
import { Text } from "@/design-system/Text"
import { VStack } from "@/design-system/VStack"
import { AgentContent } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content"
import { allAgentContentFixtures } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content.fixtures"
import { useHeader } from "@/navigation/use-header"
import { useRouter } from "@/navigation/use-navigation"
import { useAppTheme } from "@/theme/use-app-theme"

/**
 * Dev/demo screen that renders every agent content card with mock data so the
 * five "superpower" buckets can be reviewed without protocol plumbing.
 */
export const AgentContentExamplesScreen = memo(function AgentContentExamplesScreen() {
  const { theme } = useAppTheme()
  const router = useRouter()

  const handleBackPress = useCallback(() => {
    router.goBack()
  }, [router])

  const headerOptions = useMemo(() => {
    return {
      safeAreaEdges: ["top"] as IExtendedEdge[],
      title: "Agent content",
      leftIcon: "chevron.left" as IIconName,
      onLeftPress: handleBackPress,
    } satisfies IHeaderProps
  }, [handleBackPress])

  useHeader(headerOptions, [headerOptions])

  return (
    <Screen preset="scroll" contentContainerStyle={{ padding: theme.spacing.md }}>
      <VStack style={{ rowGap: theme.spacing.md }}>
        <Text preset="formLabel" color="secondary">
          The five agent "superpower" content types, rendered with mock data.
        </Text>

        {allAgentContentFixtures.map((agentContent, index) => (
          <AgentContent key={index} agentContent={agentContent} />
        ))}
      </VStack>
    </Screen>
  )
})
