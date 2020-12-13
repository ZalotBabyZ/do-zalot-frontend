import React from 'react';

function NavProject(props) {
  const position = window.innerWidth <= 500 ? 'top' : 'side';
  return <div>{position}</div>;
}

export default NavProject;
