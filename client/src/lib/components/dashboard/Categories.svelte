<script>
  
</script>


<section class="categories">
  <h1 class="categories__title">categories</h1>
  <ul class="categories__data">
    <li class="categories__box">view all categories</li>
    <li class="categories__box">create new category</li>
    <li class="categories__box">edit / delete movie</li>
  </ul>
</section>


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
</style>
