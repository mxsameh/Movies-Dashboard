<script>
	import { goto } from '$app/navigation';
  import '../styles/global.css'
  const goHome = () =>
  {
    goto('/')
  }
</script>

<header class="header">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img class="header__logo" src="/storex.png" alt="logo" on:click={goHome}>
</header>

<slot />

<style lang="scss">
 .header{
	background-color: #222;
  padding: 16px 0;

  &__logo{
    display: block;
    margin: 0 auto;

    &:hover{
      cursor : pointer
    }
  }
 } 

</style>