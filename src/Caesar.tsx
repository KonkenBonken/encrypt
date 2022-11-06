import React, { useState } from 'react';
import { Typography, TextField, Grid, Slider, InputLabel, Select, MenuItem } from '@mui/material';

// import './Caesar.scss';

interface CharacterSet {
  characters: string;
  pattern: string;
}

const characterSets: Record<string, CharacterSet> = {
  alphabetic: {
    characters: 'abcdefghijklmnopqrstuvwxyz',
    pattern: '[a-z]*'
  },
  alphanumeric: {
    characters: 'abcdefghijklmnopqrstuvwxyz0123456789',
    pattern: '[a-z0-9]*'
  },
  extended: {
    characters: Array.from(Array(95)).map((e, i) => String.fromCharCode(i + 32)).join(''),
    pattern: '[ -~]*'
  },
  unicode: {
    characters: Array.from(Array(0xFFFF - 31)).map((e, i) => String.fromCharCode(i + 32)).join(''),
    pattern: '[ -￿]*'
  },
}

const defaultCharacterSet = 'extended';

export default function Caesar() {
  const [inputValue, setInputValue] = useState('');
  const [shift, setShift] = useState(3);
  const [characterSet, setCharacterSets] = useState<CharacterSet>(characterSets[defaultCharacterSet]);
  const validate = () => RegExp(`^${characterSet.pattern}$`).test(inputValue);

  return (<Grid
    container direction="column" alignItems="center"
    style={{ minHeight: '100vh', padding: '10vh 40vw 5vh' }}
  >

    <Typography variant="h3" component="h1" align="center">
      Caesar Cipher
    </Typography>

    <TextField
      label="Input Text"
      margin='normal' variant="filled" autoFocus
      error={!validate()}
      onChange={({ target: { value } }) => setInputValue(value)}
    />

    <InputLabel>
      Amount of Shift
    </InputLabel>
    <Slider
      color="secondary" valueLabelDisplay="auto"
      step={1} min={1} max={characterSet.characters.length - 1} defaultValue={3}
      onChange={(_, value) => setShift(value as number)}
    />

    <InputLabel id="charset">
      Character Set
    </InputLabel>
    <Select
      labelId="charset"
      defaultValue={defaultCharacterSet}
      label="Character Set"
      color="secondary"
      sx={{ textTransform: 'capitalize ' }}
      onChange={({ target: { value } }) => setCharacterSets(characterSets[value])}
    >
      {Object.keys(characterSets).map(key =>
        <MenuItem
          value={key}
          sx={{ textTransform: 'capitalize ' }}
        >
          {key}
        </MenuItem>
      )}
    </Select>

    {inputValue && <TextField
      label="Encrypted Output"
      margin='normal' variant="filled"
      value={validate() ? EncryptCeasar(inputValue, shift, characterSet) : 'Error'}
    />}

  </Grid>);
}

function EncryptCeasar(input: string, shift = 3, { characters }: CharacterSet) {
  let result = '';

  for (let i = 0; i < input.length; i++)
    result += characters[(characters.indexOf(input[i]) + shift) % characters.length]

  return result;
}