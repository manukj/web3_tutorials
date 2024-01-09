<script lang="ts">
  import { env } from "$lib/env";
  import { Alchemy, Network } from "alchemy-sdk";
  import { onMount } from "svelte";

  let blockNumber = 0;
  const settings = {
    apiKey: env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  onMount(() => {
    const alchemy = new Alchemy(settings);
    alchemy.core.getBlockNumber().then((number) => {
      blockNumber = number;
    });
  });
</script>

<h1 class="text-3xl font-bold underline">
  Current Block Number: {blockNumber}
</h1>
