require('backend/spec/mongodb_helper');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Message = require('../../models/message');

describe('Message Model Test', () => {
  beforeAll(() => {
    sinon.stub(Message.prototype, 'save').callsFake(function fakeFn() {
      this._id = this._id || '5fb3f2e0f0a0d4823f4f4f71';
      this.timestamp = this.timestamp || Date.now();
      return Promise.resolve(this);
    });
  });
  afterAll(() => {
    Message.prototype.save.restore();
  });

  it('create & save message successfully', async () => {
    const messageData = {
      chat: 'chatId',
      sender: 'userId',
      text: 'Hello World',
    };
    const validMessage = new Message(messageData);
    const savedMessage = await validMessage.save();

    expect(savedMessage._id).toBeDefined();
    expect(savedMessage.chat).toBe(messageData.chat);
    expect(savedMessage.sender).toBe(messageData.sender);
    expect(savedMessage.text).toBe(messageData.text);
    expect(savedMessage.timestamp).toBeDefined();
  });

  it('insert message successfully, but the field not defined in schema should be undefined', async () => {
    const messageWithInvalidField = new Message({
      chat: 'chatId',
      sender: 'userId',
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
