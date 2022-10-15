<script lang="ts">
	import { goto } from "$app/navigation";




  export let data;
  export let form : any;

  const user = data.user
  const token = data.token
  let popupOpened = false
  let popup : string; 
  let users : any;

  const viewAllUsers = async () =>
  {
    popup = 'view'
      const res = await fetch('http://localhost:3000/users',{
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      users = await res.json()

      popupOpened = true
  }

  const createNewUser = async() =>
  {
    popup = 'create'
    popupOpened = true
  }

  const closePopup = () =>
  {
    popupOpened = false
  }

  $:
  {
    if(form?.success)
    {
      setTimeout(()=>{
        console.log( 'remove' );
      }, 2000)
    }
  }

  const goToLogin = () =>
  {
    goto('/login')
    
  }
  
</script>

<section class="users">
  <h1 class="users__title">users</h1>
  <ul class="users__data">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="users__box" on:click={viewAllUsers}>view users</li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="users__box" on:click={createNewUser}>create new user</li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="users__box" on:click={goToLogin} >login</li>
  </ul>
</section>

{#if popupOpened }
    <!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="popup" on:click|self={closePopup}>
  <button class="popup__close" on:click={closePopup}>x</button>

  {#if popup == "view"}
  <div class="usersList">

    {#each users as user (user.id) }
    <div class="user">
      <h2 class="user__name">{user.name}</h2>
      <p class="user__email">{user.email}</p>
      <p class="user__id">id : {user.id}</p>
    </div> 
    {/each}

  </div>
  {:else if popup == "create"}
    <form method="POST" action="?/create" class="newUserForm">
      <label for="name">name</label>
      <input name="name" type="text" placeholder="Enter your name" required>
      <label for="email">email</label>
      <input name="email" type="text" placeholder="Enter your email" required>
      <label for="password">password</label>
      <input name="password" type="password" placeholder="Enter password" required>
      <button class="newUserForm__btn">create user</button>
    </form>
  {/if}

</div>
{/if}

{#if form?.success}
<div class="successBox">
  <p>user created successfully</p>
</div>
{/if}


<style lang="scss">
  .successBox{
    position: absolute;
    width: 200px;
    height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #555;
    color: white;
    text-transform: capitalize;
    font-size: 20px;
  }
 .users{

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

 .usersList{
  background-color: white;
  width: 800px;
  height: 600px;
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: scroll;
 }

 .user{
  border-bottom: 1px solid #555;
  padding-bottom: 16px;


  &__name{
    text-transform: capitalize;
    font-size: 20px;
  }
  &__email, &__id{
    color: #333;
    margin-top: 8px;
    font-size: 18px;
  }
 }

 .newUserForm{
  background-color: white;
  width: 800px;
  height: 600px;
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