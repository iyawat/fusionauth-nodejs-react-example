import React, {Component} from 'react';
import ToDoList from '../ToDoList';

class ToDoListContainer extends Component {
  constructor() {
    super();
    this.state = { todos: [] };
  }

  componentDidMount() {
    // Make an API call to retrieve the list of ToDo items

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = (function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          this.setState({
            todos: response.data
          });
        } else if (xhr.status === 400) {
          console.info(JSON.stringify(xhr.responseText, null, 2));
        } else {

        }
      }
    }).bind(this);
    xhr.open('GET', 'http://localhost:8080/api/todos?userId=' + localStorage.userId, true);
    xhr.setRequestHeader('Authorization', 'JWT ' + localStorage.access_token);
    xhr.send();

  }

  render() {
    return <ToDoList todos={this.state.todos} />;
  }
}

export default ToDoListContainer;