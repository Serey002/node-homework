import UserModel from "../models/UserModel.js";

class UserController {

    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.getAllUsers();

            res.json({
                list: users
            })

        } catch (error) {
            res.status(500).json({
                err: true,
                message: error.message
            });
        }
    }

    //Get user by id
    async getUserById(req, res) {
        
        const { id } = req. params;
        const user = await UserModel.getUserById(id);
    
        res.json({
            user
        });
    }

    // Create user
    async createUser(req, res) {
        try {
            const data = req.body;
            const result = await UserModel.createUser(data);
            
            res.json({
                message: "User created successfully",
                id: result.insertId
            });
        } catch (error) {
            res.status(500).json({
                err: true,
                message: error.message
            });
        }
    }
    
    // Update user
    async updateUser(req, res){
        try {
            const { id } = req.params;
            const data = req.body;
            await UserModel.updateUser(id, data);
            res.json({
                message: "User updated successfully"
            });
        } catch (error) {
            res.status(500).json({
                err: true,
                message: error.message
            });
        }
    }

    // Delete user
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await UserModel.deleteUser(id);
            res.json({
                message: "User deleted successfully"
            });
        } catch (error) {
            res.status(500).json({
                err: true,
                message: error.message
            });
        }
    }
}

export default new UserController();
