<script setup lang="ts">

</script>

<template>
  <main :class="$style.index" role="main">
    <PageLogo />
  </main>
</template>

<style module lang="postcss">
.index {
  display: flex;
  justify-content: center;
  background-color: var(--black);
  height: 100dvh;
  contain: layout style paint;
  transform: translateZ(0);
}
</style>
