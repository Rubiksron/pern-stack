import React, { Fragment, useEffect, useState } from 'react'

const ListTodos = () => {
  //setting the state object [] with the api results
  const [todos, setTodos] = useState([])

  const getTodos = async () => {
    try {
      //we want to await because this call will take a 'moment'
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
      console.log('jsonData: ', jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }
  //use effect will make a fetch each time the component is rendered, calling the above function
  useEffect(() => {
    getTodos();
  }, [])
  return (

    <Fragment>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

          {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map(todo => (
            <tr>
              <td>{todo.description}</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>)
}

export default ListTodos;