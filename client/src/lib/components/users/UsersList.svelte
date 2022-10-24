<script lang="ts">

  export let token : string;
  export let server : string;

  let users: any;

  // Fetch users
  const getUsers = async () =>
  {
    const res = await fetch(`${server}/users`,{
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    })
    users = await res.json()
  }
  getUsers();

</script>

{#if users }
  <div class="usersList">
    {#each users as user (user.id) }
      <div class="user">
        <h2 class="user__name">{user.name}</h2>
        <p class="user__email">{user.email}</p>
        <p class="user__id">{user.id}</p>
      </div>
    {/each}
  </div>
{/if}


<style lang="scss">
 .usersList{
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
</style>