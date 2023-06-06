require('backend/spec/mongodb_helper');
const mongoose = require('mongoose');
const Message = require('../../models/message');

describe('Message Model Test', () => {
  it('create & save message successfully', async () => {
    const chatId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();

    const messageData = {
      chat: chatId,
      sender: userId,
      text: 'Hello World',
    };

    const validMessage = new Message(messageData);
    const savedMessage = await validMessage.save();

    expect(savedMessage._id).toBeDefined();
    expect(savedMessage.chat).toEqual(chatId);
    expect(savedMessage.sender).toEqual(userId);
    expect(savedMessage.text).toBe(messageData.text);
    expect(savedMessage.timestamp).toBeDefined();
  });

  it('insert message successfully, but the field not defined in schema should be undefined', async () => {
    const chatId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();

    const messageWithInvalidField = new Message({
      chat: chatId,
      sender: userId,
      text: 'Hello World',
      extraField: 'extra',
    });
    const savedMessageWithInvalidField = await messageWithInvalidField.save();
    expect(savedMessageWithInvalidField._id).toBeDefined();
    expect(savedMessageWithInvalidField.extraField).toBeUndefined();
  });

  it('create message without required field should failed', async () => {
    const messageWithoutRequiredField = new Message({
      chat: '60cc884e4a7a883a7c0b02f8',
    });
    let err;
    try {
      const savedMessageWithoutRequiredField =
        await messageWithoutRequiredField.save();
      error = savedMessageWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.text).toBeDefined();
  });
});
