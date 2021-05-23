export const alert = {
  message: null,
  setMessage(value) {
    this.message = value;
    setTimeout(() => {
      this.message = null;
    }, 3000);
  },
};
