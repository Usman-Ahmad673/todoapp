const express = require('express')
const { loginUser, addTodo, updateTodo, getTodo, registerUser, deleteTodo } = require('../controller/userController')


const router = express.Router()



router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/addTodo').post(addTodo); 
router.route('/getTodos').get(getTodo); 
router.route('/updateTodo').put(updateTodo); 
router.route('/deleteTodo').delete(deleteTodo); 


module.exports = router