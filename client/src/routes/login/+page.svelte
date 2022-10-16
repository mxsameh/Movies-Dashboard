
<h1 class="title">login</h1>

<form method="POST" class="form">
  <label for="email">email</label>
  <input type="text" name="email" placeholder="Enter your email">
  <label for="password">password</label>
  <input type="password" name="password" placeholder="Enter your password">
  <button class="btn">login</button>
</form>

<style lang="scss">
  .title{
    text-align: center;
    text-transform: capitalize;
    font-size: 32px;
    margin-top: 40px;
  }
  .form{
    margin: 24px auto;
    max-width: 500px;
  }
  label{
    display: block;
    font-size: 20px;
    text-transform: capitalize;
    &:not(:first-child){
      margin-top: 24px;
    }
  }
  input{
    padding: 8px;
    border: 2px solid #777;
    border-radius: 6px;
    width: 100%;
    margin-top: 12px;
    font-size: 16px;
  }
  .btn{
    padding: 12px 60px;
    background-color: rgb(32, 121, 255);
    color: white;
    font-size: 20px;
    text-transform: capitalize;
    display: block;
    margin: 40px auto;
    border-radius: 8px;
    &:hover{
      cursor: pointer;
    background-color: rgb(0, 102, 255);
    }
  }

  
</style>