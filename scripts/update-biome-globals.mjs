#!/usr/bin/env bun

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Script para auto-detectar composables do Nuxt e adicionar ao biome.json
 */
async function updateBiomeGlobals() {
  try {
    // Diretórios a serem escaneados
    const dirsToScan = ['./composables', './stores'];
    const composableNames = [];

    // Função para escanear um diretório
    async function scanDirectory(dirPath) {
      try {
        const files = await readdir(dirPath, { withFileTypes: true });

        for (const file of files) {
          const fullPath = join(dirPath, file.name);

          if (file.isDirectory()) {
            // Recursivamente escanear subdiretórios (como stores/smartico)
            await scanDirectory(fullPath);
          } else if (file.name.endsWith('.ts') || file.name.endsWith('.js')) {
            const content = await readFile(fullPath, 'utf-8');

            // Extrair nomes de composables e stores usando diferentes padrões de regex
            const patterns = [
              /export\s+const\s+(use[A-Za-z0-9]+)/g, // export const useName = () => {
              /export\s+function\s+(use[A-Za-z0-9]+)/g, // export function useName() {
              /export\s+default\s+function\s+(use[A-Za-z0-9]+)/g, // export default function useName() {
              /export\s+const\s+(use[A-Za-z0-9]+Store)\s*=\s*defineStore/g, // export const useNameStore = defineStore
            ];

            for (const pattern of patterns) {
              const matches = content.match(pattern);

              if (matches) {
                for (const match of matches) {
                  // Extrair apenas o nome do composable/store
                  const cleanMatch = match.replace(
                    /export\s+(const\s+|function\s+|default\s+function\s+)/,
                    '',
                  );

                  // Para stores com defineStore, extrair só o nome da store
                  const name = cleanMatch.replace(/\s*=\s*defineStore.*/, '');

                  if (
                    name.startsWith('use') &&
                    !composableNames.includes(name)
                  ) {
                    composableNames.push(name);
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        console.warn(
          `⚠️ Não foi possível escanear o diretório ${dirPath}:`,
          error.message,
        );
      }
    }

    // Escanear todos os diretórios
    for (const dir of dirsToScan) {
      await scanDirectory(dir);
    }

    console.log('🔍 Composables detectados:', composableNames);
    console.log(`📁 Diretórios escaneados: ${dirsToScan.join(', ')}`);

    // Ler biome.json atual
    const biomeConfig = JSON.parse(await readFile('./biome.json', 'utf-8'));

    // Definir globals padrão do Nuxt e Pinia
    const nuxtDefaults = [
      // Vue Composition API
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
      // Nuxt Composables
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
      // Pinia
      'defineStore',
      'storeToRefs',
      'acceptHMRUpdate',
      // Global
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
      'composables customizados detectados em composables/ e stores/',
    );
  } catch (error) {
    console.error('❌ Erro ao atualizar biome.json:', error);
  }
}

updateBiomeGlobals();
