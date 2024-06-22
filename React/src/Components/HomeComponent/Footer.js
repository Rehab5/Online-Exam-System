// Footer.js

import React from 'react';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '50px', marginTop: '20px' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        &copy; {new Date().getFullYear()} Online Exam System. All rights reserved.
      </Typography>
    </footer>
  );
}

export default Footer;
