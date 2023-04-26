// import React from 'react';
// import Card from './Card';

// function Table({ children }) {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//       }}
//     >
//       <div
//         style={{
//           width: '500px',
//           height: '500px',
//           border: '1px solid black',
//           display: 'flex',
//           flexWrap: 'wrap',
//         }}
//       >
//         {React.Children.map(children, (child, index) => (
//           <div
//             key={index}
//             style={{
//               width: '50%',
//               height: '50%',
//               position: 'relative',
//             }}
//           >
//             <Card
//               cardInfo={child.props.cardInfo}
//               left={index % 2 === 0 ? '10px' : '240px'}
//               rotate={index % 2 === 0 ? '-10deg' : '10deg'}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Table;

import React from 'react';
import Card from './Card';

const Table = ({ trumpCard }) => {
  const tableWidth = 800;
  const tableHeight = 400;
  const cardWidth = 71;
  const cardHeight = 96;
  const scaleFactor = 0.3;

  const tableStyle = {
    position: 'relative',
    width: `${tableWidth}px`,
    height: `${tableHeight}px`,
    backgroundColor: 'darkgreen',
    borderRadius: '10px',
    border: '2px solid black',
    margin: '20px auto',
    padding: '20px',
  };

  const trumpCardStyle = {
    position: 'absolute',
    top: '40px',
    left: '40px',
    transform: `scale(${scaleFactor})`,
  };

  const titleStyle = {
    position: 'absolute',
    top: '25px',
    left: '40px',
    color: 'white',
    fontSize: '10px',
  };

  return (
    <div style={tableStyle}>
      <svg width={tableWidth} height={tableHeight}>
        <rect
          x="0"
          y="0"
          width={tableWidth}
          height={tableHeight}
          fill="none"
          stroke="black"
          strokeWidth="2"
          rx="10"
          ry="10"
        />
      </svg>
      <div style={trumpCardStyle}>
        <Card cardInfo={trumpCard} />
      </div>
      <div style={titleStyle}>Trump Card</div>
    </div>
  );
};

export default Table;