const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Utility function to format the user_id
const formatUserId = (fullName, dob) => {
    const formattedName = fullName.toLowerCase().replace(/ /g, '_');
    const formattedDob = dob.split('-').reverse().join(''); // Assuming dob is in dd-mm-yyyy format
    return `${formattedName}_${formattedDob}`;
};

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        console.log(data);

        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input data" });
        }

        // Separate numbers and alphabets
        const numbersArray = data.filter(item => !isNaN(item));
        const alphabetsArray = data.filter(item => isNaN(item));

        // Extract lowercase alphabets
        const lowercaseAlphabets = alphabetsArray.filter(char => char >= 'a' && char <= 'z');

        // Get the highest lowercase alphabet
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? 
                                          [lowercaseAlphabets.sort().reverse()[0]] : [];

        // Response object
        const response = {
            is_success: true,
            user_id: "Ashish_singh_10072002",  // Replace with actual user_id generation logic
            email: "as8239613@gmail.com",  // Replace with actual email from input or logic
            roll_number: "21BPS1497",  // Replace with actual roll number from input or logic
            numbers: numbersArray,
            alphabets: alphabetsArray,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1234 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
