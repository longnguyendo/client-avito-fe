import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import type { Board } from '../types';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';

export default function BoardsPage() {
  const { data: boards, isLoading } = useQuery({
    queryKey: ['boards'], 
    queryFn: () => api.get('/boards').then(res => res.data)
  });

  if (isLoading) return <CircularProgress />;
  // console.log(boards);
  
  const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    textAlign: 'center' as 'center',  
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <Box sx={{ p: 2 }}>
      {boards?.data?.map((board: Board) => (
        <Card key={board.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5">{board.name}</Typography>
            <Link to={`/board/${board.id}`} style={buttonStyle} >View Board</Link>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}