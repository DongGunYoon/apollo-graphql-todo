import { Model } from "mongoose"

export function Dao(model: Model<any>, deletedModel?: Model<any>) {
  return function<T extends {new(...args: any[]): {}}> (constructor: T) {
    return class extends constructor {
      getModel = (() => model)
      getDeletedModel = (() => deletedModel)
      getName = (() => model.modelName + "Dao")
      getModelName = (() => model.modelName)
    }
  }
}