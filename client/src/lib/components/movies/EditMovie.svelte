<script lang="ts">
  export let editableMovie : any;
  export let categories : any;

  
</script>

<form method="POST" action="?/editMovie" class="form">
  <input class="form__input" type="text" name="id" value={editableMovie.id} style="display: none;">
  <label class="form__label" for="title">movie name</label>
  <input class="form__input"name="title" type="text" value={editableMovie.title} required>
  <label class="form__lable"for="description">description</label>
  <input class="form__input"name="description" type="text" value={editableMovie.description} required>
  <label class="form__label"for="rate">rate</label>
  <input class="form__input"name="rate" type="number" value={editableMovie.rate} required>
  <label class="form__label"for="image">image</label>
  <input class="form__input"name="image" type="text" value={editableMovie.image} required>
  <label class="form__label"for="category">category</label>
  <select class="form__select"name="category" value={editableMovie.category}>
    {#each categories as category (category.id) }
    {#if category.title == editableMovie.category}
    <option value={category.title} selected>{category.title}</option> 
    {:else}
    <option value={category.title}>{category.title}</option> 
    {/if}
    {/each}
  </select>
  <button type="submit" class="form__btn">edit movie</button>
</form>

<style lang="scss">
 .form{
  background-color: white;
  width: 800px;
  max-height: 600px;
  overflow-y: scroll;
  padding: 40px 24px;

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

</style>