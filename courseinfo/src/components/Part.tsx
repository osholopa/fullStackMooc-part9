import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const renderSwitch = (part: CoursePart) => {
    switch (part.name) {
      case 'Fundamentals':
        return <p> description: {part.description}</p>;

      case 'Using props to pass data':
        return (
          <div>
            <p>group project count: {part.groupProjectCount}</p>
          </div>
        );

      case 'Deeper type usage':
        return (
          <div>
            <p>description: {part.description}</p>
            <p>submission link: {part.exerciseSubmissionLink}</p>
          </div>
        );

      case 'Moodle exam':
        return (
          <div>
            <p>description: {part.description}</p>
            <p>max hours: {part.maxHours}</p>
          </div>
        );

      default:
        assertNever(part);
        break;
    }
  };

  return (
    <div style={{ marginTop: 40 }}>
      <p>
        {part.name} {part.exerciseCount}
      </p>
      {renderSwitch(part)}
    </div>
  );
};

export default Part;
