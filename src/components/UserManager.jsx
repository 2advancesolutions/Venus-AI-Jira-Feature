import { useState } from 'react';

function UserManager({ users, onAddUser }) {
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      onAddUser(userName.trim());
      setUserName('');
    }
  };

  return (
    <div className="user-manager">
      <h2>Team Members</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter team member name"
          className="user-input"
        />
        <button type="submit" className="btn-add-user">
          Add Member
        </button>
      </form>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManager;
