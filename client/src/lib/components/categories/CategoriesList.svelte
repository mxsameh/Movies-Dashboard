<script lang="ts">
  
  export let server : string;
  export let token : string;

  let categories : any;
  const getCategories = async () =>
  {
    const res = await fetch(`${server}/categories`,{
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    })

    categories = await res.json();
  }

  getCategories();
</script>

<div class="categoriesList">

  {#if categories }
  {#each categories as category }
  <div class="category">
    <h2 class="category__title">Category : {category.title}</h2>
    <p class="category__id">id : {category.id}</p>
  </div> 
  {/each}
  {/if}

</div>


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

  &__title{
    text-transform: capitalize;
    font-size: 20px;
  }
 &__id{
    color: #333;
    margin-top: 8px;
    font-size: 18px;
  }
}
  
</style>