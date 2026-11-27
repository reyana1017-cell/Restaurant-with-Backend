import app from "./app.js";
import { config } from "./config/env.js";
 
app.listen(config.port, () => {
    console.log(".......................................");
    console.log("reana's restaurant backend");
    console.log(".......................................");

    console.log(`Server running at http://localhost:${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);

    console.log("API is ready") ;
});