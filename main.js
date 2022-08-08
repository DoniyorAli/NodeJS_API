const PORT = 5000

const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.json("server is running")
})

let inMemoryData = {
    contacts: []
}

// CRUD
// CREATE contact
app.post('/api/contact', (req, res) => {
    let body = req.body
    if (!body.firstname) {
        res.status(400);
        res.send(`Enter your firstname!`);
        return
    }

    if (!body.lastname) {
        res.status(400);
        res.send(`Enter your lastname!`);
        return
    }

    if (!body.phone) {
        res.status(400);
        res.send(`You must enter phone number!`);
        return
    }

    for (let i = 0; i < inMemoryData.contacts.length; i++) {
        const element = inMemoryData.contacts[i];
        if (element.id == body.id) {
            res.status(400).send(`This ID-->${body.id} already has`);
            return
        }
    }

    body.createAt = new Date()
    inMemoryData.contacts.push(body)
    res.status(201).send("Succsfuly created") // <--- bu korinishda ham yozsa boladi!
})

// READ contact(s)
app.get('/api/contact', (req, res) => {
    if (inMemoryData.contacts.length <= 0) {
        res.status(404).send("Contact resources not found!")
        return
    }
    res.json(inMemoryData.contacts)
})

// get a contact
app.get('/api/contact/:id', (req,res) => {
    let id = req.params.id

    let contact = inMemoryData.contacts.find(element => element.id == id)
    if (!contact) {
        res.status(400).send("contact resource not found!")
        return
    }
    res.status(200).json(contact)
})

// UPDATE contact
app.put('/api/contact', (req, res) => {
    let body = req.body
    let contact = inMemoryData.contacts.find(element => element.id == body.id)

    if (!contact) {
        res.status(400).send(`ID is not found`);
        return
    }

    for (let i = 0; i < inMemoryData.contacts.length; i++) {
        const element = inMemoryData.contacts[i];
        if (element.id == body.id) {
            body.createAt = inMemoryData.contacts[i].createAt
            body.updateAt = new Date()
            inMemoryData.contacts[i] = body
            break;
        }
    }
    res.status(200).send("Contact is updating")
})

// DELETE CONTACT
app.delete('/api/contact/:id', (req, res) => {
    let id = req.params.id
    let contact = inMemoryData.contacts.find(element => element.id == id)

    if (!contact) {
        res.status(400).send(`ID is not found`);
        return
    }

    inMemoryData.contacts = inMemoryData.contacts.filter(element => element.id != id)

    res.send("Succesfully deleted")
})

app.listen(PORT, () => {
    console.log(`Server has started on ${PORT}`)
})