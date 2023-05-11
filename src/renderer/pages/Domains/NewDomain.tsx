import { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

export default function NewDomain() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [anchor, setAnchor] = useState<'right' | 'left' | 'bottom' | 'top'>(
    'right'
  );

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setIsOpen(true)}
        endIcon={<AddBoxIcon />}
      >
        New
      </Button>
      <Drawer
        anchor={anchor}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        style={{
          zIndex: 9000,
        }}
      >
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
        >
          YEA
        </Box>
      </Drawer>
    </>
  );
}
