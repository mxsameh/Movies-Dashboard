<script lang="ts">

  export let data;

  const token = data.token;
  let popupOpened = false;
  let popup : string; 
  let categories : any;
  let editableCategory : any;

  const getCategories = async () =>
  {
    const res = await fetch('http://localhost:3000/categories',{
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

  const deleteCategory = async (id : number) =>
  {
    const res = await fetch(`http://localhost:3000/categories/${id}`,{
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
    const data = await res.json()
    console.log( data );
    getCategories()
  }

  const editCategory = (category : object) =>{
    console.log( 'edit' );
    editableCategory = category
    popupOpened = false
    popup = 'edit'
    popupOpened = true
  }

  const closePopup = () =>
  {
    popupOpened = false
  }
</script>


<section class="categories">
  <h1 class="categories__title">categories</h1>
  <ul class="categories__data">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="categories__box" on:click={viewAllCategories}>view all categories</li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="categories__box" on:click={createNewCategory}>create new category</li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="categories__box" on:click={editDeleteCategory}>edit / delete category</li>
  </ul>
</section>


{#if popupOpened }
    <!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="popup" on:click|self={closePopup}>
  <button class="popup__close" on:click={closePopup}>x</button>

  {#if popup == "view"}
  <div class="categoriesList">

    {#each categories as category (category.id) }
    <div class="category">
      <h2 class="category__title">Category : {category.title}</h2>
      <p class="category__id">id : {category.id}</p>
    </div> 
    {/each}

  </div>

  {:else if popup == "create"}
    <form method="POST" action="?/createCategory" class="newCategoryForm">
      <label for="title">category name</label>
      <input name="title" type="text" placeholder="Enter your name" required>
      <button class="newCategoryForm__btn">create category</button>
    </form>

    {:else if popup == 'editDelete'}
    <div class="categoriesList">
      {#each categories as category (category.id) }
      <div class="category categoryWithBtns">
        <div class="category__info">
          <h2 class="category__title">Category : {category.title}</h2>
          <p class="category__id">id : {category.id}</p>
        </div>
        <div class="category__btns">
          <img class="edit-btn" src="/edit.svg" alt="" on:click={()=>editCategory(category)}>
          <img class="delete-btn" src="/delete.svg" alt="" on:click={()=>deleteCategory(category.id)}>
        </div>
      </div> 
      {/each}
    </div>

    {:else if popup == 'edit'}
    <form method="POST" action="?/editCategory" class="newCategoryForm">
      <label for="title">category name</label>
      <input name="title" type="text" value={editableCategory.title} required>
      <input name="id" type="text" value={editableCategory.id} style="display: none;">
      <button type="submit" class="newCategoryForm__btn">edit category</button>
    </form>
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


  &__title{
    text-transform: capitalize;
    font-size: 20px;
  }
 &__id{
    color: #333;
    margin-top: 8px;
    font-size: 18px;
  }
  &__info{
    flex-basis: 100%;
  }
  
  &__btns{
    display: flex;
    gap: 32px;
    align-items: center;
    flex-shrink: 0;
  }
 }

 .newCategoryForm{
  background-color: white;
  width: 800px;
  max-height: 600px;
  padding: 40px 24px;

  label{
    display: block;
    width: 100%;
    font-size: 20px;
    text-transform: capitalize;
    &:not(:first-child){
      margin-top: 24px;
    }
  }
  input{
    display: block;
    width: 100%;
    font-size: 18px;
    margin-top: 12px;
    border: 2px solid #ccc;
    border-radius: 6px;
    padding: 8px;
  }

  &__btn{
    background-color: rgb(43, 92, 255);
    padding: 16px; 
    text-align: center;
    width: 40%;
    color: white;
    display: block;
    margin: 80px auto 0;
    font-size: 20px;
    border-radius: 4px;
    text-transform: capitalize;
    &:hover{
      cursor: pointer;
      background-color: rgb(0, 60, 255);
    }

  }

 }

  .categoryWithBtns{
    display: flex;
  }

 .delete-btn, .edit-btn{
  width: 24px;
  transition: transform .3s;
  &:hover{
    cursor: pointer;
    transform: scale(1.1);
  }
 }
</style>
