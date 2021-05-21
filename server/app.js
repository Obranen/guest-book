const express = require('express')
const path = require('path')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = config.get('serverPort')

app.use(express.json())
app.use('/api', require('./routes/comment.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
  })
}

async function start() {
  try {
    await mongoose.connect(config.get('dbUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    app.listen(PORT, () => console.log(`server started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error:', e.message)
    process.exit(1)
  }
}

start()