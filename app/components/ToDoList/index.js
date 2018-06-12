/**
*
* TodoList
*
*/

import React from 'react';
import isEmpty from 'lodash/isEmpty';
import sizeMeHOC from 'utils/SizeMeUtils';
import PropTypes from 'prop-types';
import Padding from 'components/Padding';
import ToDoAccordion from 'components/ToDoAccordion';
import {
  SUMMARY_VIEW_WIDTH, SUMMARIZED_TABLE_COLUMNS, EXPANDED_TABLE_COLUMNS,
} from 'components/ToDoList/constants';

function ToDoList(props) {
  const { toDos, taskBaseUrl, patientId, isPatient, isPractitioner, openDialog, size } = props;
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
  return (
    <div>
      <Padding top={'10px'} right={'10px'} bottom={'10px'} left={'10px'}>
        {toDos && toDos.length > 0 &&
        <div>
          {!isEmpty(toDos) && toDos.map((toDo) =>
              (<ToDoAccordion
                key={toDo.logicalId}
                columns={columns}
                toDoLogicalId={toDo.logicalId}
                description={toDo.description}
                status={toDo.taskDue}
                taskBaseUrl={taskBaseUrl}
                isPractitioner={isPractitioner}
                isPatient={isPatient}
                patientId={patientId}
                openDialog={openDialog}
                patientName={toDo.beneficiary.display}
                dueDate={toDo.executionPeriod && toDo.executionPeriod.end}
              >
              </ToDoAccordion>)
            )
          }
        </div>
      }
      </Padding>
    </div>
  );
}

ToDoList.propTypes = {
  toDos: PropTypes.array.isRequired,
  patientId: PropTypes.string,
  taskBaseUrl: PropTypes.string,
  isPatient: PropTypes.bool,
  isPractitioner: PropTypes.bool,
  openDialog: PropTypes.func,
  size: PropTypes.object,
};

export default sizeMeHOC(ToDoList);
