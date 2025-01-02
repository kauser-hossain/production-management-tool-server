const dotenv = require("dotenv");
const app=require("./app");
// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
