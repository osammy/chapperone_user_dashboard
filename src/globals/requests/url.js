const baseUrl = "http://localhost:8000/api/v1";
// const baseUrl = 'https://postcodecollectiveapp.eu-4.evennode.com/api/v1';
const users = `${baseUrl}/users`;
const organisations = `${baseUrl}/organisations`;

function getUrl(type) {
  switch (type) {
    case "users":
      return users;
    case "organisations":
      return organisations;
  }
}

export default getUrl;
