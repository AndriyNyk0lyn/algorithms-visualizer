export interface Participant {
  name: string;
  receive(from: string, message: string): void;
}

export class ChatRoom {
  private members = new Map<string, Participant>();

  join(p: Participant) {
    this.members.set(p.name, p);
  }

  send(from: string, to: string | null, message: string) {
    if (to) {
      this.members.get(to)?.receive(from, message);
      return;
    }
    for (const [name, m] of this.members)
      if (name !== from) m.receive(from, message);
  }
}

export class User implements Participant {
  name: string;
  private room: ChatRoom;

  constructor(name: string, room: ChatRoom) {
    this.name = name;
    this.room = room;
    this.room.join(this);
  }
  say(to: string | null, message: string) {
    this.room.send(this.name, to, message);
  }
  receive(from: string, message: string) {
    console.log(`${this.name} <- ${from}: ${message}`);
  }
}

const room = new ChatRoom();
const alice = new User("Alice", room);
const bob = new User("Bob", room);
alice.say(null, "hi everyone");
bob.say("Alice", "hey!");
