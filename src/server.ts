import type * as Party from 'partykit/server';

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {
    setInterval(() => {
      // update DB
    }, 30_000);
  }

  async onConnect(
    connection: Party.Connection<unknown>,
    ctx: Party.ConnectionContext,
  ): Promise<void> {
    const currentCount = (await this.room.storage.get('counter')) ?? 0;

    connection.send(`${currentCount}`);
  }

  async onMessage(
    message: string | ArrayBuffer | ArrayBufferView,
    sender: Party.Connection<unknown>,
  ): Promise<void> {
    if (message === 'increment') {
      let currentCount =
        ((await this.room.storage.get('counter')) as number) ?? 0;
      this.room.storage.put('counter', ++currentCount);

      this.room.broadcast(`${currentCount}`);
    }
  }

  onClose(connection: Party.Connection<unknown>): void | Promise<void> {
    const connections = [...this.room.getConnections()].length;

    if (connections === 0) {
      // flush to DB
      // clear interval
    }
  }
}

Server satisfies Party.Worker;
