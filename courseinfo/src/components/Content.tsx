import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} part={coursePart} />
      ))}
    </div>
  );
};

export default Content;
