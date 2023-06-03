import React from 'react';

const TabularGrid = (props: any) => {
  return (
    <div className="message-gears-grid">  
      <table>
        <thead className='fixed-header-grid'>
          <tr>
            <th align='left'>Title</th>
            <th align='left'>GIF Image</th>
            <th align='left'>User Avator</th>
            <th align='left'>User Name</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item: any, index: any) => (
            <tr key={index}>
              <td align='left' width="500" className="popover">{item.title} 
              <div className="popover-content">
                <h1>GIF Details</h1>
                <p><strong>Title:</strong> {item.title} </p>
                <p><strong>Username:</strong> {item.username} </p>
                <p><strong>Source:</strong>{item.source} </p>
                <p><strong>Rating:</strong>{item.rating} </p>
                <p><strong>Date Time:</strong>{item.import_datetime} </p>
                <p><strong>Description:</strong>{item.description}</p>
                <p><strong>Display name:</strong>{item.display_name}</p>
              </div>
              </td>
              <td align='left'><img src={item.images.preview_gif.url} alt={item.title} height="100" width="100" /></td>
              <td align='left'>{item.user ? <img src={ item.user.avatar_url}  height="100" width="100" /> : '--'}</td>
              <td align='left' >{item.user ? item.user.display_name : '--'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default TabularGrid;
