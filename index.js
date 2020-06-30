const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const pool = require('./server/db');

//middleware
app.use(cors());
app.use(express.json());

//serving static files
app.use(express.static(`${__dirname}/client/public`));
// ROUTES

//  CREATE A TODO
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    console.log('17-description: ', description);
    const VALUES = [description];
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', VALUES);
    res.json(newTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
})
// GET ALL TODOS 
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows)
  } catch (err) {
    console.error(err.message);
  }
})
// GET A TODO
app.get('/todos/:id', async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const VALUES = [id];
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', VALUES);
    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
})
// UPDATE A TODO
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const VALUES = [description, id];
    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", VALUES);
    res.json('todo was updated');
  } catch (err) {
    console.error(err.message);
  }
})
// DELETE A TODO

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const VALUES = [id];
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', VALUES);
    res.json('todo was deleted!');
  } catch (err) {
    console.error(err.message);
  }
})

app.listen(PORT, () => {
  console.log(`server has started on: ${PORT}`);
});
