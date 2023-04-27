import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function CoreTable({
  domains,
  resultCount,
  setCurrentPage,
  handleChangePerPage,
  perPage,
  currentPage,
  pageCount,
  paginationSelectOptions,
}: any) {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={6} />
        <Grid xs={6}>
          <Paper>Total Results: {resultCount}</Paper>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        sx={{
          mt: 1,
          mb: 1,
          p: 1,
          background: '#e0e0e0',
          display: 'flex',
          overflow: 'auto',
          flex: 1,
        }}
      >
        {domains?.map((domain) => {
          const { id, url } = domain;
          return (
            <Grid xs={12} key={id}>
              <Paper>{url}</Paper>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <FormControl sx={{ minWidth: '5em' }}>
            <InputLabel id="demo-simple-select-label">Per Page</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={String(perPage)}
              label="Per Page"
              onChange={handleChangePerPage}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={1000}>1000</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Stack direction="row" spacing={1}>
            {currentPage !== 1 && (
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            )}
            <FormControl fullWidth sx={{ minWidth: '5em' }}>
              <InputLabel id="demo-simple-select-label">
                Current Page
              </InputLabel>
              <Select
                labelId="currentPageSelect"
                id="current-page-select"
                value={String(currentPage)}
                label="Current Page"
                onChange={(e) => setCurrentPage(e.target.value as number)}
              >
                {paginationSelectOptions.map((i, j) => (
                  <MenuItem value={i}>{i}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {currentPage !== pageCount && (
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
