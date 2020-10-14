export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('UserInfo'))
  if (user && user.token) {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + user.token,
      'Access-Control-Allow-Origin': '*'
    }
  } else {
    return {}
  }
}
