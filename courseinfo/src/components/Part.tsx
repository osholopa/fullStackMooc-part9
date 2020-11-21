import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = (props) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const renderSwitch = (part: CoursePart) => {
    switch (part.name) {
      case 'Fundamentals':
        return <p>{part.description}</p>;

      case 'Using props to pass data':
        return (
          <div>
            <p>{part.groupProjectCount}</p>
          </div>
        );

      case 'Deeper type usage':
        return (
          <div>
            <p>{part.description}</p>
            <p>{part.exerciseSubmissionLink}</p>
          </div>
        );

        case 'Moodle exam':
        return (
          <div>
            <p>{part.description}</p>
            <p>max hours: {part.maxHours}</p>
          </div>
        );

      default:
        assertNever(part);
        break;
    }
  };

  return (
    <div style={{marginTop: 40}}>
      <p>
        {props.part.name} {props.part.exerciseCount}
      </p>
      {renderSwitch(props.part)}
    </div>
  );
};

export default Part;
