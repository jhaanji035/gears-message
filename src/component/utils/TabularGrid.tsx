import React from 'react';

const TabularGrid = (props: any) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th align='left'>Title</th>
            <th align='left'>Image</th>

          </tr>
        </thead>
        <tbody>
          {props.data.map((item: any, index: any) => (
            <tr key={index}>
              <td align='left' width="500">{item.title}</td>
              <td align='left'><img src={item.images.preview_gif.url} alt={item.title} height="100" width="100" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default TabularGrid;
