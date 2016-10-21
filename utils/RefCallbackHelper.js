const RefCallbackHelper = {
  generate(reactComponent, refName) {
    return ref => {
      reactComponent[refName] = ref;
    };
  }
};

export default RefCallbackHelper;
