/*
 *
 * Tasks constants
 *
 */

/**
 *  Tasks action types
 *  @type {string}
 */
export const INITIALIZE_TASKS = 'ocpui/Tasks/INITIALIZE_TASKS';
export const GET_TASKS = 'ocpui/Tasks/GET_TASKS';
export const GET_TASKS_SUCCESS = 'ocpui/Tasks/GET_TASKS_SUCCESS';
export const GET_TASKS_ERROR = 'ocpui/Tasks/GET_TASKS_ERROR';
export const SEARCH_TASKS = 'ocpui/Tasks/SEARCH_TASKS';
export const SEARCH_TASKS_SUCCESS = 'ocpui/Tasks/SEARCH_TASKS_SUCCESS';
export const CANCEL_TASK = 'ocpui/Tasks/CANCEL_TASK';
export const CANCEL_TASK_SUCCESS = 'ocpui/Tasks/CANCEL_TASK_SUCCESS';
export const CANCEL_TASK_ERROR = 'ocpui/Tasks/CANCEL_TASK_ERROR';

/**
 *  Other constants
 *
 */

export const CANCELLED_STATUS_CODE = 'cancelled';
export const FAILED_STATUS_CODE = 'failed';
export const COMPLETED_STATUS_CODE = 'completed';

export const DEFAULT_TASK_STATUS_CODE = '';

export const SUMMARY_VIEW_WIDTH = 700; // The width of the panel in pixels
