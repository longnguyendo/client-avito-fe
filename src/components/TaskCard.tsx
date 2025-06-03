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

  const handleSave = (taskData: Partial<Task>) => {
    console.log('Saving task:', taskData);
  };
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
        onSave={handleSave}
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        task={task}
      />
    </>
  );
}