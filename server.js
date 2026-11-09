import express from 'express'
import path from 'path'
import Stripe from 'stripe'

const app = express()
const PORT = process.env.PORT || 3001
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_1234567890', {
  apiVersion: '2024-06-20',
})

app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'dist')))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ error: 'email e password sao obrigatorios' })
  }
  res.status(201).json({ message: 'user created', user: { name, email } })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ error: 'email e password sao obrigatorios' })
  }
  res.status(200).json({ message: 'login ok', user: { email } })
})

app.post('/api/payments/pix', (req, res) => {
  const { valor, email } = req.body || {}
  if (!valor) {
    return res.status(400).json({ error: 'valor obrigatorio' })
  }
  res.status(201).json({ message: 'pix gerado', valor, status: 'pendente' })
})

app.post('/api/payments/stripe', async (req, res) => {
  const { valor, email } = req.body || {}
  if (!valor) {
    return res.status(400).json({ error: 'valor obrigatorio' })
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(valor * 100),
      currency: 'BRL',
      payment_method_types: ['pix'],
      description: 'QuickMoney - pagamento via Pix',
      customer_email: email,
    })
    res.status(201).json({ message: 'payment_intent_created', clientSecret: paymentIntent.client_secret, status: paymentIntent.status })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`API QuickMoney rodando na porta ${PORT}`)
})
