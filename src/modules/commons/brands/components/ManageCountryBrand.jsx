import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from 'antd';

const ManageCountryBrand = (props) => {


  const [columns, setColumns] = useState(props.columnsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      props.data(removed, destination.droppableId);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <DragDropContext onDragEnd={ (result) => onDragEnd(result, columns, setColumns) }>
      <div className="site-card-border-less-wrapper">
        <div style={ { display: "flex" } }>
          <div style={ { margin: "8px", display: "flex", width: "100%", minHeight: "30vh" } }>
            { Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Card title={ column.title } className='da-mr-36' style={ { width: 500 } } key={ index }>
                  <div style={ { height: "300px", overflow: "auto", paddingRight: "20px" } }>
                    <Droppable key={ columnId } droppableId={ columnId }>
                      { (provided, snapshot) => (
                        <div
                          ref={ provided.innerRef }
                          style={ { height: "300px" } }
                        >
                          { column.items.map((item, index) => (
                            <Draggable key={ index } draggableId={ `'${item.id}'` } index={ index }>
                              { (provided) => (
                                <div
                                  ref={ provided.innerRef }
                                  { ...provided.draggableProps }
                                  { ...provided.dragHandleProps }
                                >
                                  <p style={ { border: "solid 2px lightgrey", padding: "5px", borderRadius: "5px", cursor: "move" } }>{ item.name }</p>
                                </div>
                              ) }
                            </Draggable>
                          )) }
                          { provided.placeholder }
                        </div>
                      ) }
                    </Droppable>
                  </div>
                </Card>
              );
            }) }
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default ManageCountryBrand;
