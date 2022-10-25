<script lang="ts">
	import EditMovie from "./EditMovie.svelte";



  export let server : string
  export let token : string

  let movies : any;
  let categories : any;
  let editableMovie : any;
  let popup = 'list';

  // Get Movies
  const getMovies = async () =>
  {
    const res = await fetch(`${server}/movies`,{
      headers : {
        "Authorizatoin" : `Bearer ${token}`
      }
    })
    movies = await res.json()
  }
  // getMovies();

  // Get Categories
  const getCategories = async () =>
  {
    const res = await fetch(`${server}/categories`,{
      headers : {
        "Authorizatoin" : `Bearer ${token}`
      }
    })
    const categories = await res.json()
    console.log( categories );
    return categories
  }
  categories = getCategories();

  const editMovie = ( movie : any ) =>
  {
    editableMovie = movie; 
    popup = 'edit';
  }

  const deleteMovie = async (id : number) =>
  {
    const res = await fetch(`${server}/movies/${id}`,{
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
    const data = await res.json()
    movies = movies.filter((movie:any) => movie.id != id)
  }

</script>

{#if popup='list' }
<div class="moviesList">

  {#if !movies.length }
  <p>No movies found</p> 

  {:else}
  {#each movies as movie (movie.id) }
  <div class="movie">
    <img src={movie.image} class="movie__img" alt="movie-img">
    <!-- Movie Info -->
    <div class="movie__info">
      <h2 class="movie__title">{movie.title}</h2>
      <p class="movie__description">Description : <span>{movie.description}</span></p>
      <p class="movie__category">Category : <span>{movie.category}</span></p>
      <p class="movie__rate">Rate : <span>{movie.rate}/10</span></p>
      <p class="movie__id">Id : <span>{movie.id}</span></p>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- Movie Btns -->
    <div class="movie__btns">
      <img class="movie__deleteBtn" src="/edit.svg" alt="edit" on:click={()=>editMovie(movie)}>
      <img class="movie__editBtn" src="/delete.svg" alt="delete" on:click={()=>deleteMovie(movie.id)}>
    </div>
  </div> 
  {/each}
  {/if}

</div>

{:else if popup='edit'}
<EditMovie {editableMovie} {categories} />
{/if}

<style lang="scss">
 .moviesList{
  background-color: white;
  width: 800px;
  max-height: 600px;
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: scroll;
  position: relative;
 }
  
 .movie{
  border-bottom: 1px solid #555;
  padding-bottom: 16px;
  display: flex;
  gap: 24px;
  align-items: center;

  &__img{
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: grey;
    display: block;
  }
  &__info{
    flex-basis: 100%;
    flex-grow: 1;
  }
  &__title{
    text-transform: capitalize;
    font-size: 20px;
  }
  &__description{
    margin-top: 16px;
  }
  &__id,&__category,&__rate,&__description{
    color: black;
    margin-top: 8px;
    font-size: 18px;
    span{
    color: #333;
    }
  }
  &__btns{
    display: flex;
    gap: 32px;
    align-items: center;
    flex-shrink: 0;
  }
 &__deleteBtn, &__editBtn{
  width: 24px;
  transition: transform .3s;
  &:hover{
    cursor: pointer;
    transform: scale(1.1);
  }
 }

 }


</style>