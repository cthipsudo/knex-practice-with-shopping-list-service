const ShoppingListService = {
  getShoppingListItems(knex) {
    return knex.select('*').from('shopping_list');
  },
  insertShoppingListItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from('shopping_list').select('*').where('id', id).first();
  },

  deleteShoppingListItem(knex, id) {
    return knex.from('shopping_list').where({ id }).delete();
  },

  updateShoppingListItem(knex, id, newShoppingItem) {
    return knex.from('shopping_list').where({ id }).update(newShoppingItem);
  },
};

module.exports = ShoppingListService;