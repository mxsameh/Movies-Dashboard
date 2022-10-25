<script lang="ts">

  export let server : string
  export let token : string

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

</script>

<form method="POST" action="?/createMovie" class="form">
  <h1 class="form__title">create new movie</h1>
  <label class="form__label" for="title">movie name</label>
  <input class="form__input" name="title" type="text" placeholder="Enter movie name" required>
  <label class="form__label" for="description">description</label>
  <input class="form__input" name="description" type="text" placeholder="Enter movie description " required>
  <label class="form__label" for="rate">rate</label>
  <input class="form__input" name="rate" type="number" min="0" max="5" placeholder="Enter movie rate" required>
  <label class="form__label" for="image">image</label>
  <input class="form__input" name="image" type="text" placeholder="Enter image link" required>
  <label class="form__label" for="category">category</label>

  <select class="form__select" name="category">
    {#if categories }
    {#each categories as category (category.id) }
    <option class="form__selectOption" value={category.title}>{category.title}</option> 
    {/each}
    {/if}
  </select>

  <button class="form__btn">create movie</button>
</form>

<style lang="scss">

 .form{
  background-color: white;
  width: 800px;
  max-height: 600px;
  overflow-y: scroll;
  padding: 40px 24px;
  border-radius: 8px;

&__title{
  text-transform: capitalize;
  font-size: 32px;
  color: #333;
  text-align: center;
  }
  &__label{
    display: block;
    width: 100%;
    font-size: 20px;
    text-transform: capitalize;
    &:not(:first-child){
      margin-top: 24px;
    }
  }
  &__input{
    display: block;
    width: 100%;
    font-size: 18px;
    margin-top: 12px;
    border: 2px solid #ccc;
    border-radius: 6px;
    padding: 8px;
  }
  &__select{
    margin-top: 12px;
    padding: 8px;
    width: 100%;
    font-size: 18px;
    border: 2px solid #ccc;
    background-color: transparent;
    border-radius: 6px;
  }
  &__btn{
    background-color: rgb(43, 92, 255);
    padding: 16px; 
    text-align: center;
    width: 40%;
    color: white;
    display: block;
    margin: 48px auto 0;
    font-size: 20px;
    border-radius: 4px;
    text-transform: capitalize;
    &:hover{
      cursor: pointer;
      background-color: rgb(0, 60, 255);
    }
  }
 }

  
</style>