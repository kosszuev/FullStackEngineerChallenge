import { projectStorage } from "@/firebase/config";

const storage = {
  error: null,
  url: null,

  async uploadImage(endPoint, file) {
    const storageRef = projectStorage.ref(endPoint);
    try {
      const res = await storageRef.put(file);
      this.url = await res.ref.getDownloadURL();
    } catch (e) {
      this.error = e.message;
    }
  },

  async deleteImage(imgPath) {
    await projectStorage
      .ref(imgPath)
      .delete()
      .then(() => console.log("Image is deleted"));
  },
};

export default storage;
