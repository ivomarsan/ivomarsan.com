<script setup lang="ts">

</script>

<template>
  <section :class="$style.pageLogo">
    <!-- <div :class="$style.backgroundLogo"></div> -->

    <svg
      viewBox="0 0 128 128"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :class="$style.logo"
        d="M64 36c-5.24.03-10 1.26-14.3 3.72a27.14 27.14 0 0 0-10.2 10.06A28.36 28.36 0 0 0 36 64c.03 5.22 1.13 10.06 3.52 14.33a26.51 26.51 0 0 0 9.77 10.05A26.5 26.5 0 0 0 63 92c4.15 0 8.47-.86 12.18-2.72A24.93 24.93 0 0 0 84 81.5v6c0 2.55 1.58 4.04 4 4 2.5-.04 4-1.57 4-4V64a28.2 28.2 0 0 0-3.72-14.23A26.73 26.73 0 0 0 78.2 39.72 28.38 28.38 0 0 0 64 36zm0 7c3.58.02 7.27 1 10.37 2.86 3.08 1.83 5.7 4.22 7.26 7.54C84.2 58.85 84.26 64.1 84 70c-.75-1.48-2.2-2.88-3.42-4-2.98-2.74-7.7-4.67-14.58-5.87-5.07-.88-8.89-1.87-10.76-3.42-4.05-3.35-3.57-8.8.19-11.46 2.12-1.5 5.62-2.27 8.57-2.25zM45.5 54.75c.66 2.34 2 4.44 4.15 6.25 3.13 2.65 8.05 4.5 14.35 5.56 4.88.82 8.32 1.92 10.5 3.62 4.47 3.48 4 9.42-.13 12.07A18.94 18.94 0 0 1 64 85a20.86 20.86 0 0 1-10.48-2.75 19.48 19.48 0 0 1-7.35-7.44A22.2 22.2 0 0 1 43.5 64c.02-3.4.7-6.45 2-9.25z"
      />
      <rect :class="$style.border" y="3" x="3" width="122" height="122" />
      <circle :class="$style.dot" cx="88" cy="40" r="4" />
    </svg>

    <h1>ivomarsan</h1>
  </section>
</template>

<style module lang="postcss">
.pageLogo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;

  & h1 {
    font-family: monospace;
    font-weight: lighter;
    font-size: 4rem;
    color: var(--white);
    opacity: 0;
    animation: reposition 1s ease-in-out forwards 4s;
  }

  & svg {
    width: 50rem;
    height: 50rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: resize 1s ease-in-out forwards 3s,
      reposition 1s ease-in-out forwards 4s;
  }
}

.backgroundLogo {
  background-color: var(--purple);
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation: fade-out 500ms ease-in-out forwards 3.5s;
}

.logo {
  fill: transparent;
  fill-opacity: 1;
  stroke: var(--white);
  stroke-width: 0.3;
  stroke-opacity: 1;
  stroke-miterlimit: 4;
  stroke-dasharray: 394;
  stroke-dashoffset: 394;
  animation: drawn-letter 3s ease-in-out forwards,
    fill-letter 500ms ease-in-out forwards 2s
}

.dot {
  fill: transparent;
  fill-opacity: 1;
  stroke: var(--white);
  stroke-width: 0.3;
  stroke-opacity: 1;
  stroke-dasharray: 26;
  stroke-dashoffset: 26;
  animation: drawn-letter 1s ease-in-out forwards 1s,
    fill-letter 500ms ease-in-out forwards 2s;
}

.border {
  fill: transparent;
  fill-opacity: 1;
  stroke: var(--white);
  stroke-width: 6;
  stroke-opacity: 0;
  animation: stroke-opacity 500ms ease-in-out forwards 5s;
}

@keyframes drawn-letter {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fill-letter {
  to {
    fill: #fff;
  }
}

@keyframes stroke-opacity {
  to {
    stroke-opacity: 1;
  }
}

@keyframes resize {
  to {
    opacity: 0;
    width: 15rem;
    height: 15rem;
  }
}

@keyframes reposition {
  from,
  to {
    position: unset;
    transform: none;
  }

  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
    height: 0;
    transform: translate3d(0, 100vh, 0);
  }
}

@media screen and (max-width: 500px) {
  #page-logo {
    & h1 {
      display: none;
    }

    & svg {
      width: 30rem;
      height: 30rem;
    }
  }
}
</style>