import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Modal,
  Drawer,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Task } from '../types';

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   priority: string;
//   status: string;
//   assignee: number;
//   boardId: number;
// }

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task?: Task;
  mode: 'view' | 'edit' | 'create';
  onSave: (taskData: Partial<Task>) => void;
}

const TaskModal = ({ open, onClose, task, mode, onSave }: TaskModalProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isBoardPage = location.pathname.includes('/board');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Backlog',
    assigneeName: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        assigneeName: task.assignee.fullName,
      });
    }
  }, [task]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  const goToBoard = () => {
    if (task) {
      navigate(`/board/${task.boardId}`, { state: { openTaskId: task.id } });
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      // sx= { width: '400'; p: '3' } 
      >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">
          {mode === 'create' ? 'Create Task' : mode === 'edit' ? 'Edit Task' : 'Task Details'}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <TextField
        label="Task Name"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={mode === 'view'}
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        disabled={mode === 'view'}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Priority</InputLabel>
        <Select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          label="Priority"
          disabled={mode === 'view'}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          label="Status"
          disabled={mode === 'view'}
        >
          <MenuItem value="Backlog">Backlog</MenuItem>
          <MenuItem value="InProgress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Executor</InputLabel>
        <Select
          name="assigneeId"
          value={formData.assigneeId}
          onChange={handleChange}
          label="Executor"
          disabled={mode === 'view'}
        >
          {/* Replace with your users list */}
          <MenuItem value={1}>User 1</MenuItem>
          <MenuItem value={2}>User 2</MenuItem>
        </Select>
      </FormControl>

      {isBoardPage && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Board</InputLabel>
          <Select
            name="boardId"
            value={formData.boardId}
            label="Board"
            disabled
          >
            <MenuItem value={formData.boardId}>Current Board</MenuItem>
          </Select>
        </FormControl>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        {!isBoardPage && task && (
          <Button variant="outlined" onClick={goToBoard}>
            Go to Board
          </Button>
        )}
        {mode !== 'view' && (
          <Button variant="contained" onClick={handleSubmit}>
            {mode === 'create' ? 'Create' : 'Save'}
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

export default TaskModal;