<!-- InputField.svelte -->
<script>
  let inputValue = null;
  export let onSubmit = () => {};

  function handleChange(event) {
    inputValue = parseFloat(event.target.value);
  }

  function handleSubmit() {
    event.preventDefault();
    onSubmit(inputValue);
  }
</script>

<form on:submit={handleSubmit}>
  <label for="inputNumber">Enter a number:</label>
  <input id="inputNumber" type="number" on:input={handleChange} />
  <!-- <button on:click={handleSubmit}>Submit</button> -->
  <button type="submit" on:click={handleSubmit}> Submit </button>
</form>
