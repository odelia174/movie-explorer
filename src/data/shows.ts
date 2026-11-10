import type { Show } from '../types/show';

export const shows: Show[] = [
  {
    id: 1,
    name: 'Breaking Bad',
    genres: ['Drama', 'Crime'],
    rating: 9.5,
    imageUrl:
      'https://static.tvmaze.com/uploads/images/medium_portrait/501/1253519.jpg',
  },
  {
    id: 2,
    name: 'Stranger Things',
    genres: ['Drama', 'Science Fiction'],
    rating: 8.7,
    imageUrl:
      'https://static.tvmaze.com/uploads/images/medium_portrait/595/1489169.jpg',
  },
  {
    id: 3,
    name: 'Friends',
    genres: ['Comedy', 'Romance'],
    rating: 8.9,
    imageUrl:
      'https://static.tvmaze.com/uploads/images/medium_portrait/41/104565.jpg',
  },
  {
    id: 4,
    name: 'The Office',
    genres: ['Comedy'],
    rating: 9.0,
    imageUrl:
      'https://static.tvmaze.com/uploads/images/medium_portrait/481/1204342.jpg',
  },
];
