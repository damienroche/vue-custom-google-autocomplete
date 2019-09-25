import snakeKeys from 'snakecase-keys'
import camelKeys from 'camelcase-object-deep'

const mapData = (obj: any, fromServer = true): any => {
  return fromServer ? camelKeys(obj) : snakeKeys(obj)
}

export default mapData
