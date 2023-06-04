require('backend/spec/mongodb_helper');
const sinon = require('sinon');
// require('sinon-mongoose');

const Chat = require('../../models/chat'); // assuming the Chat model is in the same directory
const User = require('../../models/user'); // assuming the User model is in the same directory

describe('Chat Model Test', () => {
  let userSave;
  let userMock;

  beforeAll(() => {
    userSave = sinon.stub(User.prototype, 'save');
    userMock = sinon.mock(User);
  });

  afterAll(() => {
    userSave.restore();
    userMock.restore();
  });

  test('create and save chat successfully', async () => {
    const user1 = new User({
      name: 'testname1',
      email: 'testemail1@gmail.com',
    }); // assuming User has name and email fields
    const user2 = new User({
      name: 'testname2',
      email: 'testemail2@gmail.com',
    });

    userSave.resolves(user1);
    await user1.save();

    userSave.resolves(user2);
    await user2.save();

    const chatData = {
      chat_id: 'samplechatid',
      participants: [user1._id, user2._id],
    };

    const validChat = new Chat(chatData);
    const savedChat = await validChat.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedChat._id).toBeDefined();
    expect(savedChat.chat_id).toBe(chatData.chat_id);
    expect(savedChat.participants).toEqual(
      expect.arrayContaining(chatData.participants)
    );
    expect(savedChat.created_at).toBeDefined();
    expect(savedChat.updated_at).toBeDefined();
  });

  // You should also add some tests to check for invalid data (required fields missing, etc.)
});
