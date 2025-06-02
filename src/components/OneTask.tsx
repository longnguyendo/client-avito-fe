import { useDrag } from 'react-dnd';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import type { Task } from '../types';
import { useRef } from 'react';

interface OneTaskProps {
  task: Task;
}

const priorityColors: Record<string, string> = {
  High: '#f44336',
  Medium: '#ff9800',
  Low: '#4caf50'
};

const OneTask = ({ task }: OneTaskProps) => {

  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  drag(ref);
  // console.log("1 task", task);
  
  return (
    <Box
      ref={ref}
      sx={{
        p: 2,
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 1,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing'
        }
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {task.title}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
        {task.description}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Chip
          label={task.priority}
          size="small"
          sx={{ 
            backgroundColor: priorityColors[task.priority],
            color: 'white'
          }}
        />
        {/* {task?.assignee && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={task.assignee.avatarUrl} 
              alt={task.assignee.fullName}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            <Typography variant="caption">
              {task.assignee.fullName}
            </Typography>
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default OneTask;