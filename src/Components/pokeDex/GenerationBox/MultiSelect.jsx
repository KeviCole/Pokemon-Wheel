import { Children, cloneElement, isValidElement } from 'react'
import { Checkbox, FormControl, InputLabel, ListItemText, OutlinedInput, Select } from '@mui/material'

export function MultiSelect({
  label,
  value,
  onChange,
  children,
  size = 'small',
  fullWidth = true,
  ...selectProps
}) {
  const items = Children.toArray(children).filter(isValidElement)

  // value -> display text, used for the closed-state summary
  const labels = new Map(
    items.filter((i) => i.props.value !== undefined).map((i) => [i.props.value, i.props.children])
  )

  // Add a checkbox to every child that has a value; pass others (e.g. Divider) through
  const withCheckboxes = items.map((item) =>
    item.props.value === undefined
      ? item
      : cloneElement(
        item,
        {},
        <Checkbox checked={value?.includes(item.props.value)}/>,
        <ListItemText primary={item.props.children}/>
      )
  )

  return <FormControl size={size} fullWidth={fullWidth}>
    {label && <InputLabel>{label}</InputLabel>}
    <Select
      multiple
      value={value}
      onChange={onChange}
      input={<OutlinedInput label={label}/>}
      renderValue={(selected) => selected.map((v) => labels.get(v) ?? v).join(', ')}
      {...selectProps}
    >
      {withCheckboxes}
    </Select>
  </FormControl>
}