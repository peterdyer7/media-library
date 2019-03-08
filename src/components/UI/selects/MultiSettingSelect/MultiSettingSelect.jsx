import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export default function MultiSettingSelect({
  values,
  label,
  id,
  handleChange
}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const temp = values.map((value) => ({ value: value, label: value }));
    setOptions(temp);
  }, []);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Select
        id={id}
        name={id}
        options={options}
        isMulti
        onChange={handleChange}
      />
    </>
  );
}

MultiSettingSelect.propTypes = {
  values: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
