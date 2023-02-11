async function currentUser(req, res, next) {
  const { user } = req;
  const { email, subscription } = user;
  res.status(200).json({
    user: {
      email: email,
      subscription: subscription,
    },
  });
}
module.exports = { currentUser };
