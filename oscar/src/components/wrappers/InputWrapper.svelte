<script>
  import Input from "../helpers/Input.svelte";
  import Hist from "../graphs/Hist.svelte";
  import { writable } from "svelte/store";

  const inputValue = writable(null);
  let data;

  function handleInputSubmit(value) {
    console.log("inputwrapper, ", value);
    inputValue.set(value);
    console.log("inputvalue, ", $inputValue);
  }
</script>

<div>
  <Input onSubmit={handleInputSubmit} />
  <Hist {data} highlightedValue={$inputValue} />
</div>
