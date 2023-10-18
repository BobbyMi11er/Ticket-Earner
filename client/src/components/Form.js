import {FormControl, InputLabel, Select, MenuItem, Box, Container} from '@mui/material'
import { borders } from '@mui/system';
import { Menu } from 'antd';
import { useState } from 'react';

export default function Form({formName, onSelect, items}) {

    const [selection, setSelection] = useState("");

    const handleChange = (event) => {
        // localStorage.setItem('selected' + formName, JSON.stringify(event.target.value));
        setSelection(event.target.value);   
        onSelect(event.target.value);
        console.log(items.length);
    };

    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: 250,
          width: 250,
        },
      },
    };

    return (
      <Box
        sx={{
          boxShadow: 2,
          borderRadius: 3,
          p: 2,
          minWidth: 300,
          maxWidth: 350,
          gap: 2,
          minHeight: MenuProps.PaperProps.style.maxHeight + 50,
        }}
      >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 240 }}>
          <InputLabel id="demo-simple-select-standard-label">{formName}</InputLabel>
          <Select
            value={selection}
            onChange={handleChange}
            label={formName}
            MenuProps={MenuProps}
          >
            {items.map((item) =>
              <MenuItem key={item} value={item}>{item}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    );
}