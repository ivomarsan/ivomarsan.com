#!/usr/bin/env bun

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Script para auto-detectar composables do Nuxt e adicionar ao biome.json
 */
async function updateBiomeGlobals() {
  try {
    // Ler composables da pasta composables
    const composablesDir = './composables';
    const files = await readdir(composablesDir);

    const composableNames = [];

    for (const file of files) {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        const content = await readFile(join(composablesDir, file), 'utf-8');

        // Extrair nomes de composables usando regex
        const matches = content.match(/export\s+const\s+(use[A-Za-z0-9]+)/g);
        if (matches) {
          for (const match of matches) {
            const name = match.replace(/export\s+const\s+/, '');
            if (name.startsWith('use') && !composableNames.includes(name)) {
              composableNames.push(name);
            }
          }
        }
      }
    }

    console.log('🔍 Composables detectados:', composableNames);

    // Ler biome.json atual
    const biomeConfig = JSON.parse(await readFile('./biome.json', 'utf-8'));

    // Definir globals padrão do Nuxt
    const nuxtDefaults = [
      'ref',
      'computed',
      'reactive',
      'watch',
      'watchEffect',
      'onMounted',
      'onBeforeMount',
      'onUpdated',
      'onBeforeUpdate',
      'onUnmounted',
      'onBeforeUnmount',
      'useRoute',
      'useRouter',
      'navigateTo',
      'useRuntimeConfig',
      'useState',
      'useCookie',
      'useHead',
      'useSeoMeta',
      'useLazyFetch',
      'useFetch',
      'useAsyncData',
      '$fetch',
      'refreshCookie',
      'definePageMeta',
      'defineNuxtPlugin',
      'defineNuxtRouteMiddleware',
      'createError',
      'showError',
      'clearError',
      'isNuxtError',
      'defineNuxtConfig',
      'process',
    ];

    // Combinar globals (defaults + composables customizados)
    const allGlobals = [...new Set([...nuxtDefaults, ...composableNames])];

    biomeConfig.javascript.globals = allGlobals;

    // Escrever arquivo atualizado
    await writeFile('./biome.json', JSON.stringify(biomeConfig, null, 2));

    console.log(
      '✅ biome.json atualizado com',
      composableNames.length,
      'composables customizados',
    );
  } catch (error) {
    console.error('❌ Erro ao atualizar biome.json:', error);
  }
}

updateBiomeGlobals();
