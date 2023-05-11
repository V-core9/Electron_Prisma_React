import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

interface PerPageOptionProps {
  changeHandle: (event: SelectChangeEvent) => void;
  perPage: number;
  options?: number[];
}

export default function PerPageOption({
  perPage,
  changeHandle,
  options,
}: PerPageOptionProps): JSX.Element {
  return (
    <FormControl sx={{ minWidth: '5em' }}>
      <InputLabel id="demo-simple-select-label">Per Page</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={String(perPage)}
        label="Per Page"
        onChange={changeHandle}
        sx={{ background: 'white' }}
      >
        {options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

PerPageOption.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number.isRequired),
};

PerPageOption.defaultProps = {
  options: [10, 25, 50, 100],
};
