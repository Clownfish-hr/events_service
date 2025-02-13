const cassandra = require('cassandra-driver');  
const client = new cassandra.Client({ contactPoints: ['127.0.0.1']});

client.connect()
  .then(function() {
    var query = "CREATE KEYSPACE IF NOT EXISTS events WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3'}"; 
    return client.execute(query); 
  })
  .then(function() {
    var query = "CREATE TABLE IF NOT EXISTS events.newBookings (event_type text, booking_uuid uuid, created_at date, has_pa boolean, PRIMARY KEY(booking_uuid))";
    return client.execute(query);
  })
  .then(function() {
    var query = "CREATE TABLE IF NOT EXISTS events.newListings (event_type text, listing_uuid uuid, created_at date, PRIMARY KEY(listing_uuid))";
    return client.execute(query);
  })
  .then(function() {
    var query = "CREATE TABLE IF NOT EXISTS events.newSearches (event_type text, user_uuid uuid, created_at date, query text, PRIMARY KEY(user_uuid))";
    return client.execute(query); 
  })
  .then(function() {
    var query = "CREATE TABLE IF NOT EXISTS events.updatedBookings(event_type text, created_at date, update_uuid uuid, status boolean, PRIMARY KEY(update_uuid))"; 
    return client.execute(query); 
  })
  .catch(function(err) {
    console.error('there was an error!', err); 
  });

module.exports.client = client; 
// async.series([
//   function connect(next) {
//     client.connect(next);
//   },
//   function createKeyspace(next) {
//     var query = "CREATE KEYSPACE IF NOT EXISTS events WITH replication = {'class': 'simpleStrategy', 'replication_factor': '3' }";
//     client.execute(query, next);
//   },
//   function createBookingsTable(next) {
//     var query = "CREATE TABLE IF NOT EXISTS events.newBookings ()";
//     client.execute(query, next);
//   },
//   function createListingsTable(next) {
//     var query = "CREATE TABLE IF NOT EXISTS events.newListings()";
//     client.execute(query, next); 
//   },
//   function createSearchesTable(next) {
//     var query = "CREATE TABLE IF NOT EXISTS events.newSearches()"; 
//     client.execute(query, next); 
//   }, 
//   function createUpdatedBookingsTable(next) {
//     var query = "CREATE TABLE IF NOT EXISTS events.updatedBookings()";
//     client.execute(query, next); 
//   }, 
// ], function (err) {
//   if (err) {
//     console.error('There was an error', err.message, err.stack);
//   }
//   console.log('Shutting down');
//   client.shutdown();
// });