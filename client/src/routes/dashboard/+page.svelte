<script lang="ts">
	import Users from "$lib/components/dashboard/Users.svelte";
	import Categories from "$lib/components/dashboard/Categories.svelte";
	import Movies from "$lib/components/dashboard/Movies.svelte";

  export let data : any;

  const user = data.user

</script>


<div class="container">
  <h1 class="title">welcome {user.name.split(' ')[0]} !!</h1>
  <Users {data}/>
  <Categories {data}/>
  <Movies {data} />
</div>



<style lang="scss">
  .container{
    padding: 40px 24px 0px;
    max-width: 1000px;
    margin: 0 auto;
  }
  .title{
    text-transform: capitalize;
    text-align: center;
    color: rgb(253, 44, 114);
    font-size: 40px;
  }
</style>