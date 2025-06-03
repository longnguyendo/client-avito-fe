import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import type { Task } from '../types';
import { useState } from 'react';
import TaskModal from '../components/TaskModal';
import { 
  Box, 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  Button,
  CircularProgress
} from '@mui/material';

export default function IssuesPage() {

  // get all tasks then filter and search
  const [filters, setFilters] = useState({
    status: '',
    search: '',
  });
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['task', filters],
    queryFn: () => api.get('/tasks').then(res => res.data),
  });
  const filteredTasks = tasks?.data?.filter((task: Task) => {
    return (
      (!filters.status || task.status === filters.status) &&
      (!filters.search || task.title.includes(filters.search) || task.assignee?.fullName.includes(filters.search))
    );
  });

  // modal open and edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  // const [mode, setMode] = useState<'view' | 'edit' | 'create'>('view');
  

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    // setMode('view');
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setMode('edit');
  };

  const handleCreateClick = () => {
    setSelectedTask(undefined);
    setMode('create');
    setIsModalOpen(true);
  };

  const handleSave = (taskData: Partial<Task>) => {
    console.log('Saving task:', taskData);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search"
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Backlog">Backlog</MenuItem>
            <MenuItem value="InProgress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {filteredTasks?.map((task: Task) => (
            <>
              <Box 
                onClick={() => handleTaskClick(task)}
                key={task.id} 
                sx={{ p: 2, border: '1px solid #eee', cursor: 'pointer' }} 
              >
                <p>{task.title}</p>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <p>Avatar: {task.assignee?.avatarUrl}</p>
                <p>Full Name: {task.assignee?.fullName}</p>
              </Box>
            </>
          ))}
        </Box>
      )}
      <TaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        mode='edit'
        onSave={handleSave}
      />
    </Box>
  );
}