import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

import SmartToyIcon from '@mui/icons-material/SmartToy';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import DashboardLayout from '../../layouts/dashboard';
import OSApi from '../../os-api';

const sortQuery = (q: string, perPage: number, page: number) => ({
  where: {
    ...(q && {
      url: {
        contains: q,
      },
    }),
  },
  take: perPage || 5,
  skip: (page || 0) * (perPage || 5),
});

const sortQueryCount = (q: string) => ({
  where: {
    ...(q && {
      url: {
        contains: q,
      },
    }),
  },
});

const fetchSearchCallback = async (queryString = '', perPage = 5, page = 1) => {
  console.log('fetched search callback', queryString);
  const data = await OSApi.prisma().domain.findMany(
    sortQuery(queryString, perPage, page - 1)
  );
  const count = await OSApi.prisma().domain.count(sortQueryCount(queryString));

  return { data, count };
};

let userInputDelayTimer: null | ReturnType<typeof setTimeout> = null;

export default function Domains() {
  const [searchQ, setSearchQ] = useState<null | string>(null);
  const [domains, setDomains] = useState<[]>([]);
  const [resultCount, setResultCount] = useState<number>(0);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChangePerPage = (event: SelectChangeEvent) => {
    setPerPage(event.target.value as number);
    setCurrentPage(1);
  };

  const fetch = async () => {
    setIsLoadingList(true);
    console.log('SEARCHING', JSON.stringify(searchQ));
    const rez = await fetchSearchCallback(searchQ, perPage, currentPage);
    console.log(rez);
    setDomains(rez.data);
    setResultCount(rez.count);
    setIsLoadingList(false);
  };
  const generateDomain = async () => {
    const e = {
      data: {
        url: `http://localhost:${Date.now()}`,
      },
    };

    await OSApi.prisma().domain.create(e);

    await fetch();
  };

  React.useEffect(() => {
    if (!isLoadingList) fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage, currentPage]);

  const fetchSearch = (e) => {
    e.stopPropagation();
    console.log(JSON.stringify(e.target.value));

    if (userInputDelayTimer !== null) clearTimeout(userInputDelayTimer);
    setCurrentPage(1);
    setSearchQ(e.target.value);

    userInputDelayTimer = setTimeout(() => {
      fetch();
    }, 1000);
  };

  const perPageHelpCount = Math.trunc(resultCount / perPage);
  const pageCount =
    perPageHelpCount + (resultCount / perPage - perPageHelpCount > 0 ? 1 : 0);

  const paginationSelectOptions = new Array(pageCount);
  for (let i = 0; i < paginationSelectOptions.length; i += 1) {
    paginationSelectOptions[i] = i + 1;
  }

  return (
    <DashboardLayout title="Domains Manager">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid xs={6}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={(e) => e.preventDefault()}
            >
              <TextField
                id="filled-basic"
                label="Search"
                variant="filled"
                onChange={fetchSearch}
              />
            </Box>
          </Grid>
          <Grid
            xs={6}
            textAlign="end"
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: '.5em' }}
          >
            <Button variant="contained" endIcon={<AddBoxIcon />}>
              New
            </Button>
            <Button
              variant="contained"
              endIcon={<SmartToyIcon />}
              color="secondary"
              onClick={generateDomain}
            >
              Generate
            </Button>
          </Grid>
        </Grid>

        {/* ADVANCED FILTERS */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Advanced Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{JSON.stringify(domains, null, 3)}</Typography>
          </AccordionDetails>
        </Accordion>

        {isLoadingList ? (
          <LinearProgress color="success" />
        ) : (
          <>
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
                  <InputLabel id="demo-simple-select-label">
                    Per Page
                  </InputLabel>
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
          </>
        )}

        {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>JSON State</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{JSON.stringify(domains, null, 3)}</Typography>
        </AccordionDetails>
          </Accordion> */}
      </Box>
    </DashboardLayout>
  );
}
