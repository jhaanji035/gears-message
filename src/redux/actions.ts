export const MESSAGE_LOAD = 'MESSAGE_LOAD'

function load(query: []) {
  return {
    type: MESSAGE_LOAD,
    payload: query,
  }
}
export default load