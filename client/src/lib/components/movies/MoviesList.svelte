<script lang="ts">
	import FilterMovies from "./FilterMovies.svelte";


  export let server : string
  export let token : string

  let movies : any;
  let popup = 'list';

  const getMovies = async () =>
  {
    const res = await fetch(`${server}/movies`,{
      headers : {
        "Authorizatoin" : `Bearer ${token}`
      }
    })
    movies = await res.json();
  }
  getMovies()

  const filter = () =>
  {
    popup = 'filter';
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if popup='list'}
  {#if movies }
  <div class="moviesList">
    {#if !movies.length }
      <p>No movies found</p> 

    {:else}
    <img class="moviesList__filter" src="/filter.svg" alt="filter" on:click={filter}>

    {#each movies as movie (movie.id) }
    <div class="movie">
      <img src={movie.image} class="movie__img" alt="movie-img">
      <div class="movie__info">
        <h2 class="movie__title">{movie.title}</h2>
        <p class="movie__description">Description : <span>{movie.description}</span></p>
        <p class="movie__category">Category :<span>{movie.category}</span></p>
        <p class="movie__rate">Rate : <span>{movie.rate}/5</span></p>
        <p class="movie__id">Id : <span>{movie.id}</span></p>
      </div>
    </div> 
    {/each}

    {/if}
  </div>
  {/if}

{:else if popup='filter'}
<h1>filter</h1>
<FilterMovies {server} {token}/>
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

 &__filter{
  width: 28px;
  display: block;
  position: absolute;
  top: 16px;
  right: 16px;
  transition: transform .3s linear;
  &:hover{
    cursor: pointer;
    transform: scale(1.2);
  }
 }
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
 &__id, &__category, &__rate, &__description{
    color: black;
    margin-top: 8px;
    font-size: 18px;
    span{
    color: #333;
    }
  }
  &__description{
    margin-top: 16px;
  }
 }

</style>