const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.get('/boards', async (req, res) => {
    try {
        const boards = await prisma.board.findMany();
        res.status(200).json(boards);
    } catch (error) {
        console.error('Error fetching boards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/boards', async (req, res) => {
    const { title, category, author } = req.body;
    let imageURL = 'https://via.placeholder.com/150'
    try {
        const apiKey = process.env.GIPHY_API_KEY;
        const image = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=g`;
        try {
            const response = await fetch(image);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            imageURL = data.data.images.original.url;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        const newBoard = await prisma.board.create({
            data: {
                title,
                category,
                author,
                imageURL,
            },
        });
        res.status(201).json(newBoard);
    } catch (error) {
        console.error('Error creating board:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/boards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBoard = await prisma.board.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json(deletedBoard);
    } catch (error) {
        console.error('Error deleting board:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/boards/:id/cards', async (req, res) => {
    const { id } = req.params;
    const { message, gifUrl, textMessage, isSigned } = req.body;
    try {
        const newCard = await prisma.card.create({
            data: {
                message,
                gifUrl,
                textMessage,
                isSigned,
                upvotes: 0,
                boardId: parseInt(id),
            },
        });
        res.status(201).json(newCard);
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/cards/:id/upvote', async (req, res) => {
    const { id } = req.params;
    try {
        const card = await prisma.card.update({
            where: { id: parseInt(id) },
            data: {
                upvotes: {
                    increment: 1,
                },
            },
        });
        res.status(200).json(card);
    } catch (error) {
        console.error('Error upvoting card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/boards/:id/cards', async (req, res) => {
    const { id } = req.params;
    try {
        const cards = await prisma.card.findMany({
            where: { boardId: parseInt(id) },
        });
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/boards/:boardId/cards/:cardId', async (req, res) => {
    const { boardId, cardId } = req.params;
    try {
        const deletedCard = await prisma.card.delete({
            where: { id: parseInt(cardId) },
        });
        res.status(200).json(deletedCard);
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/boards/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Requested board ID:", id);
    if (!id) {
        return res.status(400).json({ error: 'No ID provided' });
    }
    try {
        const board = await prisma.board.findUnique({
            where: { id: parseInt(id) },
            include: {
                cards: true,
            },
        });
        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }
        res.status(200).json(board);
    } catch (error) {
        console.error('Error fetching board:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
