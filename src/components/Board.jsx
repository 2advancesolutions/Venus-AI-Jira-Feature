import PropTypes from 'prop-types';
import Column from './Column.jsx';
import './Board.css';

function Board({ columns, laneOrder, userLookup }) {
  return (
    <section className="board">
      {laneOrder.map((laneId) => (
        <Column
          key={laneId}
          column={columns[laneId]}
          userLookup={userLookup}
        />
      ))}
    </section>
  );
}

Board.propTypes = {
  columns: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      tasks: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  laneOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  userLookup: PropTypes.object.isRequired,
};

export default Board;
