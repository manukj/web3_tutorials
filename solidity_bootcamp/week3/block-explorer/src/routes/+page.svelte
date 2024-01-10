<script lang="ts">
  import { env } from "$lib/env";
  import { Alchemy, Network, type BlockWithTransactions } from "alchemy-sdk";
  import BlockContent from "./component/BlockContent.svelte";

  let isLoading = false;
  let transcationHash = "";
  let blockDetails: BlockWithTransactions | undefined;
  let error: string | undefined;
  const settings = {
    apiKey: env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  function getBlockDetails() {
    const alchemy = new Alchemy(settings);
    isLoading = !isLoading;
    alchemy.core
      .getBlockWithTransactions(transcationHash)
      .then((tx) => {
        isLoading = !isLoading;
        console.log(tx);
        blockDetails = tx;
      })
      .catch((err) => {
        isLoading = !isLoading;
        error = err.message;
      });
  }
</script>

<div class="flex flex-col px-10 place-content-center">
  <div class=" flex flex-row pt-10 justify-items-center place-content-center">
    <div class="avatar">
      <div class="w-24 rounded-full">
        <img
          alt="Ethereum Logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png"
        />
      </div>
    </div>
    <div class="flex flex-col ml-5 place-content-center">
      <div class="text-2xl font-bold">Alchemy</div>
      <div class="text-gray-500">Get Block Details</div>
    </div>
  </div>
  <div class="flex flex-row w-full pt-20 pb-10">
    <input
      type="text flex-1"
      class="input input-bordered w-full mr-3"
      placeholder="Enter Transaction Hash"
      bind:value={transcationHash}
    />
    <button class=" btn" on:click={getBlockDetails}> Get Block Details </button>
  </div>

  <div class="w-full place-content-center flex">
    {#if isLoading}
      <span class="loading loading-dots loading-lg"></span>
    {:else if blockDetails}
      <BlockContent {blockDetails} />
    {:else if error}
      <div role="alert" class="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-current shrink-0 w-6 h-6"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path></svg
        >
        <span>{error}</span>
      </div>
    {:else}
      <div role="alert" class="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-current shrink-0 w-6 h-6"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path></svg
        >
        <span>Enter Transcation Hash to get the block details.</span>
      </div>
    {/if}
  </div>
</div>
