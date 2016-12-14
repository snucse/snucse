const UserLevel = {
  ASSOCIATE: 1,
  REGULAR: 2,

  tagAccessible(userLevel) {
    return userLevel === this.REGULAR;
  }
};

export default UserLevel;
