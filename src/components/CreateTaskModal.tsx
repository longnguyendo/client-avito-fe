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
import { Api } from '../types2';
import type {ModelsCreateTaskRequest } from '../types2';

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
interface FormValues {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Backlog' | 'InProgress' | 'Done';
  assigneeId: string;
  boardId: string;
}

const CreateTaskModal = ({ open, onClose}: TaskModalProps) => {

  const location = useLocation();
  
  const [formData, setFormData] = useState<ModelsCreateTaskRequest>({
    title: '',
    description: '',
    priority: 'Medium',
    assigneeId: 1,
    boardId: 1,
  });

// Fetch all users
  const { data: users = []} = useQuery({
    queryKey: ['users'],
    queryFn: () => api.users.usersList().then(res => res.data),
  });

  // Fetch all boards
  const { data: boards = [] } = useQuery({
    queryKey: ['boards'],
    queryFn: () => api.boards.boardsList().then(res => res.data),
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  // const formDataToSend = new FormData();
  // formDataToSend.append('title', formData.title);
  // formDataToSend.append('description', formData.description);
  // formDataToSend.append('priority', formData.priority);
  // formDataToSend.append('status', formData.status);
  // formDataToSend.append('assigneeId', formData.assigneeId);
  // formDataToSend.append('boardId', formData.boardId);

  //   const createTaskMutation = useMutation({
  //   mutationFn: (formDataToSend) => { 
  //     return api.post('/tasks/create/', formDataToSend)
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['tasks'] });
  //     navigate('/board/1');
  //     onClose();
  //   },
  // });


  // const handleSubmit = () => {
  //   createTaskMutation.mutate(formDataToSend);
  // };
  const api = new Api();
  const createTaskMutation = useMutation({
    mutationFn: (taskData: ModelsCreateTaskRequest) => 
      api.tasks.createCreate(taskData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      // Redirect to the board after creation
      navigate(`/board/${variables.boardId}`);
      onClose();
    },
    onError: (error) => {
      console.error('Error creating task:', error);
    }
  });

  const handleSubmit = () => {
    createTaskMutation.mutate({
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      assigneeId: formData.assigneeId,
      boardId: formData.boardId // This will be used for redirect
    });
  } 

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
          <Button variant="contained" onClick={handleSubmit} disabled={createTaskMutation.isPending}>
            {createTaskMutation.isPending ? 'Creating...' : 'Create'}
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CreateTaskModal;