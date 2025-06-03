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
  IconButton,
  Paper,
  Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Task, User } from '../types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { api } from '../api/client';
import type { ModelsUpdateTaskRequest } from '../types2';
import { Api } from '../types2';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '80vh',
  overflowY: 'auto'
};

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task?: Task;
  onSave: (taskData: Partial<Task>) => void;
}

const TaskModal = ({ open, onClose, task, onSave }: TaskModalProps) => {

  const location = useLocation();
  const navigate = useNavigate();
  const isBoardPage = location.pathname.includes('/board');
  
  const [formData, setFormData] = useState<ModelsUpdateTaskRequest>({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Backlog',
    assigneeId: 1,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        id : task?.id,
        title: task.title,
        description: task.description ?? '',
        priority: task.priority,
        status: task.status,
        assigneeId: `${task.assignee?.id}`,
      });
    }
  }, [task]);
  
// Fetch all users
  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.users.usersList().then(res => res.data),
  });

  // Fetch all boards
  const { data: boards = [], isLoading: isBoardsLoading } = useQuery({
    queryKey: ['boards'],
    queryFn: () => api.boards.boardsList().then(res => res.data),
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const queryClient = useQueryClient();

  const api = new Api();

  const updateTaskMutation = useMutation({
    mutationFn: (data: { id: number; updates: ModelsUpdateTaskRequest }) => 
      api.tasks.updateUpdate(data.id, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', task?.boardId], exact: false });
    }
  });

  const handleSubmit = () => {
    if (!task?.id) return;

    updateTaskMutation.mutate({
      id: task.id,
      updates: {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: formData.status,
        assigneeId: Number(formData.assigneeId) // Convert to number
      }
    });
    onSave(formData);
    onClose();
  };

  const goToBoard = () => {
    if (task) {
      navigate(`/board/${task.boardId}`, { state: { openTaskId: task.id } });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="task-modal-title"
      >
      <Paper sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">
            Edit Task
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
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            label="Priority"
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
          >
            {users?.data?.map((user: any) => (
              <MenuItem key={user.id} value={user.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    src={user.avatarUrl} 
                    alt={user.fullName}
                    sx={{ width: 24, height: 24 }}
                  />
                  <Box>
                    <Typography variant="body1">{user.fullName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Board</InputLabel>
          <Select
            name="boardId"
            value={formData.boardId}
            onChange={handleChange}
            label="Board"
          >
            {boards?.data?.map((board: any) => (
            <MenuItem key={board.id} value={board.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box>
                  <Typography variant="body2">{board.name}</Typography>
                </Box>
              </Box>
            </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          {!isBoardPage && task && (
            <Button variant="outlined" onClick={goToBoard}>
              Go to Board
            </Button>
          )}
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default TaskModal;