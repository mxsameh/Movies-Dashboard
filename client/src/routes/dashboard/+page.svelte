<script lang="ts">
	import Users from "$lib/components/dashboard/Users.svelte";
	import Categories from "$lib/components/dashboard/Categories.svelte";
	import Movies from "$lib/components/dashboard/Movies.svelte";

  export let data : any;
  export let form : any;

  const user = data.user
</script>

<header class="header">
  <img class="header__logo" src="/storex.png" alt="logo">
</header>

<div class="container">
  <Users {data} {form}/>
  <Categories />
  <Movies />
</div>



<style lang="scss">
 .header{
	background-color: #222;
  padding: 16px 0;

  &__logo{
    display: block;
    margin: 0 auto;
  }
 } 

  .container{
    padding: 40px 24px 0px;
  }
</style>