/* eslint linebreak-style: ["error","windows"] */
import React from 'react';

export default function ProductImage({ match }) {
  const { id } = match.params;
  return (
    <div>
      <br />
      <br />
      <img src={id} alt="not found" />
    </div>
  );
}