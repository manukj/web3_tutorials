<script lang="ts">
  import { type BlockWithTransactions } from "alchemy-sdk";

  // expect a prop called blockDetails
  export let blockDetails: BlockWithTransactions;

  var gasUsedPercentage: number =
    (blockDetails.gasUsed.toNumber() / blockDetails.gasLimit.toNumber()) * 100;
</script>

<div class="card p-5 w-96 bg-base-100 shadow-xl">
  <figure>
    <div class="pr-2">GAS USED</div>
    <div
      class="radial-progress"
      style="--value:{gasUsedPercentage};"
      role="progressbar"
    >
      {gasUsedPercentage.toFixed(2)}%
    </div>
  </figure>
  <div class="card-body">
    <h2 class="card-title">Block : {blockDetails.number}</h2>

    <div class="flex flex-row">
      Total Transactions in this block
      <div class=" font-bold pl-3">{blockDetails.transactions.length}</div>
    </div>
    <div class="font-bold">
      TimeStamp : {new Date(blockDetails.timestamp * 1000).toLocaleString()}
    </div>
  </div>

  <div class="card-actions justify-center">
    <a href="https://etherscan.io/tx/{blockDetails.hash}" class="btn btn-link"
      >View More Details</a
    >
  </div>
</div>
