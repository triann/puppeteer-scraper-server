# 🚨 CORREÇÃO RÁPIDA - Deploy Falhou

O erro `npm ci` acontece porque não existe `package-lock.json`. Aqui está a solução:

## Opção 1: Gerar package-lock.json (RECOMENDADO)

1. No seu computador, entre na pasta `puppeteer-server`:
```bash
cd puppeteer-server
```

2. Delete `node_modules` se existir:
```bash
rm -rf node_modules
```

3. Gere o package-lock.json:
```bash
npm install
```

4. Faça commit dos novos arquivos:
```bash
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

5. No Railway, clique em "Redeploy" (botão com seta circular)

---

## Opção 2: Usar Dockerfile corrigido (JÁ CORRIGIDO)

O Dockerfile já foi atualizado para usar `npm install` ao invés de `npm ci`.

Basta fazer redeploy no Railway:
1. Vá no Railway
2. Clique no projeto `puppeteer-scraper-server`
3. Clique em "Redeploy" ou faça push novamente

---

## Opção 3: Usar nixpacks.toml (ALTERNATIVA)

Criei um arquivo `nixpacks.toml` que força o Railway a usar `npm install`.

Se o Dockerfile não funcionar, delete o `Dockerfile` e deixe apenas o `nixpacks.toml`:
```bash
rm Dockerfile
git add nixpacks.toml
git commit -m "Use nixpacks instead"
git push
```

---

## Verificar se funcionou

Após o deploy com sucesso, você verá:
- ✅ Status: "Running" (verde)
- ✅ Logs: "🚀 Puppeteer server running on port 3001"

Copie a URL pública (ex: `https://puppeteer-scraper-server-production.up.railway.app`) e teste:
```
https://SUA-URL.railway.app/
```

Deve retornar: `{"status":"ok","message":"Puppeteer Scraper Server is running"}`
