require('dotenv').config();
const knex = require('knex');

const dbKnex = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

function searchByItem(searchTerm) {
  dbKnex
    .select('*')
    .from('shopping_list')
    .where('name', 'iLIKE', `%${searchTerm}%`)
    .then(result => {
      console.log('Search Term:', {searchTerm});
      console.log(result);
    });
}

//searchByItem('burger');

function paginatedItems(pageNumber){
  const limit = 6;
  const offset = limit * (pageNumber - 1);
  dbKnex
    .select('*')
    .from('shopping_list')
    .limit(limit)
    .offset(offset)
    .then(result => {
      console.log('Paginated Items', {pageNumber});
      console.log(result);
    });
    
}

//paginatedItems(2);

function itemsAfterDate(daysAgo){
  dbKnex
    .select('*')
    .from('shopping_list')
    .where('date_added', '>', dbKnex.raw(`now() - '?? days':: INTERVAL`, daysAgo))
    .then(result => {
      console.log('After date', {daysAgo});
      console.log(result);
    });
}

//itemsAfterDate(4);

function getTotalCost(){
  dbKnex
    .select('category', 'price')
    .from('shopping_list')
    .groupBy('category', 'price')
    .then(result => {
      console.log(result);
    });
}

getTotalCost();