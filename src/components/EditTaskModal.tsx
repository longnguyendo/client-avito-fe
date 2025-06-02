import { Modal, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';

import type { Task } from '../types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  taskId?: number;
  onTaskUpdated: () => void;
}
export default function EditTaskModal({ open, onClose, taskId, onTaskUpdated }: TaskModalProps) {
  
  const navigate = useNavigate();
  const [task, setTask] = useState<ModelsGetTaskByIDResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState<ModelsUpdateTaskRequest>({
    title: '',
    description: '',
    assigneeId: 0,
    priority: 'Medium',
    status: 'Backlog'
  });

  const fetchTask = async () => {
    setIsLoading(true);
    try {
      // const api = new api();
      const response = await api.tasks.tasksDetail(taskId!);
      setTask(response.data);
      setFormData({
        title: response.data.title || '',
        description: response.data.description || '',
        assigneeId: response.data.assignee?.id || 0,
        priority: response.data.priority || 'Medium',
        status: response.data.status || 'Backlog'
      });
    } catch (error) {
      console.error('Error fetching task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open && taskId) {
      fetchTask();
    }
  }, [open, taskId]);

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