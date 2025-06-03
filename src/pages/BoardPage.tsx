import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import type { Task, Board, Status } from '../types';
import { Box, Typography, Button, CircularProgress, Paper } from '@mui/material';
import { useState, useRef, use, useMemo } from 'react';
// import TaskModal from '../components/TaskModal';
import TaskCard from '../components/TaskCard';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import OneTask from '../components/OneTask';

interface ColumnProps {
  status: Status;
  tasks: Task[];
  onDrop: (taskId: number) => void;
}

const statusTitles: Record<Status, string> = {
  Backlog: 'Backlog',
  InProgress: 'In Progress',
  Done: 'Done',
};

const statusColors: Record<Status, string> = {
  Backlog: '#e3e3e3',
  InProgress: '#fff9c4',
  Done: '#c8e6c9',
};


function Column({ status, tasks, onDrop }: ColumnProps) {
  
  // console.log(tasks);

  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: number }) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  drop(ref);

  return (
     <Paper
      ref={ref}
      sx={{
        flex: 1,
        minWidth: 300,
        backgroundColor: isOver ? `${statusColors[status]}80` : statusColors[status],
        transition: 'background-color 0.2s ease',
        p: 2,
        borderRadius: 2
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        {statusTitles[status]} ({tasks?.length})
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tasks?.map(task => (
          <OneTask key={task.id} task={task} />
        ))}
      </Box>
    </Paper>
  );
}


export default function BoardPage() {

  const { id } = useParams<{id : string}>();

  const [filters, setFilters] = useState({
      status: '',
      search: '',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', id], 
    queryFn: () => 
    api.get(`/boards/${id}`).then(res => res.data),
    enabled: !!id,
  });

  const queryClient = useQueryClient();

  const statuses: Status[] = [
    'Backlog',
    'InProgress',
    'Done',
  ];

  const updateTaskMutation = useMutation({
    mutationFn: (data: { id: string; status: Status }) => 
      api.put(`/tasks/updateStatus/${data.id}`, { status: data.status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', id] });
    }
  });

  // console.log('tasks', tasks);
  const tasksByStatus = useMemo(() => {
    const group = Object.groupBy(tasks?.data || [], (task:any) => task.status);
    return group;
  }, [tasks]);
  if (isLoading) return <CircularProgress />;

  // console.log("board ko s", board);
  // const tasksByStatus = (status: Status) => 
  //   tasks?.data?.filter((task: any) => task.status === status) || [];

  
  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4">{tasks?.data?.title}</Typography>
        </Box>

         <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2, minHeight: '70vh'}}>
          {statuses.map(status => (
            <Column
              key={status}
              status={status}
              tasks={tasksByStatus?.[status]}
              onDrop={(id: number) => updateTaskMutation.mutate({id: id, status: status as Status })}
            />
          ))}
        </Box>
      </Box>
      {/* <TaskModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        task={{ boardId: id || '' } as Task}
      /> */}
    </DndProvider>
  );
}