const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const USER_INFO = {
    full_name: "Shrivatsa_Indra_Guru",
    birth_date: "26082004",
    email: "shrivatsaindra77@gmail.com",
    roll_number: "22BCE0636"
};

function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function isSpecialCharacter(str) {
    return !/^[a-zA-Z0-9]+$/.test(str);
}

function createAlternatingCaps(alphabets) {
    const concatenated = alphabets.join('').split('').reverse();
    let result = '';
    
    for (let i = 0; i < concatenated.length; i++) {
        if (i % 2 === 0) {
            result += concatenated[i].toLowerCase();
        } else {
            result += concatenated[i].toUpperCase();
        }
    }
    
    return result;
}

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input: data should be an array"
            });
        }

        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;

        data.forEach(item => {
            const itemStr = String(item);
            
            if (isNumber(itemStr)) {
                const num = parseInt(itemStr);
                sum += num;
                
                if (num % 2 === 0) {
                    evenNumbers.push(itemStr);
                } else {
                    oddNumbers.push(itemStr);
                }
            } else if (isAlphabet(itemStr)) {
                alphabets.push(itemStr.toUpperCase());
            } else if (isSpecialCharacter(itemStr)) {
                specialCharacters.push(itemStr);
            }
        });

        const concatString = createAlternatingCaps(alphabets);

        const response = {
            is_success: true,
            user_id: `${USER_INFO.full_name}_${USER_INFO.birth_date}`,
            email: USER_INFO.email,
            roll_number: USER_INFO.roll_number,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(),
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            message: "Internal server error"
        });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;