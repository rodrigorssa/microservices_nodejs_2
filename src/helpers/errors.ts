export function sendMsgError (msg:Array<string>) {
  return {
    errorCode: 400,
    msg: msg
  }
}

export function sendError500 () {
  return {
    errorCode: 500,
    msg: 'Erro interno do servidor.'
  }
}

export function sendError404 () {
  return {
    errorCode: 404,
    msg: 'Nada encontrado.'
  }
}
