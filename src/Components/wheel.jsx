import React, { useState } from 'react';

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig'];

const Wheel = () => {
  const [selected, setSelected] = useState(null);

  const spin = () => {
    const index = Math.floor(Math.random() * items.length);
    setSelected(items[index]);
  };

  return (
    <div>
      <button onClick={spin}>Spin the Wheel</button>
      {selected && <p style={{ marginTop: '1rem' }}>🎉 You got: {selected}</p>}
    </div>
  );
};

export default Wheel;