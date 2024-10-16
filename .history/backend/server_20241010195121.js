const express = require('express');
const app = express();
const port = 7000;
const mongoose = require("mongoose");
const cors = require("cors");
const Key = require("./models/key");
const Database = require("./models/database");

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/local", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const paragraphs = [
    "The sun rose over the horizon, casting a golden glow across the landscape. Birds chirped melodiously, welcoming the day. A gentle breeze rustled the leaves, creating a soothing symphony of nature. As the world awakened, the promise of new beginnings filled the air, inspiring hope and joy in every heart",
    "In the heart of the bustling city, a small café thrived amidst the chaos. Its warm ambiance and fragrant coffee drew people in. Patrons gathered, sharing stories and laughter, while the barista crafted artful lattes. This cozy haven offered a brief escape, a moment of connection in a fast-paced world",
    "The old library stood proudly, its shelves brimming with stories waiting to be discovered. Dust motes danced in the sunlight streaming through stained glass windows. Each book held a universe of adventure, wisdom, and imagination. Visitors wandered through the aisles, their hearts open to the magic of literature and knowledge",
    "On a secluded beach, waves lapped gently against the shore, whispering secrets of the deep. Seashells glistened in the sunlight, treasures waiting to be collected. Children built sandcastles, their laughter mingling with the sound of the ocean. This serene paradise offered a retreat from the world, a slice of tranquility",
    "Amidst the towering mountains, a hidden valley thrived with vibrant flora and fauna. Wildflowers painted the landscape in hues of purple, yellow, and red. The air was filled with the sweet scent of blooming petals. Nature's beauty flourished here, a testament to resilience and the delicate balance of life",
    "In a quaint village, life unfolded at a leisurely pace. Farmers tended to their fields, while artisans crafted handmade goods. Community gatherings were filled with joy, laughter, and storytelling. The bonds between neighbors were strong, creating a sense of belonging and unity that transcended the challenges of the outside world",
    "A curious cat prowled through the alleyways, its green eyes glinting in the moonlight. It explored every nook and cranny, seeking adventure in the shadows. The night was alive with sounds—the rustle of leaves, distant laughter, and the soft hum of city life. This feline spirit embodied freedom and curiosity",
    "The autumn leaves painted the ground in shades of gold and crimson, creating a beautiful tapestry. Children jumped into piles of leaves, their laughter echoing through the crisp air. The world felt alive with the scent of woodsmoke and the promise of cozy evenings spent by the fire with loved ones",
    "As the clock struck midnight, the city transformed into a realm of dreams. Neon lights flickered, casting a vibrant glow on the streets. Night owls roamed, seeking adventure in the nightlife. Musicians played soulful melodies, while laughter and chatter filled the air, creating an electric atmosphere of possibility and excitement",
    "In the heart of winter, snowflakes danced gracefully from the sky, blanketing the world in white. Children bundled up, their cheeks rosy from the cold, built snowmen and engaged in snowball fights. The beauty of the season lay in its stillness, inviting reflection and warmth within the comfort of home",
    "A gentle rain began to fall, pattering softly against the window. The scent of wet earth filled the air, evoking a sense of nostalgia. People scurried for shelter, their umbrellas blooming like flowers. In this moment, nature’s rhythm reminded everyone to pause, breathe, and find beauty in lifes simple pleasures",
    "Under the starry sky, a campfire crackled, illuminating the faces of friends gathered around. Stories of adventure and dreams were shared, laughter echoing into the night. The flickering flames cast shadows, creating a magical atmosphere. In this moment, bonds were strengthened, and memories were forged, woven into the fabric of time",
    "The old oak tree stood majestically in the park, its branches reaching for the sky. Children climbed its sturdy trunk, their laughter ringing out. Its roots were deep, grounding it in the earth, while its leaves whispered tales of seasons gone by. This tree was a witness to countless lives",
    "A bustling market came alive with colors, sounds, and aromas. Vendors called out, showcasing their fresh produce and handmade crafts. The air was rich with the scent of spices and baked goods. People mingled, sharing stories and recipes, fostering a sense of community that thrived on connection and culture",
    ""
];

app.get('/random-paragraph', (req, res) => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const randomParagraph = paragraphs[randomIndex];
    res.json(randomParagraph);
});

app.get('/login', async (req, res) => {
    try {
        const logins = await Key.find();
        res.json(logins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const userRecord = await Key.findOne({ userName, email });
        
        if (userRecord) {
            return res.status(400).json({ message: "User already registered" });
        }

        if (!userName || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }

        const newLogin = new Key({
            userName,
            email,
            password,
        });

        await newLogin.save();
        res.status(201).json(newLogin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/update_info', async (req, res) => {
    try {
        const data = await Database.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/check-user', async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const user = await Key.findOne({ userName: username });

        if (user) {
            return res.status(200).json( true );
        } else {
            return res.status(404).json(false);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while checking the user' });
    }
});

app.post('/update_info', async (req, res) => {
    const { username,email, wordTyped } = req.body;
    if (!username||!email || wordTyped<0) {
        return res.status(400).json('Username, email and word_typed are required' );
    }

    try {
        const updateUser = await Database.findOneAndUpdate(
            { username ,email},
            { $push: { words_typed: { word: wordTyped, timestamp: new Date() } } }, // Push object with word and timestamp
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json(updateUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating user info' });
    }
});






app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
