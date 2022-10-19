require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: process.env.API_URL,
      accounts: [process.env.SECRET_KEY],
    }
  }
};
