import React, { FC } from 'react';
import { Grid, Typography, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';

interface IProductCardProps {
  image: string;
  title: string;
  description: string;
}

export const ProductCard: FC<IProductCardProps> = ({ image, title, description }) => (
  <Grid item md={4}>
    <Card sx={{ maxWidth: 280 }} raised>
      <CardActionArea>
        <CardMedia component='img' height='190' image={image} alt='green iguana' />
        <CardContent>
          <Typography gutterBottom color='text.primary' variant='h5' component='div'>
            {title}
          </Typography>
          <Typography gutterBottom variant='body2' color='text.secondary'>
            {description}
          </Typography>
          <Typography variant='h6' color='text.primary'>
            <span>$200 </span>
            <span> $150</span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);
