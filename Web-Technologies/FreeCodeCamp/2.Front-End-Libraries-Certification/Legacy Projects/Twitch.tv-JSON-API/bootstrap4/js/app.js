// Define the `phonecatApp` module
var twitchApp = angular.module('twitchApp', []);
var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
// https://wind-bow.glitch.me/twitch-api/users/ESL_SC2
// https://wind-bow.glitch.me/twitch-api/channels/freecodecamp
// var channels = ["freecodecamp","test_channel","ESL_SC2"];
twitchApp.controller('ChannelController', function ChannelController($scope, $http, $sce){
    var channels = ["freecodecamp","test_channel","ESL_SC2", "ukmasters", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    //var channels = ["ukmasters"];
    $scope.channelsModel = [];
    $scope.streamModel = [];
    channels.forEach(function(channel) {
      function makeURL(type, id) {
          return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + id;
      };
      var url = makeURL('streams', channel);
      var trustedUrl = $sce.trustAsResourceUrl(url);
      $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
           .then(function successCallback(response) {
             if (response.data.stream !== null){
              console.log("Online");
              $scope.streamModel.push(response.data);
              //refactor
              var url = makeURL('channels', channel);
              var trustedUrl = $sce.trustAsResourceUrl(url);
              channelRequest(trustedUrl, "Online");
             }
           else if(response.data.stream === null ){
              console.log("Offline");
              onlineStatus = "Offline";
              var url = makeURL('channels', channel);
              var trustedUrl = $sce.trustAsResourceUrl(url);
              channelRequest(trustedUrl, onlineStatus);
           } else if (response.data.stream === undefined) {
             console.log("Account Closed");
             onlineStatus = "Account Closed";
             // get request
             //channelRequest(makeURL('stream', channel), onlineStatus)
           }

       }, function errorCallback(response) {
             console.log(response);
       });

       function channelRequest(trustedUrl, onlineStatus){
         $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
              .then(function successCallback(response) {
              response.data.onlinestatus = onlineStatus;
            if(response.data.video_banner === null){
              response.data.video_banner = 'https://dummyimage.com/600x400/6441a4/fcfcfc.png&text=6e6f7420666f756e64';
            }
            if(response.data.logo === null){
               response.data.logo = 'https://dummyimage.com/300x300/6441a4/fcfcfc.png&text=6c6f676f0d0a';
            }
            $scope.channelsModel.push(response.data);
          }, function errorCallback(response) {
                console.log(response);
          });

       }
    });


  /*

     */
     /*


  */

   /*

       */

  $scope.channels = [
    {
      "status": "Some GoLang Today #go #golang #youtube",
      "display_name": "FreeCodeCamp",
       "name": "freecodecamp",
      "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png",
      "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-channel_offline_image-b8e133c78cd51cb0-1920x1080.png",
      "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_banner-6f5e3445ff474aec-480.png",
       "url": "https://www.twitch.tv/freecodecamp",
       "views": 189385,
       "followers": 10989,
         "_id": 79776140,
       live: true
    },
    {
      "status": "Some GoLang Today #go #golang #youtube",
      "display_name": "FreeCodeCamp",
       "name": "freecodecamp",
      "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png",
      "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-channel_offline_image-b8e133c78cd51cb0-1920x1080.png",
      "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_banner-6f5e3445ff474aec-480.png",
       "url": "https://www.twitch.tv/freecodecamp",
       "views": 189385,
       "followers": 10989,
         "_id": 1,

       live: true
    },
    {
      "status": "Some GoLang Today #go #golang #youtube",
      "display_name": "FreeCodeCamp",
       "name": "freecodecamp",
      "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png",
      "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-channel_offline_image-b8e133c78cd51cb0-1920x1080.png",
      "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_banner-6f5e3445ff474aec-480.png",
       "url": "https://www.twitch.tv/freecodecamp",
       "views": 189385,
       "followers": 10989,
         "_id": 0,
       live: true
    },
  ]

  //functions online, offline, all
});
twitchApp.controller('FavGameComponent', function FavGameComponent($scope){
  //needs to be array
  $scope.games = [
    {
      image: 'https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-272x380.jpg',
      title: 'League of Legends'
    },
    {
      image: 'https://static-cdn.jtvnw.net/ttv-boxart/PLAYERUNKNOWN%27S%20BATTLEGROUNDS-272x380.jpg',
      title: 'PLAYERUNKNOWN BATTLEGROUND'
    },
    {
      image: 'https://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-272x380.jpg',
      title: 'GTA V'
    },
    {
      image: 'https://static-cdn.jtvnw.net/ttv-boxart/Dota%202-272x380.jpg',
      title: 'DOTA 2'
    },
    {
      image: 'https://static-cdn.jtvnw.net/ttv-boxart/Counter-Strike:%20Global%20Offensive-272x380.jpg',
      title: 'Counter-Strike Global Offensive'
    },
    {
      image: 'https://static-cdn.jtvnw.net/ttv-boxart/Overwatch-272x380.jpg',
      title: 'Overwatch'
    },
    {
      image: 'https://static-cdn.jtvnw.net/ttv-boxart/Diablo%20III:%20Reaper%20of%20Souls-272x380.jpg',
      title: 'Diablo 20III Reaper of Souls'
    },
    {
      image: 'https://static-cdn.jtvnw.net/ttv-boxart/Destiny-272x380.jpg',
      title: 'Destiny'
    },
    {
      image: 'https://static-cdn.jtvnw.net/ttv-boxart/ARK-272x380.jpg',
      title: 'Ark'
    },
    {
      image: 'https://static-cdn.jtvnw.net/ttv-boxart/Minecraft-272x380.jpg',
      title: 'Minecraft'
    },
    /*
    {
      image: '',
      title: 'Overwatch'
    },

*/
{
  image: 'https://static-cdn.jtvnw.net/ttv-boxart/Friday%20the%2013th:%20The%20Game-272x380.jpg',
  title: 'Friday the 13th: The game'
},
{
  image: 'https://static-cdn.jtvnw.net/ttv-boxart/RuneScape-272x380.jpg',
  title: 'RuneScape'
},
  ]

});


twitchApp.controller('StreamComponent', function StreamComponent($scope){

  //needs to be array
  $scope.streams = [
    {
      game: 'BATMAN - The Telltale Series',
      viewers: 7254,
      "preview": {
         "small": "https://static-cdn.jtvnw.net/previews-ttv/live_user_dansgaming-80x45.jpg",
         "medium": "https://static-cdn.jtvnw.net/previews-ttv/live_user_dansgaming-320x180.jpg",
         "large": "https://static-cdn.jtvnw.net/previews-ttv/live_user_dansgaming-640x360.jpg",
         "template": "https://static-cdn.jtvnw.net/previews-ttv/live_user_dansgaming-{width}x{height}.jpg"
      },
       "channel": {
         "mature": false,
         "status": "Dan is Batman? - Telltale's Batman",
         "broadcaster_language": "en",
         "display_name": "DansGaming",
         "name": "dansgaming",
         "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/dansgaming-profile_image-76e4a4ab9388bc9c-300x300.png",
         "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/dansgaming-channel_offline_image-d3551503c24c08ad-1920x1080.png",
         "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/dansgaming-profile_banner-4c2b8ece8cd010b4-480.jpeg",
         "url": "https://www.twitch.tv/dansgaming",
         "views": 63906830,
         "followers": 538598
      }
    }
  ]
  $scope.setStream = function(){
  }




});
