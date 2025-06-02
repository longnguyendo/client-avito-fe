import { Modal, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';
import type { Task } from '../types';
// import { Priority, Status } from '../types';

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
  task?: Task;  // Make task optional with undefined instead of null
}

export default function TaskModal({ open, onClose, task }: TaskModalProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<Task>({
    defaultValues: task || { 
      title: '', 
      description: '', 
      board: '',
      priority: 'medium', 
      status: 'Backlog', 
      user: '',
    }
  });

  const mutation = useMutation({
    mutationFn: (data: Task) => 
      task 
        ? api.put(`/tasks/update/${task.id}`, data) 
        : api.post('/tasks/create', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      onClose();
    }
  });

  const onSubmit = (data: Task) => {
    mutation.mutate(data);
    localStorage.removeItem('taskDraft');
  };

  const saveDraft = (data: Task) => {
    localStorage.setItem('taskDraft', JSON.stringify(data));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Title"
            {...register('title')}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            {...register('description')}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select label="Priority" {...register('priority')}>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl> 
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select label="Priority" {...register('priority')}>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl> 
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select label="status" {...register('status')}>
              <MenuItem value="backlog">Backlog</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ mt: 2, mr: 2 }}
          >
            Save
          </Button>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => {
              handleSubmit(saveDraft)();
              onClose();
            }}
          >
            Save Draft
          </Button>
        </form>
      </Box>
    </Modal>
  );
}