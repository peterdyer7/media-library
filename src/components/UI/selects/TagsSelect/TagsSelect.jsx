import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/lib/Creatable';
import { Form, Label } from 'semantic-ui-react';

export default function TagsSelect({
  tags,
  boundSettingAdd,
  onChange,
  onBlur,
  value,
  error,
  touched
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const opts = tags.map((o) => ({ value: o, label: o }));
    setOptions(opts);
  }, []);

  const handleChange = (value) => {
    onChange('tags', value);
  };

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    const newOption = { value: inputValue, label: inputValue };
    setIsLoading(false);
    setOptions([...options, newOption]);

    if (value) {
      onChange('tags', [...value, newOption]);
    } else {
      onChange('tags', [newOption]);
    }
    boundSettingAdd('imageMetadata', 'tags', inputValue);
  };

  const handleBlur = () => {
    onBlur('tags', true);
  };

  return (
    <Form.Field>
      <label htmlFor="tagsInput">Tags</label>
      <CreatableSelect
        id="tagsInput"
        options={options}
        isLoading={isLoading}
        isMulti
        onChange={handleChange}
        onCreateOption={handleCreate}
        onBlur={handleBlur}
        value={value}
      />
      {!!error && touched && <Label pointing>{error}</Label>}
    </Form.Field>
  );
}

TagsSelect.propTypes = {
  tags: PropTypes.array,
  boundSettingAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.array,
  error: PropTypes.string,
  touched: PropTypes.oneOfType([PropTypes.array, PropTypes.bool])
};
