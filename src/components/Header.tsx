import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import CreateTaskModal from './CreateTaskModal';

export default function Header() {

  const location = useLocation();
  const isActive = (path: any) => location.pathname === path;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 1  }}>
            <Button 
              sx={{ backgroundColor: isActive('/issues') ?  '#70270a' : '#0a6d70',
              }} variant='contained' component={Link} to="/issues" color="inherit">
                Tasks
            </Button>
            <Button sx={{ backgroundColor: isActive('/boards') ?  '#70270a' : '#0a6d70',
              }} variant='contained' component={Link} to="/boards" color="inherit">
                Boards
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button sx={{ backgroundColor: '#0a6d70'}} variant='contained' color="inherit" onClick={() => setModalOpen(true)}>Create Task</Button>
        </Toolbar>
      </AppBar>
      <CreateTaskModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
