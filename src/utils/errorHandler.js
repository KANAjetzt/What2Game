export const removeMessage = (messages, location) => {
  const errorIndex = messages.findIndex(
    message => message.location === location
  );
  if (errorIndex !== -1) {
    messages.splice(errorIndex, 1);
    return messages;
  } else {
    return messages;
  }
};

export const addMessage = (messages, type, location, message) => {
  // If the message doesn't exist already
  if (messages.findIndex(m => m.message === message) === -1) {
    // Add the new error message to the array
    return [
      ...messages,
      {
        type,
        location,
        message
      }
    ];
  } else {
    return messages;
  }
};
