const express = require("express")
const api = express()
const {mongoClient, MongoClient} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()
const url = process.env.DATABASE_URL
const ObjectId = require("mongodb").ObjectId
const client = new MongoClient(url)
let collection

api.set("view engine","ejs")
api.use(express.urlencoded({extend:true}))
api.get("index",(req,res)=>{
    res.render(index.ejs)
})

//cadastrar um novo usuario

api.post("/show", async (req, res)=>{
    await collection.insertOne({
        nomeCompleto:req.body.nomeCompleto,
        email:req.body.email,
    })
    res.redirect("/show")
})

api.get("/show", async (req, res)=>{
    const registro = await collection.find().toArray()
    // visualizar o registro no Show.ejs
    res.render("show.ejs", {registro})
})

api.post("/edit/:id", async (req, res)=>{  //function do servidor
    await collection.updateOne({_id: new ObjectId(req.params.id)},  // Banco de dados
    {$set:{
        nomeCompleto:req.body.nome, 
        email:req.body.email}})
    res.redirect("/show")
})
// criar o servidor e iniciar o servido e o banco

async function iniciar(){
    await client.connect()
    const db = client.db("Extracurricular")
    collection = db.collection("usuarios")
    console.log("Conectou")

    api.listen(3000, ()=>{
        console.log("o servirdor está no ar")
    })
}

iniciar().catch(function(erro){
    console.log("Erro ao iniciar a aplicação: " + erro)
})

// Visualizar o editar

api.get("/edit/:id", async (req, res)=>{
    const registro = await collection.find({_id: new ObjectId(req.params.id)}).toArray()
}


//deletar um registro

api.get("/delete/:id", async (req, res)=>{
    await collection.deleteOne({_id: new ObjectId(req.params.id)})
    res.redirect("/show")
})
