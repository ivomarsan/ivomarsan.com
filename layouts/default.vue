<script setup lang="ts">

</script>

<template>
  <div
    :class="$style.pageLayout"
  >
        <slot />
  </div>
</template>

<style module lang="postcss">
.pageLayout {
  @apply bg-bg-primary relative flex min-h-dvh flex-col;

  @media print {
    background-color: #fff !important;
  }

  
}
</style>
