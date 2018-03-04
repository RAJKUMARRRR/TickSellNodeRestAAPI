module.exports = {
  dev: {
    port: process.env.port || 5000,
    db  : process.env.DB_LINK || "mongodb://rajkumar:ticksell1234@ds115583.mlab.com:15583/ticksell"
  },
  prod: {
    //TODO !
  }
}
