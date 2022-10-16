<script lang="ts">
	import Users from "$lib/components/dashboard/Users.svelte";
	import Categories from "$lib/components/dashboard/Categories.svelte";
	import Movies from "$lib/components/dashboard/Movies.svelte";

  export let data : any;
  export let form : any;

  const user = data.user

</script>


<div class="container">
  <Users {data} {form}/>
  <Categories {data} {form}/>
  <Movies {data} {form} />
</div>



<style lang="scss">
  .container{
    padding: 40px 24px 0px;
  }
</style>