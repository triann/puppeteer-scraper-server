# 🚀 Deploy do Servidor Puppeteer no Railway

## Passo 1: Preparar os arquivos
✅ Todos os arquivos já foram criados na pasta `puppeteer-server/`

## Passo 2: Criar conta no Railway
1. Acesse: https://railway.app
2. Clique em "Login" → "Login with GitHub"
3. Autorize o Railway a acessar seu GitHub

## Passo 3: Criar novo projeto
1. No dashboard do Railway, clique em "New Project"
2. Selecione "Deploy from GitHub repo"
3. Se não tiver repo ainda:
   - Crie um novo repositório no GitHub (ex: "puppeteer-scraper")
   - Faça upload da pasta `puppeteer-server/` para o repo
   - Volte ao Railway e selecione o repo criado

## Passo 4: Configurar o deploy
1. Railway vai detectar automaticamente o Dockerfile
2. Clique em "Deploy Now"
3. Aguarde o build (pode levar 3-5 minutos)

## Passo 5: Obter a URL do servidor
1. Após deploy concluir, clique no seu projeto
2. Clique na aba "Settings"
3. Em "Networking", clique em "Generate Domain"
4. Copie a URL gerada (ex: `https://seu-app.railway.app`)

## Passo 6: Testar o servidor
Abra no navegador:
```
https://seu-app.railway.app/scrape?url=https://www.airbnb.com.br/rooms/30303726
```

Se retornar um JSON com `"success": true` e um campo `html` grande, funcionou! ✅

## Passo 7: Configurar no v0
Adicione a URL do Railway como variável de ambiente no seu projeto v0:
- Nome: `PUPPETEER_SERVER_URL`
- Valor: `https://seu-app.railway.app`

## Custos
- Railway oferece $5 de crédito grátis por mês
- Este servidor consome aproximadamente $2-3/mês
- Totalmente gratuito para uso moderado!

## Problemas comuns

### Build falha com erro de memória
Solução: No Railway, vá em Settings → Resources → Aumente a RAM para 2GB

### Timeout ao scraping
Solução: Aumente o timeout no código (linha 52) de 30000 para 60000

### Railway hiberna após inatividade
Solução: Railway pode hibernar apps gratuitos. A primeira requisição após hibernação demora ~30s
