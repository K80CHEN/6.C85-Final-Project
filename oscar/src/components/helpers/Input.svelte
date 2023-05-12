<!-- InputField.svelte -->
<script>
  let inputValue = null;
  export let onSubmit = () => {};

  function handleChange(event) {
    inputValue = parseFloat(event.target.value);
  }

  function handleSubmit() {
    onSubmit(inputValue);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }
</script>

<div>
  <label for="inputNumber">Enter a number:</label>
  <input
    id="inputNumber"
    type="number"
    on:input={handleChange}
    on:keydown={handleKeyDown}
  />
  <button on:click={handleSubmit}>Submit</button>
</div>
