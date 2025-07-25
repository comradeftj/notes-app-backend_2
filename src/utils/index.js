/* eslint-disable camelcase */
const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  created_at,
  updated_at,
  userName,
}) => ({
  id,
  title,
  body,
  tags,
  createdAt: created_at,
  updatedAt: updated_at,
  userName,
});

module.exports = { mapDBToModel };
