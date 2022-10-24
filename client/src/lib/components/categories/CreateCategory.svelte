<script lang="ts">

</script>

<form method="POST" action="?/createCategory" class="form">
  <h1 class="form__title">create new category</h1>
  <label class="form__label" for="title">category name</label>
  <input class="form__input" name="title" type="text" placeholder="Enter category name" required>
  <button class="form__btn">create category</button>
</form>

<style lang="scss">
 .form{
  background-color: white;
  width: 800px;
  max-height: 600px;
  padding: 40px 24px;

&__title{
  text-transform: capitalize;
  font-size: 32px;
  color: #333;
  text-align: center;
}
  &__label{
    display: block;
    width: 100%;
    font-size: 20px;
    text-transform: capitalize;
    margin-top: 24px;
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
  &__btn{
    background-color: rgb(43, 92, 255);
    padding: 16px; 
    text-align: center;
    width: 40%;
    color: white;
    display: block;
    margin: 48px auto 0;
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