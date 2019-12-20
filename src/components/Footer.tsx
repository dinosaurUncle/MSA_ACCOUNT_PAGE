import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
const Footer = () =>
 <footer style={{textAlign : "center", marginTop: "20%"}}>
  <Box mt={8}>
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/dinosaurUncle">
      https://github.com/dinosaurUncle
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  </Box>
</footer>;

export default Footer;