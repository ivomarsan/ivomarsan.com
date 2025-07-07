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
  contain: layout style paint;

  @media print {
    background-color: #fff !important;
  }
}
</style>
