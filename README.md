# 📝 Guia Completo de Deploy - Servidor Puppeteer

## 🎯 O que este servidor faz?
Este servidor roda Puppeteer (navegador automatizado) que acessa o Airbnb, espera o JavaScript carregar os preços, e retorna o HTML completo renderizado para nosso scraper extrair os dados.

---

## 📋 PASSO A PASSO COMPLETO

### **Passo 1: Preparar os arquivos**
✅ Os arquivos já foram criados na pasta `puppeteer-server/`

Arquivos criados:
- `index.js` - Servidor Express com Puppeteer
- `package.json` - Dependências do projeto
- `Dockerfile` - Container Docker para deploy
- `railway.json` - Configuração do Railway
- `.gitignore` - Arquivos ignorados pelo Git

---

### **Passo 2: Criar repositório no GitHub**

1. Vá para https://github.com/new
2. Nome do repositório: `puppeteer-scraper-server`
3. Deixe como **Público** (ou Privado se preferir)
4. Clique em **"Create repository"**
5. No seu computador, abra o terminal na pasta `puppeteer-server/`
6. Execute os comandos:

```bash
git init
git add .
git commit -m "Initial commit - Puppeteer scraper server"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/puppeteer-scraper-server.git
git push -u origin main
```

---

### **Passo 3: Criar conta no Railway**

1. Acesse: **https://railway.app**
2. Clique em **"Login"**
3. Selecione **"Login with GitHub"**
4. Autorize o Railway a acessar seu GitHub
5. Confirme seu email se solicitado

---

### **Passo 4: Criar novo projeto no Railway**

1. No dashboard do Railway, clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Clique em **"Configure GitHub App"** se necessário
4. Selecione o repositório **`puppeteer-scraper-server`**
5. Railway começará o deploy automaticamente

---

### **Passo 5: Aguardar o build**

1. Você verá logs aparecendo na tela
2. O build pode levar **3-8 minutos** (é normal!)
3. Procure por mensagens como:
   - `Building Dockerfile...`
   - `Installing dependencies...`
   - `🚀 Puppeteer server running on port 3001`
4. Quando ver **"Deploy successful"**, está pronto! ✅

---

### **Passo 6: Gerar URL pública**

1. No seu projeto do Railway, clique na aba **"Settings"**
2. Role até a seção **"Networking"**
3. Clique em **"Generate Domain"**
4. Uma URL será gerada automaticamente (ex: `https://puppeteer-scraper-server-production-abc123.up.railway.app`)
5. **COPIE ESSA URL** - você vai precisar dela!

---

### **Passo 7: Testar o servidor**

1. Abra uma nova aba do navegador
2. Cole a URL copiada e adicione `/scrape?url=https://www.airbnb.com.br/rooms/30303726`
3. Exemplo completo:
   ```
   https://seu-app.railway.app/scrape?url=https://www.airbnb.com.br/rooms/30303726
   ```
4. Você deve ver um JSON com:
   ```json
   {
     "success": true,
     "html": "<!DOCTYPE html>...",
     "url": "https://www.airbnb.com.br/rooms/30303726",
     "length": 1234567
   }
   ```
5. Se vir isso, **funcionou perfeitamente!** ✅

---

### **Passo 8: Configurar no v0**

1. No v0, vá na seção **"Vars"** (variáveis de ambiente)
2. Adicione uma nova variável:
   - **Nome:** `PUPPETEER_SERVER_URL`
   - **Valor:** A URL do Railway que você copiou (SEM a parte `/scrape?url=...`)
   - Exemplo: `https://seu-app.railway.app`
3. Clique em **"Save"** ou **"Add"**

---

### **Passo 9: Testar a integração**

1. No v0, vá para a página de importação do Airbnb
2. Cole uma URL de imóvel do Airbnb
3. Clique em **"Extrair Dados"**
4. Verifique os logs no console do navegador (F12)
5. Você deve ver:
   ```
   [v0] 🚀 Using Puppeteer server: https://seu-app.railway.app
   [v0] ✓ Puppeteer server returned HTML: 1234567 chars
   [v0] [PRICE] ✓✓✓ FOUND! Price: R$482
   ```
6. **O preço deve ser extraído com sucesso!** 🎉

---

## 💰 Custos e Limites

### Railway Free Tier
- **$5 de crédito grátis por mês**
- **500 horas de execução gratuitas**
- Este servidor consome aproximadamente **$2-3/mês**
- **Totalmente gratuito para 100-200 scrapes/dia**

### O que acontece se acabar o crédito?
- Railway pausa o app automaticamente
- Você pode adicionar um cartão de crédito para continuar
- Cobrança: ~$0.01 por hora de uso

---

## 🔧 Problemas Comuns e Soluções

### ❌ Build falha com "Out of memory"
**Solução:**
1. No Railway, vá em **Settings → Resources**
2. Aumente a **RAM** para **2GB** ou **4GB**
3. Clique em **"Redeploy"**

### ❌ Timeout ao fazer scraping (demora muito)
**Solução:**
No arquivo `index.js`, linha 52, aumente o timeout:
```javascript
timeout: 60000, // Era 30000, agora é 60 segundos
```
Faça commit e push para atualizar.

### ❌ Railway hiberna após inatividade
**O que acontece:**
- Apps gratuitos podem hibernar após 10-15 minutos sem uso
- A primeira requisição após hibernação demora ~30 segundos para "acordar"

**Solução:**
- Isso é normal para apps gratuitos
- Ou adicione um cron job que pinga o servidor a cada 5 minutos
- Ou faça upgrade para plano pago do Railway ($5/mês)

### ❌ Erro "Puppeteer server failed"
**Possíveis causas:**
1. URL do Railway está incorreta na variável de ambiente
2. Servidor ainda está fazendo build/deploy
3. Railway ficou sem créditos

**Como verificar:**
1. Abra a URL do Railway no navegador (deve mostrar "status": "ok")
2. Verifique os logs no dashboard do Railway
3. Confirme que a variável `PUPPETEER_SERVER_URL` está correta no v0

### ❌ Não extrai o preço mesmo com Puppeteer
**Debug:**
1. Verifique se os logs mostram "Using Puppeteer server"
2. Verifique se o HTML retornado tem mais de 500KB (deve ter ~1-2MB)
3. Adicione mais tempo de espera no `index.js`:
   ```javascript
   await page.waitForTimeout(5000); // Aumentar de 3000 para 5000
   ```

---

## 📊 Monitoramento

### Ver logs do servidor:
1. No dashboard do Railway, clique no seu projeto
2. Clique em **"Deployments"**
3. Clique no deployment ativo
4. Veja os logs em tempo real

### Verificar uso de recursos:
1. No Railway, vá em **"Metrics"**
2. Veja CPU, RAM e uso de rede
3. Monitore os créditos restantes no topo da página

---

## ✅ Checklist Final

- [ ] Repositório GitHub criado com os arquivos
- [ ] Conta Railway criada e conectada ao GitHub
- [ ] Deploy realizado com sucesso (sem erros)
- [ ] URL pública gerada pelo Railway
- [ ] Teste da URL funcionando (`/scrape?url=...`)
- [ ] Variável `PUPPETEER_SERVER_URL` adicionada no v0
- [ ] Importação de teste com extração de preço funcionando

---

## 🎉 Pronto!

Agora você tem um servidor Puppeteer gratuito rodando no Railway que extrai preços do Airbnb automaticamente! 

Qualquer dúvida, revise este guia ou verifique os logs do Railway para diagnosticar problemas.
