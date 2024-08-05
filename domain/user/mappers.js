export const mapUserSchemaToModel = (schema) => ({
  id: schema.id,
  email: schema.email,
  nickname: schema.nickname,
});

export const mapUserModelToSchema = (model) => ({
  id: model.id,
  email: model.email,
  nickname: model.nickname,
});
