// modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors')

// app instance
const app = express();

// middleware
app.use(express.json());
app.use(cors())

// static files
app.use(express.static(path.join(__dirname, 'public')));

// database connect
mongoose.connect("mongodb+srv://deepakducat:deepakducat@ecommerce.8hfrk6p.mongodb.net/")
        .then(() => {
            console.log("database connection established");
        })
        .catch(err => {
            console.log(err);
        })

// routes
const frontRoutes = require('./routes/front/front.route');
const adminRoutes = require('./routes/admin/admin.route');

app.use("/api/admin", adminRoutes);
app.use("/api", frontRoutes);

// static files
app.use(express.static(path.join(__dirname, 'build')));

// PORT
const PORT = process.env.PORT || 8000;

// server listen
app.listen(PORT, function() {
    console.log("server listening on port " + PORT);
})