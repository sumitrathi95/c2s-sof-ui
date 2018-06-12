/*
 *
 * Tasks actions
 *
 */

import {
  CANCEL_TASK,
  CANCEL_TASK_ERROR,
  CANCEL_TASK_SUCCESS,
  GET_TASKS,
  GET_TASKS_ERROR,
  GET_TASKS_SUCCESS,
  SEARCH_TASKS,
  SEARCH_TASKS_SUCCESS,
  INITIALIZE_TASKS,
} from './constants';

export function initializeTasks() {
  return {
    type: INITIALIZE_TASKS,
  };
}

export function getTasks(practitionerId, patientId, statusList) {
  return {
    type: GET_TASKS,
    practitionerId,
    patientId,
    statusList,
  };
}

export function getTasksSuccess(tasksPage) {
  return {
    type: GET_TASKS_SUCCESS,
    tasksPage,
  };
}

export function getTasksError(error) {
  return {
    type: GET_TASKS_ERROR,
    error,
  };
}

export function searchTasks(searchType, searchValue, currentPage) {
  return {
    type: SEARCH_TASKS,
    searchType,
    searchValue,
    currentPage,
  };
}

export function searchTasksSuccess(tasks) {
  return {
    type: SEARCH_TASKS_SUCCESS,
    tasks,
  };
}

export function cancelTask(id) {
  return {
    type: CANCEL_TASK,
    id,
  };
}

export function cancelTaskSuccess(id) {
  return {
    type: CANCEL_TASK_SUCCESS,
    id,
  };
}

export function cancelTaskError(error) {
  return {
    type: CANCEL_TASK_ERROR,
    error,
  };
}
