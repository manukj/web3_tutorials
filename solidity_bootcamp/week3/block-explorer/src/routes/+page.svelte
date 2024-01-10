<script lang="ts">
  import { env } from "$lib/env";
  import { Alchemy, Network } from "alchemy-sdk";
  import { onMount } from "svelte";

  let blockNumber = 0;
  let transcationHash = "";
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

  function getBlockDetails() {
    const alchemy = new Alchemy(settings);
    alchemy.core.getBlockWithTransactions(transcationHash).then((tx) => {
      console.log(tx);
      blockNumber = tx.number;
    });
  }
</script>

<h1 class="">
  <div class="flex flex-row">
    <input
      type="text"
      placeholder="Enter Transaction Hash"
      bind:value={transcationHash}
    />
    <button class=" butt" on:click={getBlockDetails}>
      Get Block Details
    </button>
  </div>

  Current Block Number: {blockNumber}
</h1>
