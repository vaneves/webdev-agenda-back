# Backend de Gerenciar Contatos

## Instalação

```
git clone https://github.com/vaneves/webdev-agenda-back.git contatos-back
```

```
cd contatos-back
```

```
npm install
```

## Executar a aplicação

```
npm start
```

Irá subir um servidor em http://localhost:3002/contatos

## Rotas

**Listar**

```
GET /contatos

[
    {
        "id": 1,
        "nome": "Luis",
        "telefone": "63984190000",
        "favorito": 0
    }
]
```

**Visualizar**

```
GET /contatos/{id}

{
    "id": 1,
    "nome": "Luis",
    "telefone": "63984190000",
    "favorito": 0
}
```

**Adicionar**

```
POST /contatos

{
    "nome": "Luis",
    "telefone": "63984190000"
}
```

**Editar**

```
PUT /contatos/{id}

{
    "nome": "Luis",
    "telefone": "63984190000"
}
```

**Adicionar/Remover dos Favoritos**

```
PATCH /contatos/{id}

{
    "favorito": 1
}
```

**Excluir**

```
DELETE /contatos/{id}
```