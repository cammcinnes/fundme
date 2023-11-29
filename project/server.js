const express = require('express');
const appController = require('./appController');
const authRoutes = require('./routes/auth');
const projectsRoutes = require('./routes/projects');
const postRoutes = require('./routes/posts');
const paymentRoutes = require('./routes/payment');
const projectionRoutes = require('./routes/projection');
const orgRoutes = require('./routes/organization');
const joinRoutes= require('./routes/join');
const selectionRoutes = require('./routes/selection');
const aggregationRoutes = require('./routes/aggregation');
const aggregationHavingRoutes = require('./routes/aggregation-having');
const cors = require('cors');

// Load environment variables from .env file
// Ensure your .env file has the required database credentials.
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');

const app = express();
const PORT = envVariables.PORT || 65534;  // Adjust the PORT if needed (e.g., if you encounter a "port already occupied" error)

// Middleware setup
app.use(express.static('public'));  // Serve static files from the 'public' directory
app.use(express.json());             // Parse incoming JSON payloads
app.use(cors());

// If you prefer some other file as default page other than 'index.html',
//      you can adjust and use the bellow line of code to
//      route to send 'DEFAULT_FILE_NAME.html' as default for root URL
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/DEFAULT_FILE_NAME.html');
// });


// mount the router (ORDER MATTERS HERE!!! if you have '/a' before '/a/b' then /a/b will never be hit!. Put '/a/b' before /a
app.use('/auth', authRoutes);
app.use('/projects', projectsRoutes);
app.use('/projection', projectionRoutes);
app.use('/posts', postRoutes);
app.use('/payment', paymentRoutes);
app.use('/organization', orgRoutes);
app.use('/join', joinRoutes);
app.use('/selection', selectionRoutes);
app.use('/aggregation', aggregationRoutes);
app.use('/aggregation-having', aggregationHavingRoutes);
app.use('/', appController);

// ----------------------------------------------------------
// Starting the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

