/* global TrelloPowerUp */

// we can access Bluebird Promises as follows
var Promise = TrelloPowerUp.Promise;

// helper function to fetch data and generate card badges
var getBadge = function(t, detail) {
  return t.getAll()
  .then(function(storedData){
    if (!storedData || !storedData.card || !storedData.card.shared) {
      return [];
    }
    
    var data = storedData.card.shared;
    if (!data.unixTime || new Date(data.unixTime * 1000) < Date.now()) {
      return [];
    }
    
    return t.card('id', 'closed')
    .then(function(card){
      if (data.idCard !== card.id || !card.closed) {
        $.post('/snooze/' + card.id + '/verify', function(){
          t.set('card', 'shared', { idCard: null, time: null, unixTime: null });
        });
        return [];
      }
      var badge = {
        icon: 'https://cdn.hyperdev.com/07656aca-9ccd-4ad1-823c-dbd039f7fccc%2Fzzz-grey.svg'
      };
      if (detail) {
        badge.title = 'Card Snoozed Until';
        badge.text = data.time;
      }
      return [badge];
    })
    .catch(function(){
      return [];
    });
  })
  .catch(function(){
    return [];
  });
};

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  'card-badges': function (t, opts) {
    return t.card('name')
    .get('name')
    .then(function(cardName){
      return [{
        // dynamic badges can have their function rerun
        // after a set number of seconds defined by refresh.
        // Minimum of 10 seconds.
        dynamic: function(){
          // we could also return a Promise that resolves to
          // this as well if we needed to do something async first
          return {
            text: (Math.random() * 100).toFixed(0).toString() + ' bids',
            icon: 'https://res.cloudinary.com/suryast/image/upload/v1512127819/headset_man_bpf2ux.svg',
            color: 'blue',
            refresh: 10 // in seconds
          };
        }
      }];
    });
  },
  'card-buttons': function(t, opts) {
    // check that viewing member has write permissions on this board
    if (opts.context.permissions.board !== 'write') {
      return [];
    }
    return t.get('member', 'private', 'token')
    .then(function(token){
      return [{
        icon: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Fhyperdev.svg?1473990736575',
        text: 'Powerlancer',
        callback: function(context) {
          if (!token) {
            context.popup({
              title: 'Authorize Your Account',
              url: './auth.html',
              height: 75
            });
          } else {
            return context.popup({
              title: 'Outsource task',
              url: './freelancer.html',
              height: 411
            });
          }
        }
      }];
    });
  },
  'card-detail-badges': function(t, opts){
    var editable = opts.context.permissions.board === 'write';
    var clickCallback = function(context){
      return context.popup({
        title: 'Postlancer',
        url: './freelancer.html',
        height: 411 // initial height of popup window
      });
    };
  }
});