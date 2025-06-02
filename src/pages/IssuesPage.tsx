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
  
  const [filters, setFilters] = useState({
    status: '',
    search: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['task', filters],
    queryFn: () => api.get('/tasks').then(res => res.data),
  });

  
  console.log("task", tasks);

  const filteredTasks = tasks?.data?.filter((task: Task) => {
    return (
      (!filters.status || task.status === filters.status) &&
      (!filters.search || task.title.includes(filters.search))
    );
  });

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
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Create Task
        </Button>
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {filteredTasks?.map((task: Task) => (
            <Box 
              key={task.id} 
              onClick={() => setSelectedTask(task)}
              sx={{ p: 2, border: '1px solid #eee', cursor: 'pointer' }}
            >
              <div>{task.title}</div>
              <div>Status: {task.status}</div>
            </Box>
          ))}
        </Box>
      )}
      <TaskModal 
        open={modalOpen || !!selectedTask} 
        onClose={() => {
          setModalOpen(false);
          setSelectedTask(null);
        }} 
        task={selectedTask ?? undefined}
      />
    </Box>
  );
}