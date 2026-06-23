import { IAgentContent } from "@/features/conversation/conversation-chat/conversation-message/agent-content/agent-content.types"

/**
 * Mock agent content used by the demo screen and as a reference for the shape
 * of each content type. Once a wire-format codec exists these will be replaced
 * by real data coming over XMTP.
 */

export const agentThinkingFixture: IAgentContent = {
  type: "agentThinking",
  content: {
    title: "Finding the best swap route",
    status: "thinking",
    steps: [
      {
        id: "1",
        label: "Reading your request",
        status: "done",
        detail: "Swap 0.5 ETH → USDC",
      },
      {
        id: "2",
        label: "Checking liquidity across DEXs",
        status: "active",
        detail: "Comparing Uniswap, 1inch, CoW",
      },
      { id: "3", label: "Estimating gas + slippage", status: "pending" },
      { id: "4", label: "Preparing the transaction", status: "pending" },
    ],
  },
}

export const agentThinkingDoneFixture: IAgentContent = {
  type: "agentThinking",
  content: {
    title: "How I got here",
    status: "done",
    summary: "Compared 3 routes, picked the cheapest with lowest slippage",
    steps: [
      { id: "1", label: "Read your request", status: "done" },
      { id: "2", label: "Checked liquidity across DEXs", status: "done" },
      { id: "3", label: "Estimated gas + slippage", status: "done" },
      { id: "4", label: "Prepared the transaction", status: "done" },
    ],
  },
}

export const agentSourcesFixture: IAgentContent = {
  type: "agentSources",
  content: {
    title: "Sources",
    sources: [
      {
        id: "1",
        title: "Uniswap v3 docs — Swaps",
        publisher: "docs.uniswap.org",
        snippet: "A swap is the simplest interaction with a liquidity pool…",
        url: "https://docs.uniswap.org/concepts/protocol/swaps",
      },
      {
        id: "2",
        title: "Ethereum gas and fees",
        publisher: "ethereum.org",
        snippet: "Gas refers to the unit that measures the amount of computational effort…",
        url: "https://ethereum.org/en/developers/docs/gas/",
      },
      {
        id: "3",
        title: "What is slippage in DeFi?",
        publisher: "coinbase.com",
        url: "https://www.coinbase.com/learn",
      },
    ],
  },
}

export const agentActionProposedFixture: IAgentContent = {
  type: "agentAction",
  content: {
    title: "Swap 0.5 ETH for USDC",
    toolName: "wallet.swap",
    status: "proposed",
    description: "Best route found on Uniswap v3 with 0.1% slippage.",
    requiresApproval: true,
    params: [
      { label: "You pay", value: "0.5 ETH" },
      { label: "You receive", value: "≈ 1,642 USDC" },
      { label: "Network fee", value: "≈ $2.14" },
      { label: "Route", value: "Uniswap v3" },
    ],
  },
}

export const agentActionSuccessFixture: IAgentContent = {
  type: "agentAction",
  content: {
    title: "Swap 0.5 ETH for USDC",
    toolName: "wallet.swap",
    status: "success",
    params: [
      { label: "Received", value: "1,642.08 USDC" },
      { label: "Tx", value: "0x8f2c…a91b" },
    ],
    resultSummary: "Swap confirmed in 12s",
  },
}

export const agentMemoryFixture: IAgentContent = {
  type: "agentMemory",
  content: {
    title: "What I remember",
    items: [
      {
        id: "1",
        label: "Preferred network",
        value: "Base",
        source: "from a previous swap",
      },
      {
        id: "2",
        label: "Risk tolerance",
        value: "Low — always confirm before sending",
        source: "you told me",
      },
      {
        id: "3",
        label: "Default currency",
        value: "USD",
      },
    ],
  },
}

export const agentSuggestionsFixture: IAgentContent = {
  type: "agentSuggestions",
  content: {
    title: "Suggested next steps",
    suggestions: [
      { id: "1", label: "Set a price alert", icon: "bell-slash" },
      { id: "2", label: "Swap more", icon: "arrow.up.right" },
      { id: "3", label: "Send to a friend", icon: "paperplane" },
      { id: "4", label: "See my portfolio", icon: "search" },
    ],
  },
}

export const allAgentContentFixtures: IAgentContent[] = [
  agentThinkingFixture,
  agentThinkingDoneFixture,
  agentSourcesFixture,
  agentActionProposedFixture,
  agentActionSuccessFixture,
  agentMemoryFixture,
  agentSuggestionsFixture,
]
