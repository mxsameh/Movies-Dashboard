<script lang="ts">
	import EditCategory from "./EditCategory.svelte";

  export let server : string;
  export let token : string;

  let categories : any;
  let editableCategory : any;
  let popup : string = 'list';

  // Get Categories
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

  // Delete Category
  const deleteCategory = async (id : number) =>
  {
    const res = await fetch(`${server}/categories/${id}`,{
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
    const data = await res.json()
    categories = categories.filter((cat : any) => cat.id != id)
  }

  // Edit Category
  const editCategory = (category : any) =>
  {
    editableCategory = category
    popup = 'edit'
  }

</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if popup == 'list' }
<div class="categoriesList">
  {#if categories }
  {#each categories as category (category.id) }

  <div class="category">
    <!-- Category Info -->
    <div class="category__info">
      <h2 class="category__title">Category : {category.title}</h2>
      <p class="category__id">id : {category.id}</p>
    </div>
    <!-- Category Btns -->
    <div class="category__btns">
      <img class="category__editBtn" src="/edit.svg" alt="" on:click={()=>editCategory(category)}>
      <img class="category__deleteBtn" src="/delete.svg" alt="" on:click={()=>deleteCategory(category.id)}>
    </div>
  </div> 

  {/each}
  {/if}
</div>

{:else if popup == 'edit' }
<EditCategory {editableCategory} />
{/if}

<style lang="scss">
  
 .categoriesList{
  background-color: white;
  width: 800px;
  max-height: 600px;
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: scroll;
 }

 .category{
  border-bottom: 1px solid #555;
  padding-bottom: 16px;
  display: flex;

  &__info{
    flex-basis: 100%;
  }
  &__title{
    text-transform: capitalize;
    font-size: 20px;
  }
 &__id{
    color: #333;
    margin-top: 8px;
    font-size: 18px;
  }
  &__btns{
    display: flex;
    gap: 24px;
    align-items: center;
    flex-shrink: 0;
  }
  &__editBtn, &__deleteBtn{
    width: 24px;
    transition: transform .2s;
    &:hover{
      cursor: pointer;
      transform: scale(1.1);
    }
  }
 }

</style>