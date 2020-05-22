import React from 'react';
import PropTypes from 'prop-types';
import { onEnter } from './utils';


// 只封装一个组件感受一下react component style

function TodoItem(props) {
  const {
    todo, editing, onEdit, onUpdate, onUpdateDone, onComplete, onDelete,
  } = props;


  return (
    <li key={todo.id} className={`${todo.completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={todo.completed ? 'checked' : false} onChange={() => onComplete(todo)} />
        <label onDoubleClick={(e) => onEdit(e, todo)}>{todo.name}</label>
        <button type="button" className="destroy" onClick={() => onDelete(todo)} />
      </div>
      { editing && (
        <input
          className="edit"
          defaultValue={todo.name}
          autoFocus
          onKeyDown={(e) => onEnter(e, onUpdate)}
          onBlur={onUpdateDone}
        />
      )}
    </li>
  );
}


TodoItem.defaultProps = {
  todo: {},
  editing: false,
};

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.any.isRequired),
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onUpdateDone: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};


export default TodoItem;
