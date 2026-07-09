# Christye Biagio

Site estático em HTML, Tailwind CDN e JavaScript simples.

## Desenvolvimento

```bash
npm run dev
```

Abra `http://localhost:3000`.

Para testar a API de envio de e-mail localmente, use a Vercel CLI:

```bash
npm run dev:vercel
```

## Envio de resultados por e-mail

Os testes enviam os resultados para `/api/send-result`, sem Google Apps Script e sem Google Planilhas.

Configure as variáveis de ambiente na Vercel usando `.env.example` como referência:

- `RESULT_EMAIL_TO`: e-mail que recebe os resultados.
- `RESULT_EMAIL_FROM`: remetente exibido no e-mail.
- `RESEND_API_KEY`: chave da Resend.

Para validar o template:

```bash
npm run email:test
```

Com `.env.local` configurado, esse comando envia um e-mail real pelo Resend para `RESULT_EMAIL_TO`.

## Domínio

O projeto agora é exclusivo da Christye. Na Vercel, mantenha os domínios:

- `christyebiagio.com.br`
- `www.christyebiagio.com.br`

O `vercel.json` mantém compatibilidade com o caminho antigo `/t/christye`.
