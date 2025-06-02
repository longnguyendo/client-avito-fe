import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import type { Task, Board, Status } from '../types';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useState, useRef, use } from 'react';
import TaskModal from '../components/TaskModal';
import TaskCard from '../components/TaskCard';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

function Column({ status, tasks, onDrop }: { 
  status: Status; 
  tasks: any[]; 
  onDrop: (taskId: string) => void 
}) {

  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: string }) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  drop(ref);
  return (
    <Box 
      ref={ref}
      sx={{ 
        flex: 1, 
        p: 2, 
        bgcolor: isOver ? '#f5f5f5' : 'white',
        border: '1px solid #eee',
        minHeight: '200px'
      }}
    >
      <Typography variant="h6">{status}</Typography>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Box>
  );
}

export default function BoardPage() {

  const { id } = useParams<{id : string}>();
  const [modalOpen, setModalOpen] = useState(false);
  const { data: board, isLoading } = useQuery({
    queryKey: ['board', id], 
    queryFn: () => 
    api.get(`/boards/${id}`).then(res => res.data),
    enabled: !!id,
  });

  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: (data: { id: string; status: Status }) => 
      api.patch(`/tasks/${data.id}`, { status: data.status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', id] });
    }
  });

  if (isLoading) return <CircularProgress />;

  console.log("board ko s", board);
  
  const tasksByStatus = (status: Status) => 
    board?.data?.filter((task: any) => task.status === status) || [];

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4">{board?.name}</Typography>
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            Add Task
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {['backlog', 'todo', 'in_progress', 'done', 'cancelled'].map(status => (
            <Column 
              key={status}
              status={status as Status}
              tasks={tasksByStatus(status as Status)}
              onDrop={(taskId) => updateTaskMutation.mutate({ id: taskId, status: status as Status })}
            />
          ))}
        </Box>
      </Box>
      <TaskModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        task={{ boardId: id || '' } as Task}
      />
    </DndProvider>
  );
}