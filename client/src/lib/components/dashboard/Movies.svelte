<script lang="ts">
	import CreateMovie from "../movies/CreateMovie.svelte";
	import ModifyMovie from "../movies/ModifyMovie.svelte";
  import MoviesList from "../movies/MoviesList.svelte";

  export let data;

  const token = data.token;
  const server = data.server

  let popupOpened = false;
  let popup : string; 

   
  const viewAllMovies = async () =>
  {
    popup = 'view'
    popupOpened = true
  }


  // const filter = async() =>
  // {
  //   console.log( 'filter' );
  //   getCategories();
  //   let  filteredMovies = await getMovies();
  //   const form = document.querySelector('.filter-form') as HTMLFormElement
  //   filterRate = form.rate.value
  //   filterCategory = form.category.value

  //   console.log( filterRate, filterCategory );

  //   if(filterRate != 'all')
  //   {
  //     filteredMovies = filteredMovies.filter(movie => movie.rate >= filterRate)
  //   }
  //   if(filterCategory != 'all')
  //   {
  //     filteredMovies = filteredMovies.filter(movie => movie.category == filterCategory)
  //   }
  
  //   popup = 'view'
  //   movies = filteredMovies

  // }

  const createNewMovie = async() =>
  {
    popup = 'create'
    popupOpened = true
  }

  const editDeleteMovie = async () =>
  {
    popup = 'editDelete'
    popupOpened = true
  }


  const closePopup = () =>
  {
    popupOpened = false
  }
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<section class="movies">
  <h1 class="movies__title">movies</h1>
  <ul class="movies__data">
    <li class="movies__box" on:click={viewAllMovies}>view all movies</li>
    <li class="movies__box" on:click={createNewMovie}>create new movie</li>
    <li class="movies__box" on:click={editDeleteMovie}>edit / delete movie</li>
  </ul>
</section>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if popupOpened }
<div class="popup" on:click|self={closePopup}>
  <button class="popup__close" on:click={closePopup}>x</button>

  {#if popup == "view"}
  <MoviesList {token} {server} />

  {:else if popup == "create"}
  <CreateMovie {server} {token} />

  {:else if popup == 'editDelete'}
  <ModifyMovie {server} {token} />
  {/if}

</div>
{/if}

<style lang="scss">
 .movies{
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
