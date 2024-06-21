const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json()); // Use bodyParser to parse JSON bodies

// CRUD for Boards

// To get all the boards from the database
app.get('/boards', async (req, res) => {
    try {
        const boards = await prisma.board.findMany();
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// To post boards to the database
app.post('/boards', async (req, res) => {
    const { title, category, author, image } = req.body;
    try {
        const newBoard = await prisma.board.create({
            data: {
                title,
                category,
                author,
                image
            }
        });
        res.status(201).json(newBoard);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// To delete boards from the database
app.delete('/boards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBoard = await prisma.board.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json(deletedBoard);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
