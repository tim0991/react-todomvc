import React from 'react';
import './base.css';
import './index.css';
import { onEnter } from './utils';

import TodoItem from './TodoItem';

function filterTodos(todos, tab) {
  const filter = {
    all: () => todos,
    active: () => todos.filter((e) => !e.completed),
    completed: () => todos.filter((e) => e.completed),
  };

  return filter[tab]();
}

export default class App extends React.Component {
  state = {
    todos: [
      {
        id: 1,
        completed: true,
        name: '吃早饭',
      },
      {
        id: 2,
        completed: false,
        name: '健身',
      },
      {
        id: 3,
        completed: true,
        name: '刷牙洗脸',
      },
      {
        id: 4,
        completed: false,
        name: '吃中饭',
      },
    ],
    tab: 'all',
    editingId: 0,
  };

  get remains() {
    const { todos } = this.state;
    return todos.filter((e) => !e.completed).length;
  }

  get nextId() {
    const { todos } = this.state;
    const ids = todos.map((e) => e.id);
    return Math.max(...ids) + 1;
  }

  get allCompleted() {
    return this.remains === 0;
  }

  set allCompleted(val) {
    let { todos } = this.state;
    todos = todos.map((e) => {
      e.completed = val;
      return e;
    });

    this.setState({
      todos,
    });
  }

  newTodo = (e) => {
    const { todos } = this.state;
    todos.push({
      id: this.nextId,
      name: e.target.value,
      completed: false,
    });

    this.setState({
      todos,
    });
  }

  handleComplete = (todo) => {
    const { todos } = this.state;
    const index = todos.indexOf(todo);
    todos[index].completed = !todos[index].completed;
    this.setState({
      todos,
    });
  }

  handleDelete = (todo) => {
    const { todos } = this.state;
    const index = todos.indexOf(todo);
    todos.splice(index, 1);

    this.setState({
      todos,
    });
  }


  deleteCompleted = () => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter((e) => !e.completed),
    });
  }

  setTab = (tab) => {
    this.setState({
      tab,
    });
  }

  handleEdit = (e, todo) => {
    this.setState({
      editingId: todo.id,
    });
  }

  handleUpdate = (e) => {
    const { todos, editingId } = this.state;

    const index = todos.findIndex((el) => el.id === editingId);
    todos[index].name = e.target.value;

    this.setState({
      editingId: 0,
      todos,
    });
  }

  handleUpdateDone = () => {
    this.setState({
      editingId: 0,
    });
  }

  render() {
    const { todos, tab, editingId } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What needs to be Completed?" autoFocus onKeyUp={(e) => onEnter(e, this.newTodo)} />
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" checked={this.allCompleted ? 'checked' : false} onChange={() => { this.allCompleted = !this.allCompleted; }} />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {filterTodos(todos, tab).map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                editing={editingId === todo.id}
                onEdit={this.handleEdit}
                onUpdate={this.handleUpdate}
                onUpdateDone={this.handleUpdateDone}
                onComplete={this.handleComplete}
                onDelete={this.handleDelete}
              />
            ))}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{this.remains}</strong>
            item left
          </span>
          <ul className="filters">
            {['all', 'active', 'completed'].map((e) => (
              <li key={e}>
                <a className={tab === e ? 'selected' : ''} onClick={() => { this.setTab(e); }}>{e}</a>
              </li>
            ))}
          </ul>
          {filterTodos(todos, 'completed').length > 0 && <button type="button" className="clear-completed" onClick={this.deleteCompleted}>Clear completed</button>}
        </footer>
      </section>
    );
  }
}
