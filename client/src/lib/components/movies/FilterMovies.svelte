<script lang="ts">
  export let server : string
  export let token : string

  let filterRate = 'all';
  let filterCategory = 'all';
  let categories : any;

  const getCategories = async () =>
  {
    const res = await fetch(`${server}/categories`,{
      headers : {
        "Authorizatoin" : `Bearer ${token}`
      }
    })
    categories = await res.json()
  }
  getCategories();
  console.log( categories );

  const filter = async () =>
  {
    console.log( 'filter' );
  }

</script>


<div class="filter">
  <form class="form" on:submit|preventDefault>
    <label class="form__label" for="rate">rate</label>

    <select class="form__select" bind:value={filterRate} name="rate" >
      <option class="form__option" value="all">All</option>
      <option class="form__option" value="1">1+</option>
      <option class="form__option" value="2">2+</option>
      <option class="form__option" value="3">3+</option>
      <option class="form__option" value="4">4+</option>
      <option class="form__option" value="5">5</option>
    </select>

    <label class="form__option" for="category">Category</label>

    <select class="form__select" name="category" bind:value={filterCategory}>
      <option class="form__option" value="all">All</option>
      {#each categories as category (category.id) }
      <option class="form__option" value={category.title}>{category.title}</option>
      {/each}
    </select>

    <button class="form__btn" on:click={filter}>apply filter</button>
  </form>
</div>


<style lang="scss">

 .filter{
  background-color: white;
  width: 800px;
  max-height: 600px;
  overflow-y: scroll;
  padding: 40px 24px;
  border-radius: 6px;
 }

 .form{
  width: 100%;

  &__label{
    display: block;
    width: 100%;
    font-size: 20px;
    text-transform: capitalize;
    &:not(:first-child){
      margin-top: 24px;
    }
  }
  &__select{
    margin-top: 12px;
    padding: 8px;
    width: 100%;
    font-size: 18px;
    border: 2px solid #ccc;
    background-color: transparent;
    border-radius: 6px;
    overflow-y: auto;
  }
  &__btn{
    padding: 12px 40px;
    font-size: 20px;
    text-transform: capitalize;
    color: white;
    background-color: rgb(43, 92, 255);
    display: block;
    margin: 40px auto 0;
    border-radius: 8px;
    &:hover{
      cursor: pointer;
      background-color: rgb(0, 60, 255);
    }
  }

 }

</style>