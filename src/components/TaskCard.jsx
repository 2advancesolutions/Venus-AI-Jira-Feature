import PropTypes from 'prop-types';
import { Draggable } from '@hello-pangea/dnd';

function TaskCard({ task, index, assigneeName }) {
  const initials = assigneeName
    ? assigneeName
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '??';

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <article
          className={`task-card${snapshot.isDragging ? ' task-card--dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-card__title-row">
            <h3>{task.title}</h3>
            <span className={`task-card__avatar${assigneeName ? '' : ' task-card__avatar--unassigned'}`}>
              {initials}
            </span>
          </div>
          {task.description && <p className="task-card__description">{task.description}</p>}
          <footer className="task-card__footer">
            <span className="task-card__assignee">
              {assigneeName ? assigneeName : 'Unassigned'}
            </span>
          </footer>
        </article>
      )}
    </Draggable>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    assigneeId: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  assigneeName: PropTypes.string,
};

TaskCard.defaultProps = {
  assigneeName: null,
};

export default TaskCard;
