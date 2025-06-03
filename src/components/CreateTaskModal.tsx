import { useState, useEffect } from 'react';
import { data, useLocation, useNavigate } from 'react-router-dom';
import {
  Modal,
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
import { api } from '../api/client';

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
  // onSave: (taskData: Partial<Task>) => void;
}

const CreateTaskModal = ({ open, onClose}: TaskModalProps) => {

  const location = useLocation();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Backlog',
    assigneeId: '',
    boardId: '',
  });

  // get all user;
  const { data: users , isLoading: isUsersLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => api.get('/users').then(res => res.data),
  });
  // get all boards;
  const { data: boards , isLoading: isBoardsLoading } = useQuery({
    queryKey: ['boards'],
    queryFn: () => api.get('/boards').then(res => res.data),
  });

  console.log("formdata ", formData);
  console.log("boards", boards);
  
  // console.log("loading", isUsersLoading);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const queryClient = useQueryClient();

  // const goToBoard = () => {
  //   if (task) {
  //     navigate(`/board/${task.boardId}`, { state: { openTaskId: task.id } });
  //   }
  // };

  const navigate = useNavigate();
  
  const updateTaskMutation = useMutation({
    mutationFn: (data: FormData) => api.post('/tasks/create/', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      // navigate('/board/1');
      onClose();
    },
  });

  const formDataToSend = new FormData();
  formDataToSend.append('title', formData.title);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('priority', formData.priority);
  formDataToSend.append('status', formData.status);
  formDataToSend.append('assigneeId', formData.assigneeId);
  formDataToSend.append('boardId', formData.boardId);


  const handleSubmit = () => {
    updateTaskMutation.mutate(formDataToSend);
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
            Create new task
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
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CreateTaskModal;