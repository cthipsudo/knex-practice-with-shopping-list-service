/* eslint-disable quotes */
const ShoppingListService = require('../src/shopping-list-service.js');
const knex = require('knex');
const { expect } = require('chai');

describe.only(`Shopping service tests`, function () {
  let db;
  let testShoppingItems = [
    {
      id: 1,
      name: 'apples',
      price: '4.50',
      category: 'Snack',
      checked: false,
      date_added: new Date('2020-09-23T05:00:00.000Z'),
    },
    {
      id: 2,
      name: 'oranges',
      price: '9.50',
      category: 'Snack',
      checked: false,
      date_added: new Date('2020-09-20T05:00:00.000Z'),
    },
    {
      id: 3,
      name: 'pears',
      price: '4.80',
      category: 'Snack',
      checked: false,
      date_added: new Date('2020-09-21T05:00:00.000Z'),
    },
  ];

  //Before we start test, setup our knex db connection.
  before( 'setup db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  //Before we start the tests, clear the shopping list data from the table
  before('clear table', () => db('shopping_list').truncate());

  //After each test, clear the shopping list data from the table
  afterEach('clear table', () => db('shopping_list').truncate());

  //After the test, close the connect to the db so it doesn't hang.
  after('break connection', () => db.destroy());

  context(`Given 'shopping_list' has data after data population `, () => {

    // Insert Data in the shopping_list table before each test
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testShoppingItems);
    });

    it(`getShoppingListItems() gets all items from 'shopping_list' table`, () => {
      // test that ShoppingListService.getShoppingListItems gets data from table
      //Example test:
      return ShoppingListService.getShoppingListItems(db)
        .then(actual => {
          //expect the result return from the db to equal the test data
          expect(actual).to.eql(testShoppingItems);
        });
    });

    it(`getById() resolves an shopping item by id from 'shopping_list' table`, () => {
      // test to see if you can get a shopping item by id.
      const itemId = 3;
      const thirdItem = testShoppingItems[itemId -1 ];
      return ShoppingListService.getById(db, 3)
        .then(data => {
          //console.log(data);
          //console.log(thirdItem);
          //expect the data returned from the db to equal the item we asked for.
          expect(data).to.eql(thirdItem);
        });
    
    });

    it(`deleteShoppingListItem() removes an item by id from 'shopping_list' table`, () => {
      //test to see if you can delete a shopping item by id

      const itemId = 2;
      const listFiltered = testShoppingItems.filter(item => item.id !== itemId);
      return ShoppingListService.deleteShoppingListItem(db, itemId)
        .then(() => ShoppingListService.getShoppingListItems(db))
        .then( data => {
          //console.log(data);
          //console.log(listFiltered);
          expect(data).to.eql(listFiltered);
        });
    });

    it(`updateShoppingListItem() updates an item from the 'shopping_list' table`, () => {
      const idOfItemToUpdate = 1
      const newItemData = {
        name: 'apples',
        price: '10.50',
        category: 'Main',
        checked: true,
        date_added: new Date('2020-09-21T05:00:00.000Z'),
      };
      //console.log(newItemData);
      return ShoppingListService.updateShoppingListItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
        .then(shoppingItem => {
          //console.log(shoppingItem);
          expect(shoppingItem).to.eql({id: idOfItemToUpdate, ...newItemData})
        })
    });
  });

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllShoppingListItems() resolves an empty array`, () => {
      return ShoppingListService.getShoppingListItems(db)
        .then(data =>{
          expect(data).to.eql([]);
        })
    });

    it(`insertShoppingListItem() inserts a new item and equals that new item with an 'id'`, () => {
      const shoppingData = {
        name: 'apples',
        price: '10.50',
        category: 'Main',
        checked: true,
        date_added: new Date('2020-09-21T05:00:00.000Z')
      }
      return ShoppingListService.insertShoppingListItem(db, shoppingData)
        .then(data => {
          //console.log(data);
          expect(data).to.eql({id: 1, ...shoppingData});
        });
    });
  });
});

