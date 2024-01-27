const updateEntity = require('../utils/updateEntity');

const addFriend = async(req, res, next) => {
  const response = await updateEntity(
    {
      user: req.body.email
    },
    process.env.AWS_DYNAMODB_TABLE_USERS,
    `SET friends = list_append(friends, :friend)`,
    { ':friend': req.body.friend }
  );
  res.send(response);
};

module.exports = addFriend;
