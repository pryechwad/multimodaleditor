import React from "react";

const MentionDropdown = ({ results, onSelect, position }) => {
  if (!results.length) return null;

  return (
    <ul
      className="absolute bg-white border rounded shadow text-sm z-50"
      style={{ top: position.top, left: position.left }}
    >
      {results.map((user) => (
        <li
          key={user.id}
          onClick={() => onSelect(user)}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <strong>@{user.name}</strong> — {user.role}
        </li>
      ))}
    </ul>
  );
};

export default MentionDropdown;