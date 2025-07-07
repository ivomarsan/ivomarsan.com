# Auto-Update Biome Globals para Nuxt

Este script automaticamente detecta composables customizados na pasta `/composables` e os adiciona às configurações globais do Biome, evitando erros de "variável não declarada".

## Como usar

### Executar manualmente
```bash
npm run update-biome
# ou diretamente com Bun
bun scripts/update-biome-globals.mjs
```

### Execução automática
O script pode ser executado automaticamente:

1. **Depois de criar novos composables**
2. **Antes de fazer commit** (pode ser adicionado ao pre-commit hook)
3. **Após git pull** (se alguém adicionou novos composables)

## Performance com Bun
Este script usa **Bun** ao invés de Node.js para melhor performance:
- ⚡ **Mais rápido** na execução
- 🚀 **Startup time** reduzido
- 💾 **Menor uso de memória**

## Como funciona

1. **Escaneia** a pasta `/composables` 
2. **Detecta** funções que começam com `use` (padrão de composables)
3. **Atualiza** o `biome.json` automaticamente
4. **Mantém** todos os globals padrão do Nuxt

## Exemplo de saída
```bash
🔍 Composables detectados: [ 'useTest', 'useAuth', 'useApi' ]
✅ biome.json atualizado com 3 composables customizados
```

## Globals automáticos incluídos

### Nuxt/Vue padrão:
- `ref`, `computed`, `reactive`, `watch`, `watchEffect`
- `onMounted`, `onBeforeMount`, `onUpdated`, etc.
- `useRoute`, `useRouter`, `navigateTo`
- `useState`, `useCookie`, `useHead`, `useSeoMeta`
- `useFetch`, `useAsyncData`, `$fetch`
- E muitos outros...

### Composables customizados:
- Automaticamente detectados da pasta `/composables`
- Qualquer função exportada que comece com `use`

## Hook de pre-commit (opcional)

Para executar automaticamente antes de cada commit:

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "bun scripts/update-biome-globals.mjs && npm run lint"
    }
  }
}
```

## Requisitos

- **Bun** instalado (`curl -fsSL https://bun.sh/install | bash`)
- Nuxt 3 project
- Biome configurado
