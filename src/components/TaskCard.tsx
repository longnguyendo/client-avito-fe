import { useDrag } from 'react-dnd';
import type { Task } from '../types';
import { Card, CardContent, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import TaskModal from './TaskModal';

export default function TaskCard({ task }: { task: Task }) {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
  }));
  drag(ref);
  // console.log("in task card", task);
  return (
    <>
      <div 
        ref={ref} 
        style={{ cursor: 'move'}}
        onClick={() => setModalOpen(true)}
      >
        <Card sx={{ mb: 1 }}>
          <CardContent>
            <Typography>{task.title}</Typography>
            <Typography variant="body2">{task.status}</Typography>
          </CardContent>
        </Card>
      </div>
      <TaskModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        taskId={task}
      />
    </>
  );
}