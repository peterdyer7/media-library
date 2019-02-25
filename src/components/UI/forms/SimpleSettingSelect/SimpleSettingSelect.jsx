import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Form, Label } from 'semantic-ui-react';

// setting = 'primaryCategory'
export default function SimpleSettingSelect({
  value,
  error,
  touched,
  onChange,
  onBlur,
  setting,
  settingLabel,
  settingList
}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const opts = settingList.map((o) => ({ value: o, label: o }));
    setOptions(opts);
  }, []);

  const handleChange = (value) => {
    onChange(setting, value);
  };

  const handleBlur = () => {
    onBlur(setting, true);
  };

  return (
    <Form.Field>
      <label htmlFor={`${setting}Select`}>{settingLabel}</label>
      <Select
        id={`${setting}Select`}
        name={setting}
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      {!!error && touched && <Label pointing>{error}</Label>}
    </Form.Field>
  );
}

SimpleSettingSelect.propTypes = {
  value: PropTypes.object,
  error: PropTypes.string,
  touched: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  setting: PropTypes.string.isRequired,
  settingLabel: PropTypes.string.isRequired,
  settingList: PropTypes.array.isRequired
};
