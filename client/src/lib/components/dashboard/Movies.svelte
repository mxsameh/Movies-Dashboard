<script lang="ts">

  export let data;

  const token = data.token;
  const server = data.server
  let popupOpened = false;
  let popup : string; 
  let movies : any;
  let editableMovie : any;
  let categories : any;

  const getMovies = async () =>
  {
    const res = await fetch(`${server}/movies`,{
      headers : {
        "Authorizatoin" : `Bearer ${token}`
      }
    })
    movies = await res.json()
    return movies
  }
   
  const viewAllMovies = async () =>
  {
    popup = 'view'
    movies = await getMovies()
    if(movies)
    {
      popupOpened = true
    }
  }

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

  categories = getCategories();
  const createNewMovie = async() =>
  {
    categories = await getCategories();
    popup = 'create'
    popupOpened = true
  }

  const editDeleteMovie = async () =>
  {
    popup = 'editDelete'
    movies = await getMovies()
    if(movies)
    {
      popupOpened = true
    }

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
    getMovies()
  }

  const editMovie = async(movie : object) =>{
    categories = await getCategories();
    editableMovie = movie
    popupOpened = false
    popup = 'edit'
    popupOpened = true
  }

  const closePopup = () =>
  {
    popupOpened = false
  }
</script>


<section class="movies">
  <h1 class="movies__title">movies</h1>
  <ul class="movies__data">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="movies__box" on:click={viewAllMovies}>view all movies</li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="movies__box" on:click={createNewMovie}>create new movie</li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="movies__box" on:click={editDeleteMovie}>edit / delete movie</li>
  </ul>
</section>

{#if popupOpened }
    <!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="popup" on:click|self={closePopup}>
  <button class="popup__close" on:click={closePopup}>x</button>

  {#if popup == "view"}
  <div class="moviesList">
    {#if !movies.length }
      <p>No movies found</p> 
    {:else}
      {#each movies as movie (movie.id) }
      <div class="movie">
        <img src={movie.image} class="movie__img" alt="movie-img">
        <div class="movie__info">
          <h2 class="movie__title">{movie.title}</h2>
          <p class="movie__description">Description : <span>{movie.description}</span></p>
          <p class="movie__category">Category :<span>{movie.category}</span></p>
          <p class="movie__rate">Rate : <span>{movie.rate}/10</span></p>
          <p class="movie__id">Id : <span>{movie.id}</span></p>
        </div>
     </div> 
      {/each}
    {/if}

  </div>

  {:else if popup == "create"}
    <form method="POST" action="?/createMovie" class="newMovieForm">
      <label for="title">movie name</label>
      <input name="title" type="text" placeholder="Enter movie name" required>
      <label for="description">description</label>
      <input name="description" type="text" placeholder="Enter movie description " required>
      <label for="rate">rate</label>
      <input name="rate" type="number" placeholder="Enter movie rate" required>
      <label for="image">image</label>
      <input name="image" type="text" placeholder="Enter image link" required>
      <label for="category">category</label>
      <select name="category">
        {#each categories as category (category.id) }
        <option value={category.title}>{category.title}</option> 
        {/each}
      </select>
      <button class="newMovieForm__btn">create movie</button>
    </form>

    {:else if popup == 'editDelete'}
      <div class="moviesList">
      {#if !movies.length }
        <p>No movies found</p> 
      {:else}
        {#each movies as movie (movie.id) }
        <div class="movie movieWithBtns">
          <img src={movie.image} class="movie__img" alt="movie-img">
          <div class="movie__info">
            <h2 class="movie__title">{movie.title}</h2>
            <p class="movie__description">Description : <span>{movie.description}</span></p>
            <p class="movie__category">Category : <span>{movie.category}</span></p>
            <p class="movie__rate">Rate : <span>{movie.rate}/10</span></p>
            <p class="movie__id">Id : <span>{movie.id}</span></p>
          </div>
          <div class="movie__btns">
            <img class="edit-btn" src="/edit.svg" alt="" on:click={()=>editMovie(movie)}>
            <img class="delete-btn" src="/delete.svg" alt="" on:click={()=>deleteMovie(movie.id)}>
          </div>
        </div> 
        {/each}
      {/if}
      </div>
    {:else if popup == 'edit'}
    <form method="POST" action="?/editMovie" class="newMovieForm">
      <input type="text" name="id" value={editableMovie.id} style="display: none;">
      <label for="title">movie name</label>
      <input name="title" type="text" value={editableMovie.title} required>
      <label for="description">description</label>
      <input name="description" type="text" value={editableMovie.description} required>
      <label for="rate">rate</label>
      <input name="rate" type="number" value={editableMovie.rate} required>
      <label for="image">image</label>
      <input name="image" type="text" value={editableMovie.image} required>
      <label for="category">category</label>
      <select name="category" value={editableMovie.category}>
        {#each categories as category (category.id) }
        {#if category.title == editableMovie.category}
        <option value={category.title} selected>{category.title}</option> 
        {:else}
        <option value={category.title}>{category.title}</option> 
        {/if}
        {/each}
      </select>
      <button type="submit" class="newMovieForm__btn">edit movie</button>
    </form>
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

  &__btns{
    display: flex;
    gap: 32px;
    align-items: center;
    flex-shrink: 0;
  }
  &__title{
    text-transform: capitalize;
    font-size: 20px;
  }
 &__id,&__category,&__rate,&__description{
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

 .newMovieForm{
  background-color: white;
  width: 800px;
  max-height: 600px;
  overflow-y: scroll;
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

  select{
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

  .movieWithBtns{
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
