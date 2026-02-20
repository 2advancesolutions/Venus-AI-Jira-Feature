import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function TaskForm({ users, onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');

  useEffect(() => {
    if (users.length > 0 && !assigneeId) {
      setAssigneeId(users[0].id);
    }
  }, [users, assigneeId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTask({
      title: trimmedTitle,
      description: trimmedDescription,
      assigneeId,
    });

    setTitle('');
    setDescription('');
    setAssigneeId(users.length > 0 ? users[0].id : '');
  };

  return (
    <div className="panel">
      <header className="panel__header">
        <h2>Create Task</h2>
        <p>New tasks land in the Not Started lane ready for liftoff.</p>
      </header>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form__field">
          <span className="form__label">Task title</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ship release notes"
            required
          />
        </label>

        <label className="form__field">
          <span className="form__label">Details</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Optional context for your teammates"
            rows="3"
          />
        </label>

        <label className="form__field">
          <span className="form__label">Assignee</span>
          <select
            value={assigneeId}
            onChange={(event) => setAssigneeId(event.target.value)}
          >
            <option value="">Unassigned</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {users.length === 0 ? (
            <span className="form__hint">No teammates yet — add someone below.</span>
          ) : null}
        </label>

        <button type="submit" className="form__submit">
          Add task
        </button>
      </form>
    </div>
  );
}

TaskForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onAddTask: PropTypes.func.isRequired,
};

export default TaskForm;
