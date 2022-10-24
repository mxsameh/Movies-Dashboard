<script lang="ts">
  
</script>

<form method="POST" action="?/createUser" class="form">
  <h1 class="form__title">create new user</h1>
  <label class="form__label" for="name">name</label>
  <input class="form__input" name="name" type="text" placeholder="Enter your name" required>
  <label class="form__label" for="email">email</label>
  <input class="form__input" name="email" type="text" placeholder="Enter your email" required>
  <label class="form__label" for="password">password</label>
  <input class="form__input" name="password" type="password" placeholder="Enter password" required>
  <button class="form__btn">create user</button>
</form>


<style lang="scss">
 .form{
  background-color: white;
  width: 800px;
  max-height: 600px;
  padding: 40px 24px;
  border-radius: 6px;

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