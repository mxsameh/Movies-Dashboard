<script lang="ts">
	import { goto } from "$app/navigation";
	import CreateUser from "../users/CreateUser.svelte";
	import UsersList from "../users/UsersList.svelte";
  export let data;

  const user = data.user
  const token = data.token
  const server = data.server
  let popupOpened = false
  let popup : string; 
  let users : any;

  const viewAllUsers = async () =>
  {
    popup = 'view'
      const res = await fetch(`${server}/users`,{
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

  const logout = () =>
  {
    goto('/logout')
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
    <li class="users__box" on:click={logout}>logout</li>
  </ul>
</section>

{#if popupOpened }
    <!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="popup" on:click|self={closePopup}>
  <button class="popup__close" on:click={closePopup}>x</button>

  {#if popup == "view"}
    <UsersList {token} {server} />
  {:else if popup == "create"}
  <CreateUser />
  {/if}

</div>
{/if}

<!-- {#if form?.success}
<div class="successBox">
  <p>user created successfully</p>
</div>
{/if} -->


<style lang="scss">
  // .successBox{
  //   position: absolute;
  //   width: 200px;
  //   height: 200px;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%,-50%);
  //   background-color: #555;
  //   color: white;
  //   text-transform: capitalize;
  //   font-size: 20px;
  // }
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


</style>