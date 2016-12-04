const UserLevel = {
  ASSOCIATE: 1,
  REGULAR: 2,

  getRenderer(mapUserLevelToRenderer, userLevel) {
    return mapUserLevelToRenderer[userLevel] ||
      mapUserLevelToRenderer.default;
  }
};

export default UserLevel;
