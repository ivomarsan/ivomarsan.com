#!/usr/bin/env bun

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Script para auto-detectar composables do Nuxt e funções utilitárias e adicionar ao biome.json
 */
async function updateBiomeGlobals() {
  try {
    // Diretórios a serem escaneados
    const dirsToScan = ['./composables', './stores', './utils'];
    const composableNames = [];
    const utilityFunctions = [];

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

            // Se estiver na pasta utils, extrair funções utilitárias
            if (dirPath.includes('/utils') || dirPath.includes('\\utils')) {
              const utilityPatterns = [
                /export\s+function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g, // export function functionName
                /export\s+const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g, // export const functionName =
                /export\s+default\s+function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g, // export default function functionName
                /export\s*{\s*([^}]+)\s*}/g, // export { func1, func2 }
              ];

              for (const pattern of utilityPatterns) {
                const matches = content.matchAll(pattern);

                for (const match of matches) {
                  if (pattern.source.includes('{')) {
                    // Para export { func1, func2 }, dividir por vírgulas
                    const functions = match[1]
                      .split(',')
                      .map((f) => f.trim().replace(/\s+as\s+\w+/, '')) // Remove aliases
                      .filter((f) => f && !f.includes('type')); // Remove exports de tipo

                    for (const func of functions) {
                      if (func && !utilityFunctions.includes(func)) {
                        utilityFunctions.push(func);
                      }
                    }
                  } else {
                    const functionName = match[1];

                    if (
                      functionName &&
                      !utilityFunctions.includes(functionName)
                    ) {
                      utilityFunctions.push(functionName);
                    }
                  }
                }
              }
            }

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
    console.log('🛠️ Funções utilitárias detectadas:', utilityFunctions);
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
      'useNuxtApp',
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

    // Combinar globals (defaults + composables customizados + funções utilitárias)
    const allGlobals = [
      ...new Set([...nuxtDefaults, ...composableNames, ...utilityFunctions]),
    ];

    biomeConfig.javascript.globals = allGlobals;

    // Escrever arquivo atualizado
    await writeFile('./biome.json', JSON.stringify(biomeConfig, null, 2));

    console.log(
      '✅ biome.json atualizado com',
      composableNames.length,
      'composables customizados e',
      utilityFunctions.length,
      'funções utilitárias detectadas em composables/, stores/ e utils/',
    );
  } catch (error) {
    console.error('❌ Erro ao atualizar biome.json:', error);
  }
}

updateBiomeGlobals();
