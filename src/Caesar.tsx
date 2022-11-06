import React, { useState } from 'react';
import { Typography, TextField, Grid, Slider, InputLabel } from '@mui/material';

// import './Caesar.scss';

interface CharacterSet {
  characters: string;
  pattern: string;
}

const characterSets = {
  alphabet: {
    characters: 'abcdefghijklmnopqrstuvwxyz',
    pattern: '[a-z]*'
  }
} as const

export default function Caesar() {
  const [inputValue, setInputValue] = useState('');
  const [shift, setShift] = useState(3);
  const [characterSet, setCharacterSets] = useState<CharacterSet>(characterSets.alphabet);
  const validate = () => RegExp(`^${characterSet.pattern}$`).test(inputValue);

  return (<Grid
    container direction="column" alignItems="center"
    style={{ minHeight: '100vh', padding: '10vh 40vw 5vh' }}
  >

    <Typography variant="h3" component="h1" align="center">
      Caesar cipher
    </Typography>

    <TextField
      label="Input Text"
      margin='normal' variant="filled" autoFocus
      error={!validate()}
      onChange={({ target: { value } }) => setInputValue(value)}
    />

    <InputLabel >
      Amount of shift
    </InputLabel>
    <Slider
      color="secondary" valueLabelDisplay="auto"
      step={1} min={1} max={26} defaultValue={3}
      onChange={(_, value) => setShift(value as number)}
    />

    <TextField
      label="Encrypted Output"
      margin='normal' variant="filled" disabled
      value={validate() ? EncryptCeasar(inputValue, shift, characterSet) : 'Error'}
    />

  </Grid>);
}

function EncryptCeasar(input: string, shift = 3, { characters }: CharacterSet) {
  let result = '';

  for (let i = 0; i < input.length; i++)
    result += characters[(characters.indexOf(input[i]) + shift) % characters.length]

  return result;
}