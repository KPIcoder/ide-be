import { db } from "../../shared/db.js";
import { mapUserModelToSchema, mapUserSchemaToModel } from "./mappers.js";

class User {
  async getById(id) {
    const query = await db.query(`select * from users where id = $1`, [id]);
    const user = query.rows[0];
    return user ? mapUserSchemaToModel(user) : undefined;
  }

  async addUser(userModel) {
    const { nickname, email } = mapUserModelToSchema(userModel);
    const query = await db.query(
      `insert into users(email, nickname, last_seen_at) values($1, $2, now()) returning *`,
      [email, nickname]
    );
    const user = query.rows[0];
    return user ? mapUserSchemaToModel(user) : undefined;
  }

  async trackUserLogIn(userModel) {
    const { id } = mapUserModelToSchema(userModel);
    await db.query(`update users set last_seen_at = now() where id = $1`, [id]);
  }

  async getUserByEmailOrNickname(userModel) {
    const { email, nickname } = mapUserModelToSchema(userModel);
    const query = await db.query(
      `
        select *
        from users
        where email = $1
        union 
        select *
        from users 
        where nickname = $2       
      `,
      [email, nickname]
    );
    const user = query.rows[0];
    return user ? mapUserSchemaToModel(user) : undefined;
  }

  async authorize(user) {
    const maybeUser = await this.getUserByEmailOrNickname(user);
    if (!maybeUser) return this.addUser(user);
    await this.trackUserLogIn(user);
    return maybeUser;
  }
}

export const user = new User();
