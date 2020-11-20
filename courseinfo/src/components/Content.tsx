import React from 'react';

interface CoursePart {
  exerciseCount: number;
  name: string;
}

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      {props.courseParts.map((coursePart) => (
        <p key={coursePart.name}>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
