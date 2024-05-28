const Auth = require('../model/Authmodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');


const signup = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log(req.body);


        if (!email || !password || !role) {
            return res.status(400).json({ error: "Please fill in all the fields" });
        }


        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Please enter a valid email address" });
        }

    
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

   
        const newUser = await Auth.create({ email, password: hashedPassword, role, lastlogintime: Date.now(), online: true});

    
        const token = jwt.sign({ _id: newUser._id, role: newUser.role }, "Hello", { expiresIn: '3d' });

     
        res.status(200).json({ email: newUser.email, token, role: newUser.role });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log(req.body);
    
        if (!email || !password || !role) {
            return res.status(400).json({ error: "Please fill in all the fields" });
        }

       
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email not found" });
        }
    
       
        user.lastlogintime = Date.now();
        user.online = true;
        await user.save();

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        if (user.role !== role) {
            return res.status(400).json({ error: "Role does not match" });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, "Hello", { expiresIn: '3d' });

        res.status(200).json({ email: user.email, token, role: user.role });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(req.body);
        const user = await Auth.findOne({ email });
        if (user) {
            user.online = false;
            await user.save();
            console.log("User logged out successfully");
            return res.status(200).json({ message: "User logged out successfully" });
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ error: error.message });
    }
}


const admin = async (req, res) => {

    try {
        const users = await Auth.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error during admin:', error);
        res.status(500).json({ error: error.message });
    }

};

module.exports = { signup, login,logout,admin};
