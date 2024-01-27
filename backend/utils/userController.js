const express = require("express");
const AWS = require("aws-sdk");
const app = express();

// gotta configure this later on
AWS.config.update({ region: "your-dynamodb-region" });

const dynamodbDocClient = new AWS.DynamoDB.DocumentClient();

exports.createUser = async (req, res) => {
  try {
    const { email, full_name, profile_pic, echoes } = req.body;

    const params = {
      TableName: "Users",
      Item: {
        full_name: full_name,
        profile_pic: profile_pic,
        echoes: echoes,
      },
    };
    await dynamodbDocClient.put(params).promise();

    res
      .status(200)
      .json({ message: "User created successfully", username: email });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const params = {
      TableName: "Users",
      Key: {
        email: email,
      },
    };
    const user = await dynamodbDocClient.get(params).promise();

    res.status(200).json({ user: user.Item });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.shareEchoWithOtherUser = async (req, res) => {
  try {
    const { email, echo } = req.body;

    const params = {
      TableName: "Users",
      Key: {
        email: email,
      },
      UpdateExpression: "SET echoes = list_append(echoes, :echo)",
      ExpressionAttributeValues: {
        ":echo": [echo],
      },
    };
    await dynamodbDocClient.update(params).promise();

    res.status(200).json({ message: "Echo shared successfully" });
  } catch (error) {
    console.error("Error sharing echo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
