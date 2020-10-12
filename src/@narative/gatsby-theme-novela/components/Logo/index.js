import React from 'react';

/**
 * Paste in your SVG logo and return it from this component.
 * Make sure you have a height set for your logo.
 * It is recommended to keep the height within 25-35px.
 * Logo comes with a property value called `fill`. `fill` is useful 
 * when you want to change your logo depending on the theme you are on. 
 */
export default function Logo({ fill }) {
  return (
    <svg height="30" width="130" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="15" r="10"/>
      <text
        fontWeight="normal"
        textAnchor="start"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="24"
        y="22"
        x="30"
        strokeWidth="0"
        fill={fill}>
          JOSE JESUS
      </text>
    </svg>
  );
}