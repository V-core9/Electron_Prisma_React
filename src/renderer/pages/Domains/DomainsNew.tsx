import { useState, useEffect } from 'react';
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
import Checkbox from '@mui/material/Checkbox';

import './domains.scss';

import DashboardLayout from '../../layouts/dashboard';
import OSApi from '../../os-api';

import NewDomain from './NewDomain';
import PerPageOption from '../../components/CoreTable/PerPageOption';

import { prepareDatabaseQuery } from '../../services/domains/prepareDatabaseQuery';

import { useAdvancedTable } from '../../hooks';

//! Types
import { Domain } from '../../../types/Domain.interface';
import type { HTMLElementEvent } from '../../../types/HTMLElementEvent.type';

const timeouts: any = {};

const fetchDomainsList = async (queryString = '', perPage = 5, page = 1) => {
  console.log('fetched search callback', queryString);
  const data = await OSApi.prisma().domain.findMany(
    prepareDatabaseQuery.query(
      queryString !== '' ? queryString : undefined,
      perPage,
      page - 1
    )
  );
  const count = await OSApi.prisma().domain.count(
    prepareDatabaseQuery.count(queryString !== '' ? queryString : undefined)
  );

  return { data, count };
};

// let userInputDelayTimer: null | ReturnType<typeof setTimeout> = null;

export default function DomainsNew() {
  const [searchQ, setSearchQ] = useState<string>('');
  const [resultCount, setResultCount] = useState<number>(0);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  const {
    data: domains,
    setData: setDomains,

    selected,
    toggleSelected,

    expanded,
    toggleExpanded,

    currentPage,
    setCurrentPage,

    perPage,
    setPerPage,
  } = useAdvancedTable([]);

  // console.warn(domains, selected, expanded, currentPage, perPage);

  const handleChangePerPage = (event: SelectChangeEvent) => {
    setPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const fetch = async (val: string | undefined) => {
    const startLoad = Date.now();
    setIsLoadingList(true);
    // console.log('SEARCHING', JSON.stringify(searchQ));
    const rez = await fetchDomainsList(val, perPage, currentPage);
    // console.log(rez);

    timeouts.pageFetch = setTimeout(async () => {
      setDomains(rez?.data ? rez.data : []) as unknown as Domain[];
      setResultCount(rez.count);
      setIsLoadingList(false);
    }, Date.now() - startLoad);
  };

  const generateDomain = async () => {
    const e = {
      data: {
        url: `http://localhost:${Date.now()}`,
      },
    };

    await OSApi.prisma().domain.create(e);

    fetch(searchQ);
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
      // Anything in here is fired on component unmount.
      try {
        clearTimeout(timeouts.userInputDelayTimer);
        clearTimeout(timeouts.pageFetch);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoadingList) fetch(searchQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage, currentPage]);

  const fetchSearch = (e: HTMLElementEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    const val = e?.target?.value;
    setCurrentPage(1);
    setSearchQ(val);

    if (timeouts.userInputDelayTimer !== null)
      clearTimeout(timeouts.userInputDelayTimer);

    timeouts.userInputDelayTimer = setTimeout(() => {
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
      <Box
        id="domains_manager_new_content"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
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

        <Paper
          sx={{
            p: 1.25,
            background: '#e7e7e7',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            minHeight: '60vh',
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

          {isLoadingList ? (
            <Grid
              container
              spacing={1}
              sx={{
                mt: 1,
                mb: 1,
                p: 1,
                overflow: 'auto',
                gap: 0.75,
                flex: 1,
                display: 'flex',
                background: '#f0f0f0',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'stretch',
              }}
            >
              <Typography variant="h4">Loading Data...</Typography>
              <LinearProgress color="success" />
            </Grid>
          ) : (
            <Grid
              id="domains_manager_new_datalist_container"
              container
              spacing={1}
              sx={{
                mt: 1,
                mb: 1,
                p: 1,
                overflow: 'auto',
                gap: 0.75,
                flex: 1,
                alignContent: 'flex-start',
                display: 'flex',
                background: '#f0f0f0',
              }}
            >
              {domains?.map((domain, index) => {
                const { id, url, title, description } = domain as Domain;
                const isSelected = selected.indexOf(index) !== -1;
                const isExpanded = expanded.indexOf(index) !== -1;
                return (
                  <Paper
                    key={crypto.randomUUID()}
                    sx={{
                      width: '100%',
                      border: '1px solid #dbdbdb',
                      borderRadius: '.5em',
                      background: isExpanded ? '#EEE' : '#F0F0F0',
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
                        background: isExpanded ? '#e7e7e7' : 'transparent',
                      }}
                    >
                      <Grid sx={{ maxWidth: 80 }}>
                        <Checkbox
                          inputProps={{ 'aria-label': 'Checkbox demo' }}
                          checked={isSelected}
                          onChange={() => toggleSelected(domain)}
                        />
                      </Grid>
                      <Grid sx={{ flex: 1 }} key={id}>
                        {!title ? url : title}
                      </Grid>
                      <Grid xs={1}>
                        <IconButton
                          color="secondary"
                          aria-label="Expand Row Data"
                          onClick={() => toggleExpanded(domain)}
                          sx={{
                            borderRadius: 0,
                            maxHeight: '24px',
                          }}
                        >
                          {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        </IconButton>
                      </Grid>
                    </Grid>
                    {expanded.indexOf(index) !== -1 && (
                      <Grid
                        xs={12}
                        sx={{
                          p: 1,
                          borderTop: '2px solid #dbdbdb',
                        }}
                      >
                        <div>{`Title: ${
                          domain?.title || '[ ❗ missing_info ]'
                        }`}</div>
                        <div>{`Description: ${
                          domain?.description || '[ ❗ missing_info ]'
                        }`}</div>
                        <div>{`Created: ${
                          domain?.created_at || '[ ❗ missing_info ]'
                        }`}</div>
                        <div>{`Updated: ${
                          domain?.updated_at || '[ ❗ missing_info ]'
                        }`}</div>
                      </Grid>
                    )}
                  </Paper>
                );
              })}
            </Grid>
          )}

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
                    onClick={async () => setCurrentPage(currentPage - 1)}
                    sx={{
                      borderRadius: '2.5em 0 0 2.5em',
                      background: 'white',
                      borderWidth: '1px 0 1px 1px',
                      borderColor: 'gray',
                      borderStyle: 'solid',
                    }}
                    disabled={isLoadingList}
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
                    onChange={async (e) =>
                      setCurrentPage(parseInt(e.target.value, 10))
                    }
                    sx={{ background: 'white' }}
                    disabled={isLoadingList}
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
                    disabled={isLoadingList}
                    color="secondary"
                    aria-label="add an alarm"
                    onClick={async () => setCurrentPage(currentPage + 1)}
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
