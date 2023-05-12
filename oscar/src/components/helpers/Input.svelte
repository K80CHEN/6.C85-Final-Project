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
  <input id="inputNumber" type="number" on:input={handleChange} />
  <button class="barcode-btn" type="submit" on:click={handleSubmit}>
    Submit
  </button>
</form>

<style>
  #inputNumber {
    display: block;
    width: 400px;
    height: 40px;
    text-align: left;
    padding: 10px 20px;
    margin: 0 auto;
    border: 2px solid gray;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    font-family: "Domine";
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  /* Hide the spin buttons for number inputs in most browsers */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hide the spin buttons for number inputs in Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  .barcode-btn {
    display: inline-block;
    width: 100px;
    padding: 10px 15px;
    background-color: #fff;
    padding: 10px 15px;
    border: 1px solid #053e69;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.35s ease-out;
    transition-property: background-color;
    font-family: "libre franklin";
    font-size: 0.8rem;
    transition: background-color 0.3s ease;
  }
  .barcode-btn:hover {
    background-color: #707070;
  }
  form {
    margin-bottom: 1rem;
  }
</style>
