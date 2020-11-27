const baseUrl = "http://localhost:8000/api/v1";
// const baseUrl = 'https://postcodecollectiveapp.eu-4.evennode.com/api/v1';
const users = `${baseUrl}/users`;
const organisations = `${baseUrl}/organisations`;
const contracts = `${baseUrl}/contracts`;

function getUrl(type) {
  switch (type) {
    case "users":
      return users;
    case "organisations":
      return organisations;
    case "contracts":
      return contracts;
    default:
      throw new Error("url case doesn't match any");
  }
}

export default getUrl;
