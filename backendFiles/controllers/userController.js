const db = require("../config/db");
const bcrypt = require("bcrypt");

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            age,
            address,
            location,
            fatherName,
            phone,
            cityPin,
            cityName,
            email,
            password
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users
            (first_name, middle_name, last_name, age, address, location, father_name,
             phone, city_pin, city_name, photo, email, password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            firstName || null,
            middleName || null,
            lastName || null,
            age || null,
            address || null,
            location || null,
            fatherName || null,
            phone || null,
            cityPin || null,
            cityName || null,
            req.file ? req.file.filename : null,
            email,
            hashedPassword
        ];

        db.query(sql, values, (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "User Registered Successfully" });
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

/* ================= LOGIN ================= */
exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.length === 0)
                return res.status(401).json({ message: "User not found" });

            const match = await bcrypt.compare(password, result[0].password);
            if (!match)
                return res.status(401).json({ message: "Wrong password" });

            res.json({ message: "Login successful", email });
        }
    );
};

exports.profile = (req, res) => {
    const { email } = req.params;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.length === 0)
                return res.status(404).json({ message: "User not found" });

            res.json({ message: "Successful", result });
        }
    );
};
