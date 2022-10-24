<script lang="ts">
	import CategoriesList from "../categories/CategoriesList.svelte";
	import CreateCategory from "../categories/CreateCategory.svelte";
	import ModifyCategory from "../categories/modifyCategory.svelte";

  export let data;

  const token = data.token;
  const server = data.server

  let popupOpened = false;
  let popup : string; 
  let categories : any;

  const getCategories = async () =>
  {
    const res = await fetch(`${server}/categories`,{
      headers : {
        "Authorizatoin" : `Bearer ${token}`
      }
    })
    categories = await res.json()
    return categories
  }
   
  const viewAllCategories = async () =>
  {
    popup = 'view'
    categories = await getCategories()
    if(categories)
    {
      popupOpened = true
    }
  }

  const createNewCategory = () =>
  {
    popup = 'create'
    popupOpened = true
  }

  const editDeleteCategory = async () =>
  {
    popup = 'editDelete'
    categories = await getCategories()
    if(categories)
    {
      popupOpened = true
    }

  }


  const closePopup = () =>
  {
    popupOpened = false
  }
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<section class="categories">
  <h1 class="categories__title">categories</h1>
  <ul class="categories__data">
    <li class="categories__box" on:click={viewAllCategories}>view all categories</li>
    <li class="categories__box" on:click={createNewCategory}>create new category</li>
    <li class="categories__box" on:click={editDeleteCategory}>edit / delete category</li>
  </ul>
</section>


<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if popupOpened }
<div class="popup" on:click|self={closePopup}>
  <button class="popup__close" on:click={closePopup}>x</button>

  {#if popup == "view"}
  <CategoriesList {token} {server} />
  {:else if popup == "create"}
  <CreateCategory />
  {:else if popup == 'editDelete'}
  <ModifyCategory {server} {token} />
  {/if}

</div>
{/if}

<style lang="scss">
 .categories{
  margin-top: 40px;

  &__title{
    text-transform: capitalize;
    font-size: 32px;
  }
  &__data{
    display: flex;
    gap: 24px;
    max-width: 1000px;
    margin-top: 24px;
  }
  &__box{
    background-color: #ededed;
    border-radius: 4px;
    flex-basis: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    text-transform: capitalize;
    height: 80px;
    font-weight: 500;
    &:hover{
      cursor: pointer;
      background-color: rgb(54, 54, 54);
      color: white;
    }
  }
 } 

 .popup{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, .8);
  display: flex;
  align-items: center;
  justify-content: center;

  &__close{
    position: absolute;
    top: 16px;
    right: 32px;
    color: white;
    font-size: 32px;
    font-weight: bold;
    &:hover{
      cursor: pointer;
      color: red;
    }
  }
 }

</style>
