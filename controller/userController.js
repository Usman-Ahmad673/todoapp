const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../model/userModel')
const sendToken = require('../utils/jwtToken')
const jwt = require('jsonwebtoken');

//Register a User
exports.registerUser = catchAsyncError( async(req,res,next) => {
    
    const {name,password} = req.body
    const user = await User.create({
        name,password,
    })

    sendToken(user,201,res)
})


// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    // console.log(req.body);
    const { name, password } = req.body;

    if (!name || !password) {
        return next(new ErrorHandler("Please Enter Name & Password", 400));
    }

    const user = await User.findOne({ name });

    // console.log(user);
    // console.log(user._id);

    if (!user) {
        return next(new ErrorHandler("Invalid Name & Password", 401));
    }

    const isPasswordMatched = user.password === password;

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Name & Password", 401));
    }
    
    sendToken(user, 200, res);
});

// Add Todos
exports.addTodo = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.body.userId; // Assuming you have userId in your request
        const todo = req.body.todo;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.todos.push({ todo: todo });

        await user.save();

        res.status(200).json({
            success: true,
            todos: user.todos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

    // Get Todos
    exports.getTodo = catchAsyncError(async (req, res, next) => {
        // console.log('Todos');
        const userId = req.query.userId;
        const user = await User.findById(userId);
        // console.log(user);
        res.status(200).json({
            success: true,
            todos: user.todos,
        });
    });



// Update Todos
exports.updateTodo = async (req, res, next) => {
    try {
        // console.log(req.body.userId);
        const userId = req.body.userId;
        const todoId = req.body.todoId; 
        const updatedTodo = req.body.todo;
        const updatedTodoMarked = req.body.marked ? req.body.marked : false;
        // console.log(updatedTodo ? true : false);
        // console.log(updatedTodoMarked ? true : false);
        // console.log(req.body.marked);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const todoToUpdate = user.todos.id(todoId);
        if (!todoToUpdate) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }
        updatedTodo ? todoToUpdate.todo = updatedTodo : todoToUpdate.todo = todoToUpdate.todo
        todoToUpdate.marked = updatedTodoMarked;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            todos: user.todos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// Del Todo
exports.deleteTodo = async (req, res, next) => {
    try {
        // console.log(req.body.todoId);
        const userId = req.body.userId;
        const todoId = req.body.todoId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const todoIndex = user.todos.findIndex(todo => todo._id.toString() === todoId);
        if (todoIndex === -1) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }

        user.todos.splice(todoIndex, 1); 

        await user.save();

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            todos: user.todos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};