import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const CustomersSearch = ({children}) => (
  <Card sx={{ p: 2, mb:2, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Buscar..."
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
    {children}

  </Card>
);
