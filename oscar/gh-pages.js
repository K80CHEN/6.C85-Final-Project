import { publish } from 'gh-pages';

publish(
 'build', // path to public directory
 {
  branch: 'gh-pages',
  repo: 'https://github.com/K80CHEN/6.C85-Final-Project', // Update to point to your repository
  user: {
   name: 'Katie Chen', // update to use your name
   email: 'mzc219@mit.edu' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);