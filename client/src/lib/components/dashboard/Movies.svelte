<script>
  
</script>


<section class="movies">
  <h1 class="movies__title">movies</h1>
  <ul class="movies__data">
    <li class="movies__box">view all movies</li>
    <li class="movies__box">create new movie</li>
    <li class="movies__box">edit / delete movie</li>
  </ul>
</section>


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
</style>
