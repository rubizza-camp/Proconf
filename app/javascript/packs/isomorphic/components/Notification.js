import notification from './Feedback/Notification';

const createNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};
export default createNotification;
