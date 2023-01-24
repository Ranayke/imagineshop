import Mongoose from "../../db.js";

const userSchema = new Mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,  // Senha visível por fins didáticos
    },
    {
        collection: 'users',
        timestamps: true
    }
)

export default Mongoose.model('users', userSchema, 'users')