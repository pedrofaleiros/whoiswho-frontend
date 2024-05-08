class SocketConstants {
  static CONNECTION: string = "connection";
  static DISCONNECT: string = "disconnect";

  static JOIN_ROOM: string = "joinRoom";
  static CREATE_ROOM: string = "createRoom";

  static WARNING: string = "warning";
  static ERROR: string = "error";

  static START_GAME: string = "startGame";
  static FINISH_GAME: string = "finishGame";

  static ROOM_CODE: string = "roomCode";
  static GAME_STATUS: string = "gameStatus";
  static GAME_IMPOSTORS: string = "gameImpostors";
  static SET_IMPOSTORS: string = "setImpostors";
  static SET_CATEGORY: string = "setCategory";
  static GAME_CATEGORY: string = "gameCategory";
  static GAME_PLAYERS: string = "gamePlayers";

  static GAME_DATA: string = "gameData";

}

export { SocketConstants as SocketConst };
