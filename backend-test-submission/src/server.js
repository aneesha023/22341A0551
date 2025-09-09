const app = require('./app');

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend API server running on port ${PORT}`);
});
