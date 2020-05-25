import Axios from "axios";

const databaseInstance = Axios.create({
    baseURL: "https://my-burger-application-32a9f.firebaseio.com"
});

export default databaseInstance;