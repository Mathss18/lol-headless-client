import { Socket } from 'net';
import { EventEmitter } from 'events';
import { Logger } from '../../utils/logger.util';

export class SocketClient extends EventEmitter {
  private socket: Socket;

  constructor(socket: Socket) {
    super();
    this.socket = socket;
    this.initListeners();
  }

  private initListeners(): void {
    this.socket.on('error', (error: Error) => {
      console.error('Socket error:', error);
    });

    this.socket.on('close', () => {
      Logger.red('Socket closed');
    });
  }

  public async writeAndWaitForData(data: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const onData = (response: Buffer) => {
        this.socket.off('data', onData);
        resolve(response);
      };

      this.socket.on('data', onData);
      this.socket.write(data, (error) => {
        if (error) {
          this.socket.off('data', onData);
          reject(error);
        }
      });
    });
  }
}