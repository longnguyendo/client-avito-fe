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
  CircularProgress,
  Typography,
  Avatar
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
    setIsModalOpen(true);
  };

  const handleSave = (taskData: Partial<Task>) => {
    // console.log('Saving task:', taskData);
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
                sx={{
                  p: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  backgroundColor: '#fafafa',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f0f0f0',
                  },
                  '& p': {
                    m: 0,
                    mb: 0.5,
                    color: '#333',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    '&:last-child': {
                      mb: 0,
                    },
                  },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {task.title}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  {task.description}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  <strong>Status:</strong> {task.status}
                </Typography>

                {/* Nếu muốn hiển thị avatar hình ảnh */}
                {task.assignee?.avatarUrl && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Avatar src={task.assignee.avatarUrl} alt={task.assignee.fullName} />
                    <Typography variant="body2">
                      {task.assignee.fullName}
                    </Typography>
                  </Box>
                )}
              </Box>
            </>
          ))}
        </Box>
      )}
      <TaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={handleSave}
      />
    </Box>
  );
}