import express from 'express'
import {join} from 'path';
const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(8080, () => {
  console.log("Start on port 8080.")
})

app.get('/html/old', (_, res) => {
  res.sendFile(join(__dirname, '../public/old.html'))
})

app.get('/html/new', (_, res) => {
  res.sendFile(join(__dirname, '../public/new.html'))
})

app.get('/api/old', (req: express.Request, res: express.Response) => {
  res.send({
    "glossary": {
      "title": "example glossary",
      "GlossDiv": {
        "title": "S",
        "GlossList": {
          "GlossEntry": {
            "ID": "SGML",
            "SortAs": "SGML",
            "GlossTerm": "Standard Generalized Markup Language",
            "Acronym": "SGML",
            "Abbrev": "ISO 8879:1986",
            "GlossDef": {
              "para": "A meta-markup language, used to create markup languages such as DocBook.",
              "GlossSeeAlso": ["GML", "XML"]
            },
            "GlossSee": "markup"
          }
        }
      }
    }
  })
})

app.get('/api/new', (req: express.Request, res: express.Response) => {
  res.send({
    "glossary": {
      "GlossDiv": {
        "title": "X",
        "GlossList": {
          "GlossEntry": {
            "ID": "SGML",
            "SortAs": "SGML",
            "GlossTerm": "Standard Generalized Markup Language",
            "Acronym": "SGML",
            "Abbrev": "ISO 8879:7821",
            "GlossDef": {
              "para": "A meta-markup language, used to create markup languages such as DocBook.",
              "GlossSeeAlso": ["JSON", "XML"]
            },
            "GlossSee": "markup !!"
          }
        }
      },
      "title": "example glossary",
    }
  })
})
