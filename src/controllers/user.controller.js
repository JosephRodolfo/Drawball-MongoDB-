const express = require("express");
const User = require("../models/user.model");

const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ response: "Sorry, that didn't work" });
  }
};

const logout = async (req, res) => {
    console.log(req);
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    await req.user.remove();

    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

const returnSelf = async (req, res) => {
  res.send(req.user);
};

module.exports = {
    returnSelf,
    createUser,
    deleteUser,
    login,
    logout,
    logoutAll,
    updateUser
};
