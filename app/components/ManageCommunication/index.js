/**
 *
 * ManageCommunication
 *
 */

import React from 'react';
import yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import find from 'lodash/find';
import Util from 'utils/Util';
import { getPatientName } from 'utils/PatientUtils';
import { isUndefined } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import { FormattedMessage } from 'react-intl';
import ManageCommunicationForm from './ManageCommunicationForm';
import messages from './messages';
import { APPOINTMENT, PATIENT, PRACTITIONER, TASK, TEXT_AREA_MAX_LENGTH, TEXT_AREA_MIN_LENGTH } from './constants';


function ManageCommunication(props) {
  const {
    onSave,
    communicationStatus,
    communicationCategories,
    communicationNotDoneReasons,
    communicationMedia,
    episodeOfCares,
    handleOpen,
    selectedRecipients,
    handleRemoveRecipient,
    selectedPatient,
    communication,
    practitioner,
    initialSelectedRecipients,
    editMode,
    selectedTask,
    selectedAppointment,
    datePickerMode,
  } = props;
  const propsFromContainer = {
    communicationStatus,
    communicationCategories,
    communicationNotDoneReasons,
    communicationMedia,
    episodeOfCares,
    handleOpen,
    selectedRecipients,
    handleRemoveRecipient,
    selectedPatient,
    practitioner,
    initialSelectedRecipients,
    datePickerMode,
  };
  const textAreaMaxLength = TEXT_AREA_MAX_LENGTH;
  const textAreaMinLength = TEXT_AREA_MIN_LENGTH;


  function setInitialValues(currentCommunication, patient, currentPractitioner, task, appointment, categories, episodeOfCareList) {
    let formData = null;
    let subjectData = null;
    let senderData = null;
    let communicationData = null;
    let topicData = null;
    let categoryData = null;
    let episodeOfCareData = null;
    if (!isEmpty(patient)) {
      subjectData = merge(
        mapToParticipantName(patient, 'subject'),
      );
    }
    if (!isEmpty(currentPractitioner)) {
      senderData = merge(
        mapToParticipantName(currentPractitioner, 'sender'),
      );
    }

    categoryData = mapToDefaultCategoryToInstruction(categories, 'categoryDisplay');

    episodeOfCareData = mapToDefaultEpisodeOfCare(episodeOfCareList, 'episodeOfCareCode');

    if (!isEmpty(currentCommunication)) {
      communicationData = merge(
        mapToFormField(currentCommunication, 'notDone'),
        mapToFormField(currentCommunication, 'notDoneReasonCode'),
        mapToFormField(currentCommunication, 'payloadContent'),
        mapToFormField(currentCommunication, 'note'),
        mapToFormField(currentCommunication, 'mediumCode'),
        getEpisodeOfCareCodeReference(currentCommunication, 'context'),
        mapToTopicFromCommunication(currentCommunication),
        mapToFormField(currentCommunication, 'statusCode'),
      );
    }

    if (isEmpty(currentCommunication) && !isEmpty(task)) {
      topicData = merge(
        mapToTopicFromTask(task),
      );
    }
    if (isEmpty(currentCommunication) && !isEmpty(appointment)) {
      topicData = merge(
        mapToTopicFromAppointment(appointment),
      );
    }

    formData = merge(subjectData, senderData, communicationData, topicData, categoryData, episodeOfCareData);
    return Util.pickByIdentity(formData);
  }

  function mapToParticipantName(participant, fieldName) {
    const fieldObject = {};
    if (!isUndefined(fieldName) && participant && participant.name && participant.name.length > 0) {
      fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(getPatientName(participant.name[0]));
    }
    return fieldObject;
  }

  function mapToDefaultEpisodeOfCare(episodeOfCareList, fieldName) {
    const fieldObject = {};
    if (!isEmpty(episodeOfCareList) && episodeOfCareList.length > 0) {
      fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(episodeOfCareList[0].display);
    }
    return fieldObject;
  }

  function mapToDefaultCategoryToInstruction(categories, fieldName) {
    const category = find(categories, { code: 'instruction' });
    const fieldObject = {};
    fieldObject[fieldName] = '';
    if (category && category.display) {
      fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(category.display);
    }
    return fieldObject;
  }


  function mapToTopicFromCommunication(currentCommunication) {
    const fieldObject = { topic: '' };
    if (currentCommunication && currentCommunication.topic && currentCommunication.topic.display) {
      fieldObject.topic = Util.setEmptyStringWhenUndefined(currentCommunication.topic.display);
    }
    return fieldObject;
  }

  function mapToTopicFromTask(task) {
    const fieldObject = { topic: '' };
    if (task && task.description) {
      fieldObject.topic = Util.setEmptyStringWhenUndefined(task.description);
    }
    return fieldObject;
  }

  function mapToTopicFromAppointment(appointment) {
    const fieldObject = { topic: '' };
    if (appointment && appointment.description) {
      fieldObject.topic = Util.setEmptyStringWhenUndefined(appointment.description);
    }
    return fieldObject;
  }

  function mapToCommunication(values,
                              statusList,
                              categories,
                              notDoneReasons,
                              media,
                              episodeOfCareList,
                              patient,
                              currentPractitioner,
                              recipients,
                              task,
                              appointment,
                              sentTime) {
    const {
      statusCode,
      categoryDisplay,
      notDoneReasonCode,
      mediumCode,
      notDone,
      payloadContent,
      note,
      episodeOfCareCode,
    } = values;
    const status = find(statusList, { code: statusCode });
    const category = find(categories, { code: 'instruction' });
    const notDoneReason = find(notDoneReasons, { code: notDoneReasonCode });
    const medium = find(media, { code: mediumCode });
    const episodeOfCare = find(episodeOfCareList, { display: episodeOfCareCode });

    const currentCommunication = {
      note,
      payloadContent,
      notDone,
      sent: sentTime,
      statusCode,
      statusValue: status.display,
      categoryCode: category.code,
      categoryValue: categoryDisplay,
      notDoneReasonCode,
      notDoneReasonValue: notDoneReason ? notDoneReason.display : '',
      mediumCode,
      mediumValue: medium.display, // TODO fix tipo in key
      subject: createReferenceObject(patient, PATIENT),
      sender: createReferenceObject(currentPractitioner, PRACTITIONER), // TODO get this dynamically
      context: episodeOfCare,
      definition: createEmptyReference(),
      recipient: recipients, // TODO change to recipients
    };

    if (task) {
      currentCommunication.topic = getTopicReference(task, TASK);
    } else if (appointment) {
      currentCommunication.topic = getTopicReference(appointment, APPOINTMENT);
    }
    return currentCommunication;
  }

  function createReferenceObject(object, referenceName) {
    return {
      reference: getReference(object, referenceName),
      display: getDisplay(object),
    };
  }

  function getEpisodeOfCareCodeReference(referenceObject, referenceName) {
    const episodeOfCareObject = { episodeOfCareCode: '' };
    if (referenceObject && referenceObject[referenceName] && referenceObject[referenceName].reference) {
      episodeOfCareObject.episodeOfCareCode = referenceObject[referenceName].reference;
    }
    return episodeOfCareObject;
  }

  function getTopicReference(referenceObject, referenceName) {
    return {
      reference: getReference(referenceObject, referenceName),
      display: referenceObject && referenceObject.description ? referenceObject.description : '',
    };
  }

  function getReference(object, referenceName) {
    let referenceObject = '';
    if (object.id && referenceName) {
      referenceObject = referenceName.concat('/').concat(object.id);
    } else if (object.logicalId && referenceName) {
      referenceObject = referenceName.concat('/').concat(object.logicalId);
    }
    return referenceObject;
  }

  function getDisplay(object) {
    if (object.name && object.name.length > 0) {
      const name = object.name[0];
      return (name.firstName && name.lastName) ? name.firstName.concat(' ').concat(name.lastName) : '';
    }
    return '';
  }

  function createEmptyReference() {
    return {
      reference: '',
      display: '',
    };
  }

  function mapToFormField(entity, fieldName) {
    const fieldObject = {};
    if (!isUndefined(entity[fieldName])) {
      fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(entity[fieldName]);
    }
    return fieldObject;
  }

  return (
    <Formik
      isInitialValid={editMode}
      initialValues={setInitialValues(communication, selectedPatient, practitioner, selectedTask, selectedAppointment, communicationCategories, episodeOfCares)}
      enableReinitialize
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        const sentDateTime = communication && communication.sent ? communication.sent : '';
        const communicationToBeSubmitted = mapToCommunication(
          values,
          communicationStatus,
          communicationCategories,
          communicationNotDoneReasons,
          communicationMedia,
          episodeOfCares,
          selectedPatient,
          practitioner,
          selectedRecipients,
          selectedTask,
          selectedAppointment,
          sentDateTime
          );
        onSave(communicationToBeSubmitted, actions);
      }}
      validationSchema={
        yup.object().shape({
          statusCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          mediumCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          payloadContent: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .max(textAreaMaxLength, (
              <FormattedMessage {...messages.validation.textAreaMaxLength} values={{ textAreaMaxLength }} />))
            .min(textAreaMinLength, (
              <FormattedMessage {...messages.validation.textAreaMinLength} values={{ textAreaMinLength }} />)),
        })
      }
      render={(formikProps) => <ManageCommunicationForm {...formikProps} {...propsFromContainer} />}
    />
  );
}

ManageCommunication.propTypes = {
  onSave: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  communicationStatus: PropTypes.array.isRequired,
  communicationCategories: PropTypes.array.isRequired,
  communicationNotDoneReasons: PropTypes.array.isRequired,
  communicationMedia: PropTypes.array.isRequired,
  episodeOfCares: PropTypes.array.isRequired,
  selectedRecipients: PropTypes.array,
  initialSelectedRecipients: PropTypes.array,
  selectedPatient: PropTypes.object.isRequired,
  communication: PropTypes.object,
  handleRemoveRecipient: PropTypes.func.isRequired,
  practitioner: PropTypes.object,
  editMode: PropTypes.bool,
  selectedTask: PropTypes.object,
  selectedAppointment: PropTypes.object,
  datePickerMode: PropTypes.object.isRequired,
};

export default ManageCommunication;

