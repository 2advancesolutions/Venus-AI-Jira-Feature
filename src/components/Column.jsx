import PropTypes from 'prop-types';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard.jsx';

function Column({ column, userLookup }) {
  return (
    <div className="column">
      <header className="column__header">
        <h2>{column.title}</h2>
        <span className="column__count">{column.tasks.length}</span>
      </header>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`column__dropzone${snapshot.isDraggingOver ? ' column__dropzone--active' : ''}`}
          >
            {column.tasks.length === 0 && !snapshot.isDraggingOver ? (
              <p className="column__empty">Drop tasks here</p>
            ) : null}

            {column.tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                assigneeName={task.assigneeId ? userLookup[task.assigneeId] : null}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  userLookup: PropTypes.object.isRequired,
};

export default Column;
