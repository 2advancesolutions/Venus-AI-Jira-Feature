import { useMemo, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Board from './components/Board.jsx';
import TaskForm from './components/TaskForm.jsx';
import UserManager from './components/UserManager.jsx';
import './App.css';

const laneOrder = ['not-started', 'started', 'testing', 'complete'];

const laneTitles = {
  'not-started': 'Not Started',
  started: 'In Progress',
  testing: 'Testing',
  complete: 'Complete',
};

const generateId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 11);

const createInitialColumns = () =>
  laneOrder.reduce((acc, laneId) => {
    acc[laneId] = {
      id: laneId,
      title: laneTitles[laneId],
      tasks: [],
    };
    return acc;
  }, {});

function App() {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState(createInitialColumns);

  const userLookup = useMemo(() => {
    const lookup = {};
    users.forEach((user) => {
      lookup[user.id] = user.name;
    });
    return lookup;
  }, [users]);

  const handleAddUser = (name) => {
    setUsers((prev) => [
      ...prev,
      {
        id: generateId(),
        name,
      },
    ]);
  };

  const handleAddTask = ({ title, description, assigneeId }) => {
    setColumns((prev) => {
      const task = {
        id: generateId(),
        title,
        description,
        assigneeId: assigneeId || null,
      };

      const updatedColumn = {
        ...prev['not-started'],
        tasks: [...prev['not-started'].tasks, task],
      };

      return {
        ...prev,
        'not-started': updatedColumn,
      };
    });
  };

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    const { droppableId: sourceLane, index: sourceIndex } = source;
    const { droppableId: destLane, index: destIndex } = destination;

    if (sourceLane === destLane && sourceIndex === destIndex) {
      return;
    }

    setColumns((prev) => {
      const sourceColumn = prev[sourceLane];
      const destinationColumn = prev[destLane];

      const sourceTasks = Array.from(sourceColumn.tasks);
      const [movedTask] = sourceTasks.splice(sourceIndex, 1);

      if (sourceLane === destLane) {
        sourceTasks.splice(destIndex, 0, movedTask);

        return {
          ...prev,
          [sourceLane]: {
            ...sourceColumn,
            tasks: sourceTasks,
          },
        };
      }

      const destinationTasks = Array.from(destinationColumn.tasks);
      destinationTasks.splice(destIndex, 0, movedTask);

      return {
        ...prev,
        [sourceLane]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destLane]: {
          ...destinationColumn,
          tasks: destinationTasks,
        },
      };
    });
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Team Flowboard</h1>
        <p className="app-subtitle">
          Organize your squad across the delivery pipeline without breaking a sweat.
        </p>
      </header>

      <main className="app-main">
        <section className="control-panel">
          <UserManager users={users} onAddUser={handleAddUser} />
          <TaskForm users={users} onAddTask={handleAddTask} />
        </section>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Board
            columns={columns}
            laneOrder={laneOrder}
            userLookup={userLookup}
          />
        </DragDropContext>
      </main>
    </div>
  );
}

export default App;
