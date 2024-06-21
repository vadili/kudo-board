const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json()); // Use bodyParser to parse JSON bodies

// CRUD for Boards

// Get all boards
app.get('/boards', async (req, res) => {
    try {
        const boards = await prisma.board.findMany();
        res.status(200).json(boards);
    } catch (error) {
        console.error('Error fetching boards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new board
app.post('/boards', async (req, res) => {
    const { title, category, author, image } = req.body;
    try {
        // Example of integrating with an external API (Giphy) to fetch random GIFs
        const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}`);
        const gifData = await giphyResponse.json();
        const imageURL = gifData.data.images.original.url;

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

// Delete a board by ID
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

// CRUD for Cards

// Create a new card for a specific board
app.post('/boards/:id/cards', async (req, res) => {
    const { id } = req.params;
    const { title, description, upvote, imageUrl, author } = req.body;
    try {
        const newCard = await prisma.kudoCard.create({
            data: {
                title,
                description,
                upvote,
                imgUrl: imageUrl,
                author,
                board: { connect: { id: parseInt(id) } },
            },
        });
        res.status(201).json(newCard);
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all cards for a specific board
app.get('/boards/:id/cards', async (req, res) => {
    const { id } = req.params;
    try {
        const cards = await prisma.kudoCard.findMany({
            where: { boardId: parseInt(id) },
        });
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a card by ID
app.delete('/cards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCard = await prisma.kudoCard.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json(deletedCard);
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific board by ID
app.get('/boards/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Requested board ID:", id);
    if (!id) {
        return res.status(400).json({ error: 'No ID provided' });
    }
    try {
        const board = await prisma.board.findUnique({
            where: { id: parseInt(id) },
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
