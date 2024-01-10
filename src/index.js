const app = require("./app");

const port = process.env.PORT;

const ip_address = process.env.IP_ADDRESS;
// run comando 'ipconfig' at terminal and get the IP address
// of Wireless LAN adapter Wi-Fi (IPv4 or IPv6)

app.listen(
  port,
  ip_address,
  () => {
    console.log(`Server running on port ${ip_address}:${port}`);
  }
);
