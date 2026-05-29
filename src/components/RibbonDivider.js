import React from 'react';

function RibbonDivider() {
  return (
    <div className="ribbon-divider container" aria-hidden="true">
      <svg
        className="ribbon-divider__svg"
        viewBox="0 0 360 190"
        role="img"
        aria-label="리본 장식"
      >
        <path
          pathLength="1"
          className="ribbon-divider__tail ribbon-divider__tail--left"
          d="M154 93 C112 73 75 75 45 101 C76 113 106 118 143 104"
                />
        <path
          pathLength="1"
          className="ribbon-divider__tail ribbon-divider__tail--right"
          d="M206 93 C248 73 285 75 315 101 C284 113 254 118 217 104"
                />
        <path
          pathLength="1"
          className="ribbon-divider__loop ribbon-divider__loop--left"
          d="M180 95 C157 53 105 57 113 100 C121 142 163 126 180 95 Z"
                />
        <path
          pathLength="1"
          className="ribbon-divider__loop ribbon-divider__loop--right"
          d="M180 95 C203 53 255 57 247 100 C239 142 197 126 180 95 Z"
                />
        <path
          pathLength="1"
          className="ribbon-divider__knot"
          d="M164 85 C174 76 186 76 196 85 C202 94 198 107 188 113 C181 118 170 116 163 109 C155 101 156 92 164 85 Z"
                />
        <path
          pathLength="1"
          className="ribbon-divider__string ribbon-divider__string--left"
          d="M163 104 C126 138 82 144 36 123"
                />
        <path
          pathLength="1"
          className="ribbon-divider__string ribbon-divider__string--right"
          d="M197 104 C234 138 278 144 324 123"
                />
        <path
          pathLength="1"
          className="ribbon-divider__fold ribbon-divider__fold--left"
          d="M146 98 C132 93 123 96 115 105"
                />
        <path
          pathLength="1"
          className="ribbon-divider__fold ribbon-divider__fold--right"
          d="M214 98 C228 93 237 96 245 105"
                />
      </svg>
      <p className="ribbon-divider__text">Our Wedding Day</p>
    </div>
  );
}

export default RibbonDivider;
