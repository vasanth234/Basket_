
import {db} from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
  // Check if the user already exists by email or username
  const q = "SELECT * FROM user WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) {
          return res.status(500).json(err); // Return 500 for internal server errors
      }

      if (data.length) {
          return res.status(409).json("User already exists"); // Conflict if user already exists
      }

      // Hash the password before saving it to the database
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      // Insert the new user into the users table
      const query = "INSERT INTO user (`username`, `email`, `password`) VALUES (?, ?, ?)";
      const values = [
          req.body.username,
          req.body.email,
          hash
      ];

      db.query(query, values, (err, data) => {
          if (err) {
              return res.status(500).json(err); // Return 500 for any query execution errors
          }

          return res.status(201).json({ message: "User created successfully", userId: data.insertId });
          // Send the ID of the newly created user as a response
      });
  });
};
export const login = (req, res) => {
    const q = "SELECT * FROM user WHERE username=?";
    
    db.query(q, req.body.username, (err, data) => {
      if (err) return res.json(err);
  
      if (data.length === 0) {
        return res.status(404).json("User not found");
      }
  
      // Check if the password is correct
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
      if (!isPasswordCorrect) {
        return res.status(400).json("Wrong username or password");
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: data[0].id }, "jwtkey", { expiresIn: "1h" });
  
      // Destructure the user data to remove password
      const { password, ...userData } = data[0];
  
      // Set the token in an HttpOnly cookie and send user data along with token
      res.cookie("access_token", token, {
        httpOnly: true, // Cookie will not be accessible via JavaScript (for security reasons)
      }).status(200).json({ ...userData, token });  // Send the user data and token in the response
    });
  };
  
  export const logout = (req, res) => {
    res.clearCookie("access_token", {
      sameSite: "none",  // Same-site protection
      //secure: process.env.NODE_ENV === "production",  // Only in production for HTTPS
      secure:true
    }).status(200).json("User logged out successfully");
    
}