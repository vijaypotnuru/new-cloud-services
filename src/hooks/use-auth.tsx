export const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const setUser = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user))
  }
  const removeUser = () => {
    localStorage.removeItem('user')
  }
  return { user, setUser, removeUser }
}
