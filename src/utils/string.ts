export default class StringUtils {
  static toString (arg:any):string {
    let result = ''
    switch (true) {
      case (typeof arg === 'string'):
        result = arg
        break
      case (typeof arg === 'number'):
        result = arg.toString()
        break
      case (Array.isArray(arg)):
        result = arg.join(' ')
        break
      case (arg === null):
        result = 'null'
        break
      case (typeof arg === 'object'):
        result = JSON.stringify(arg)
        break
      default:
        result = arg.toString()
        break
    }
    return result
  }
}
