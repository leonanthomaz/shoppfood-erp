import React from 'react';
import NumberFormat from 'react-number-format';
import { TextField } from '@mui/material';

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value, onChange }) => {
  const handleValueChange = (values: { value: string; formattedValue: string }) => {
    onChange(parseFloat(values.value));
  };

  return (
    <NumberFormat
      customInput={TextField as any}
      label="Preço"
      value={value}
      onValueChange={handleValueChange}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      inputProps={{ margin: 'normal', fullWidth: true }}
    />
  );
};

export default PriceInput;
