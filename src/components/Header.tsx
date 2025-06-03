import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CreateTaskModal from './CreateTaskModal';

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} to="/issues" color="inherit">Tasks</Button>
          <Button component={Link} to="/boards" color="inherit">Boards</Button>
          <Button color="inherit" onClick={() => setModalOpen(true)}>Create Task</Button>
        </Toolbar>
      </AppBar>
      <CreateTaskModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}