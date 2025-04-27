// src/components/Editor/SlashDropdown.jsx

import React from 'react';

const SlashDropdown = ({ results, onSelect, position }) => {
  if (!results.length) return null;

  return (
    <ul
      className="absolute bg-white border rounded shadow text-sm z-50 w-52"
      style={{ top: position.top, left: position.left }}
    >
      {results.map((cmd) => (
        <li
          key={cmd.id}
          onClick={() => onSelect(cmd)}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
        >
          <span>{cmd.icon}</span>
          <span>{cmd.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default SlashDropdown;
