import React from 'react';

const RenderConditionally = ({ children, condition }) => (condition ? children : '');

export default RenderConditionally;
