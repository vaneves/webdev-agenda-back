const express = require('express')
const db = require('./db')
const cors = require('cors')

const app = express()
const roteador = express.Router()

app.use(cors())
app.use(express.json())
app.use(roteador)

roteador.get('/contatos', (req, res) => {
  const contatos = db.all('SELECT * FROM contatos ORDER BY favorito DESC, nome ASC', (erro, contatos) => {
    if (erro) {
      console.error(erro)
      res.status(500).json({ mensagem: 'Ocorreu um erro interno' });
    } else {
      res.json(contatos)
    }
  })
})

roteador.get('/contatos/:id', (req, res) => {
  const { id } = req.params;
  const contato = db.get('SELECT * FROM contatos WHERE id = ?', [id], (erro, contato) => {
    if (erro) {
      console.error(erro)
      res.status(500).json({ mensagem: 'Ocorreu um erro interno' })
    } else if (contato) {
      res.json(contato)
    } else {
      res.status(404).json({ mensagem: 'Contato não encontrada' })
    }
  });
})

roteador.post('/contatos', (req, res) => {
  const { nome, telefone } = req.body;
  db.run('INSERT INTO contatos (nome, telefone, favorito) VALUES (?, ?, ?)', [nome, telefone, 0], (erro) => {
    if (erro) {
      console.error(erro)
      res.status(500).json({ mensagem: 'Ocorreu um erro interno' })
    } else {
      res.status(201).json({ id: this.lastID })
    }
  })
})

roteador.put('/contatos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, telefone } = req.body;
  db.run('UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?', [nome, telefone, id], (erro) => {
    if (erro) {
      console.error(erro)
      res.status(500).json({ mensagem: 'Ocorreu um erro interno' })
    } else {
      res.sendStatus(204)
    }
  })
})

roteador.patch('/contatos/:id', (req, res) => {
  const { id } = req.params;
  const { favorito } = req.body;
  db.run('UPDATE contatos SET favorito = ? WHERE id = ?', [favorito, id], (erro) => {
    if (erro) {
      console.error(erro)
      res.status(500).json({ mensagem: 'Ocorreu um erro interno' })
    } else {
      res.sendStatus(204)
    }
  })
})

roteador.delete('/contatos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM contatos WHERE id = ?', [id], (erro) => {
    if (erro) {
      console.error(erro)
      res.status(500).json({ mensagem: 'Ocorreu um erro interno' })
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(3002, () => {
  console.log('Servidor iniciado na porta 3002')
})