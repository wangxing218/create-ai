import { log } from '@/lib/log'
import { Sequelize } from 'sequelize'
import { database } from '@/config'

export const sequelize = new Sequelize(database.uri, {
  username: database.username,
  password: database.password,
  logging: (sql: string) => log.debug(sql),
  define: {
    freezeTableName: true,
    underscored: true,
  },
})
