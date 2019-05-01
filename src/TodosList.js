import React, { Component } from 'react';

class TodosList extends Component {
    
    render() {
       const {todos} = this.props
        return (
            <div>
                <table border="1" width="40%">
                <thead>
                <tr>
                    <th>Todo</th>
                    <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo=> 
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>Lat: {todo.todoLocation.lat} /{todo.todoLocation.lng} </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TodosList;