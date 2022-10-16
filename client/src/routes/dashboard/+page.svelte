<script lang="ts">
	import Users from "$lib/components/dashboard/Users.svelte";
	import Categories from "$lib/components/dashboard/Categories.svelte";
	import Movies from "$lib/components/dashboard/Movies.svelte";

  export let data : any;

  const user = data.user

</script>


<div class="container">
  <Users {data}/>
  <Categories {data}/>
  <Movies {data} />
</div>



<style lang="scss">
  .container{
    padding: 40px 24px 0px;
  }
</style>