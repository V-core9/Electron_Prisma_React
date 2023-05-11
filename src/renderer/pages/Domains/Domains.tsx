import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import domainsStyles from './domains.scss';

import DashboardLayout from '../../layouts/dashboard';
import OSApi from '../../os-api';

import NewDomain from './NewDomain';
import CoreTable from '../../components/CoreTable';

const { PerPageOption } = CoreTable;

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  // probably you might want to add the currentTarget as well
  // currentTarget: T;
};

export interface Domain {
  id: number;
  url: string;
  title?: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  expanded?: boolean;
}

const dbQueryPrep = {
  query: (q: string | undefined, perPage: number, page: number) => ({
    where: {
      ...(q && {
        url: {
          contains: q,
        },
      }),
    },
    take: perPage || 5,
    skip: (page || 0) * (perPage || 5),
  }),

  count: (q: string | undefined) => ({
    where: {
      ...(q && {
        url: {
          contains: q,
        },
      }),
    },
  }),
};

const fetchDomainsList = async (queryString = '', perPage = 5, page = 1) => {
  console.log('fetched search callback', queryString);
  const data = await OSApi.prisma().domain.findMany(
    dbQueryPrep.query(
      queryString !== '' ? queryString : undefined,
      perPage,
      page - 1
    )
  );
  const count = await OSApi.prisma().domain.count(
    dbQueryPrep.count(queryString !== '' ? queryString : undefined)
  );

  return { data, count };
};

let userInputDelayTimer: null | ReturnType<typeof setTimeout> = null;

const createDomainsData = (data: unknown[]) =>
  data?.map((i: unknown) => ({ ...(i ?? i), expanded: false }));

export default function Domains() {
  const [searchQ, setSearchQ] = useState<string>('');
  const [domains, setDomains] = useState<Domain[]>([]);
  const [resultCount, setResultCount] = useState<number>(0);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const expandDomain = (domain: Domain) => {
    const newDomains: Domain[] = [];
    domains?.map((dom) =>
      newDomains.push({
        ...(dom ?? dom),
        ...(dom?.url === domain.url && { expanded: !dom?.expanded }),
      })
    );

    setDomains(newDomains);
  };

  console.warn('DOMAINS', domains);

  const handleChangePerPage = (event: SelectChangeEvent) => {
    setPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const fetch = async (val: unknown) => {
    setIsLoadingList(true);
    // console.log('SEARCHING', JSON.stringify(searchQ));
    const rez = await fetchDomainsList(val, perPage, currentPage);
    // console.log(rez);
    setDomains(
      createDomainsData(rez?.data ? rez.data : []) as unknown as Domain[]
    );
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

    await fetch(searchQ);
  };

  React.useEffect(() => {
    if (!isLoadingList) fetch(searchQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage, currentPage]);

  const fetchSearch = (e: HTMLElementEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    const val = e?.target?.value;
    // console.log(JSON.stringify(e.target.value));
    setCurrentPage(1);
    setSearchQ(val);

    if (userInputDelayTimer !== null) clearTimeout(userInputDelayTimer);

    userInputDelayTimer = setTimeout(() => {
      fetch(val);
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
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid xs={6}>__</Grid>
          <Grid
            xs={6}
            textAlign="end"
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: '.5em' }}
          >
            <NewDomain />
          </Grid>
        </Grid>

        {isLoadingList ? (
          <LinearProgress color="success" />
        ) : (
          <Paper
            sx={{
              p: 1.25,
              background: '#e7e7e7',
            }}
          >
            <Grid container spacing={2}>
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
                    id="domains_search_input"
                    label="Search"
                    variant="filled"
                    value={searchQ}
                    onChange={(e) =>
                      fetchSearch(
                        e as unknown as HTMLElementEvent<HTMLTextAreaElement>
                      )
                    }
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={1}
              sx={{
                mt: 1,
                mb: 1,
                p: 1,
                overflow: 'auto',
                flex: 1,
                gap: 0.75,
              }}
            >
              {domains?.map((domain) => {
                const { id, url, title, description } = domain as Domain;
                return (
                  <Paper
                    key={crypto.randomUUID()}
                    sx={{
                      width: '100%',
                      border: '1px solid #dbdbdb',
                      borderRadius: '.5em',
                      background: domain?.expanded ? '#EEE' : '#F0F0F0',
                    }}
                  >
                    <Grid
                      sx={{
                        // padding: '0.25em .75em',
                        borderTop: '1px solid #dbdbdb',
                        borderLeft: '1px solid #dbdbdb',
                        borderRight: '1px solid #dbdbdb',
                        borderRadius: '.5em .5em 0 0 ',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        p: 0,
                        justifyContent: 'space-between',
                        background: domain?.expanded
                          ? '#e7e7e7'
                          : 'transparent',
                      }}
                    >
                      <Grid xs={11} key={id}>
                        {!title ? url : title}
                      </Grid>
                      <Grid xs={1}>
                        <IconButton
                          color="secondary"
                          aria-label="Expand Row Data"
                          onClick={() => expandDomain(domain)}
                          sx={{
                            borderRadius: 0,
                            maxHeight: '24px',
                          }}
                        >
                          {domain.expanded ? (
                            <ExpandMoreIcon />
                          ) : (
                            <ExpandLessIcon />
                          )}
                        </IconButton>
                      </Grid>
                    </Grid>
                    {domain.expanded && (
                      <Grid
                        xs={12}
                        sx={{
                          p: 1,
                          borderTop: '2px solid #dbdbdb',
                        }}
                      >
                        <div>{`Title: ${
                          domain.title || '[ ❗ missing_info ]'
                        }`}</div>
                        <div>{`Description: ${
                          domain.description || '[ ❗ missing_info ]'
                        }`}</div>
                        <div>{`Created: ${
                          domain.created_at || '[ ❗ missing_info ]'
                        }`}</div>
                        <div>{`Updated: ${
                          domain.updated_at || '[ ❗ missing_info ]'
                        }`}</div>
                      </Grid>
                    )}
                  </Paper>
                );
              })}
            </Grid>

            <Grid container spacing={2} alignItems="center">
              <Grid xs={3}>
                <PerPageOption
                  perPage={perPage}
                  changeHandle={handleChangePerPage}
                />
              </Grid>

              <Grid xs={6} sx={{ justifyContent: 'center', display: 'flex' }}>
                <Paper sx={{ textAlign: 'center', p: 2, width: 'fit-content' }}>
                  Total Results: {resultCount} | Showing:{' '}
                  {String((currentPage - 1) * perPage)}-
                  {String(currentPage * perPage)}
                </Paper>
              </Grid>

              <Grid xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Stack direction="row" spacing={0}>
                  {currentPage !== 1 && (
                    <IconButton
                      color="secondary"
                      aria-label="add an alarm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      sx={{
                        borderRadius: '2.5em 0 0 2.5em',
                        background: 'white',
                        borderWidth: '1px 0 1px 1px',
                        borderColor: 'gray',
                        borderStyle: 'solid',
                      }}
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
                      onChange={(e) =>
                        setCurrentPage(parseInt(e.target.value, 10))
                      }
                      sx={{ background: 'white' }}
                    >
                      {paginationSelectOptions.map((i, j) => (
                        <MenuItem
                          value={i}
                          key={[i, j].map((c) => String(c)).join('_')}
                        >
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {currentPage !== pageCount && (
                    <IconButton
                      color="secondary"
                      aria-label="add an alarm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      sx={{
                        borderRadius: '0 2.5em 2.5em 0',
                        background: 'white',
                        borderWidth: '1px 1px 1px 0 ',
                        borderStyle: 'solid',
                        borderColor: 'gray',
                      }}
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* ADVANCED FILTERS */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>⚙ Advanced Actions & Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              variant="contained"
              endIcon={<SmartToyIcon />}
              color="secondary"
              onClick={generateDomain}
            >
              Generate Entry
            </Button>
            <Typography>{JSON.stringify(domains, null, 3)}</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </DashboardLayout>
  );
}
