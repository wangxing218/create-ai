import { sequelize } from '@/lib/db'
import { DataTypes } from 'sequelize'

export const userModel = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
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
