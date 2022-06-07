import { sequelize } from '@/lib/db'
import { DataTypes } from 'sequelize'

export const userModel = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
)

export const userRoleModel = sequelize.define(
  'userRole',
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  { createdAt: false, updatedAt: false, tableName: 'user_role' },
)
userModel.hasMany(userRoleModel)
